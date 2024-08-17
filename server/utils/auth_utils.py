import bcrypt
import firebase_admin
from firebase_admin import auth, credentials

def initialize_firebase():
    cred = credentials.Certificate('path_to_firebase_admin_sdk.json')
    firebase_admin.initialize_app(cred)
