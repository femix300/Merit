from app.models.user_model import find_user_by_id, update_user, delete_user


def get_profile(db, user_id):
    user = find_user_by_id(db, user_id)
    if not user:
        return None
    return {
        "id": str(user["_id"]),
        "username": user.get("username"),
        "email": user.get("email"),
        "verified": user.get("verified", False),
        "is_admin": user.get("is_admin", False),
        "profile": user.get("profile", {})
    }

def get_all_profiles(db):
    users = db.users.find({})
    profiles = []


    for user in users:
        profile = get_profile(db, str(user["_id"]))
        if profile:
            profiles.append(profile)

    return profiles

def validate_and_update_academic_info(db, user_id, data):
    allowed_grades = ["A1", "B2", "B3", "C4", "C5", "C6"]

    grade_fields = {
        "maths": "profile.grades.maths",
        "english": "profile.grades.english",
        "relevantSubjects": "profile.grades.relevantSubjects"
    }

    update_data = {}
    grades = data.get("grades", {})
    for key, db_path in grade_fields.items():
        if key in grades:
            value = grades[key]
            if key == "relevantSubjects":
                if not isinstance(value, list):
                    return {"error": "relevantSubjects must be a list"}, 400
                if any(g not in allowed_grades for g in value):
                    return {"error": f"Invalid grades in {value}"}, 400
            else:
                if value not in allowed_grades:
                    return {"error": f"Invalid {key} grade"}, 400
            update_data[db_path] = value
        
    for score_key in ["utmeScore", "postUtmeScore"]:
        if score_key in data:
            update_data[f"profile.{score_key}"] = data[score_key]
    
    if not update_data:
        return {"error": "No fields to update"}, 400
    
    success, error = update_user(db, user_id, update_data)
    if not success:
        return {"error": error}, 400
    
    return {"message": "Academic info updated successfully"}, 200


def update_profile(db, user_id, updates):
    allowed = {}
    if "username" in updates:
        allowed["username"] = updates["username"]
    if "profile" in updates and isinstance(updates["profile"], dict):
        user = find_user_by_id(db, user_id)
        if not user:
            return None
        new_profile = user.get("profile", {})
        new_profile.update(updates["profile"])
        allowed["profile"] = new_profile

    if not allowed:
        return None

    update_user(db, user_id, allowed)
    return get_profile(db, user_id)


def delete_account(db, user_id):
    """
    Delete the user's account. Returns True if deleted, False otherwise.
    """
    res = delete_user(db, user_id)
    if res and getattr(res, "deleted_count", 0) > 0:
        # might add more code here to delete more stuff
        return True
    return False
