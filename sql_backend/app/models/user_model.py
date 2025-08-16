from datetime import datetime, timezone
from bson import ObjectId


def create_user(db, user_data):
    user_data["created_at"] = datetime.now(timezone.utc)
    user_data["verified"] = False
    result = db.users.insert_one(user_data)
    return str(result.inserted_id)


def find_user_by_email(db, email):
    """Debug version to see what's actually being returned"""
    try:
        return db.users.find_one({"email": email})
    except Exception:
        return None


def find_user_by_id(db, user_id):
    try:
        return db.users.find_one({"_id": ObjectId(user_id)})
    except Exception:
        return None


def find_user_by_username(db, username):
    try:
        return db.users.find_one({"username": username})
    except Exception:
        return None


def update_user(db, user_id, update_data):

    if not update_data:
        return False, "No fields to update"
    
    try:
        result = db.users.update_one(
            {"_id": ObjectId(user_id)}, {"$set": update_data})

        if result.matched_count == 0:
            return False, "User not found"
        
        return True, None
    
    except Exception as e:
        return False, str(e)


def mark_email_verified(db, user_id):
    try:
        oid = ObjectId(user_id)
    except Exception as e:
        return None

    result = db.users.update_one(
        {"_id": oid},
        {"$set": {"verified": True}}
    )
    return result


def set_user_admin(db, user_id, is_admin=True):
    try:
        result = db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"is_admin": is_admin}}
        )
        return result.modified_count > 0
    except Exception:
        return False


def delete_user(db, user_id):
    try:
        res = db.users.delete_one({"_id": ObjectId(user_id)})
        return res
    except Exception as e:
        return None
