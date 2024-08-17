import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
    FIREBASE_CREDENTIALS = os.getenv('FIREBASE_CREDENTIALS', 'path_to_firebase_admin_sdk.json')
