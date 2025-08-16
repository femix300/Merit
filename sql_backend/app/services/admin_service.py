from app.models.user_model import set_user_admin, find_user_by_id


def make_user_admin(db, target_user_id):
    user = find_user_by_id(db, target_user_id)
    if not user:
        return {"error": "User not found"}, 404

    success = set_user_admin(db, target_user_id, True)
    if success:
        return {"message": "User is now an admin"}, 200
    return {"error": "Failed to update admin status"}, 500
