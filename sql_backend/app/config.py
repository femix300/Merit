import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://mortti_x:yQKiCzbc9Ch0xsYm@cluster0.2mfxb9d.mongodb.net/merit_auth")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET", "super-secret-key")
    JWT_ACCESS_TOKEN_EXPIRES = 604800  # tempoarily increase for the sake of testing
    JWT_REFRESH_TOKEN_EXPIRES = 604800  # 7 days
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER", MAIL_USERNAME)
