from flask_mail import Message
from flask import url_for


def send_verification_email(mail, email, token):
    verify_link = url_for("auth.verify_email", token=token, _external=True)

    msg = Message("Verify Your Email", recipients=[email])
    msg.body = f"Click the link to verify your email: {verify_link}"
    msg.html = f'''
        <p>Click the link to verify your email:</p>
        <p><a href="{verify_link}">{verify_link}</a></p>
    '''
    mail.send(msg)

def send_password_reset_email(mail, email, token):
    msg = Message("Password Reset Request", recipients=[email])
    msg.body = f"Use this token to reset your password: {token}\nThis token will expire in 15 minutes."
    msg.html = f'''
        <p>Use this token to reset your password:</p>
        <p><b>{token}</b></p>
        <p>This token will expire in 15 minutes.</p>
    '''
    mail.send(msg)


# def send_password_reset_email(mail, email, token):
#     reset_link = url_for("auth.reset_password_route", token=token, _external=True)

#     msg = Message("Password Reset Request", recipients=[email])
#     msg.body = f"Click the link below to reset your password:\n{reset_link}\nThis link will expire in 15 minutes."
#     msg.html = f'''
#         <p>Click the link below to reset your password:</p>
#         <p><a href="{reset_link}">{reset_link}</a></p>
#         <p>This link will expire in 15 minutes.</p>
#     '''
#     mail.send(msg)