import bcrypt
import firebase_admin
from firebase_admin import auth, credentials
from functools import wraps
from flask import request, jsonify

def initialize_firebase():
    cred = credentials.Certificate('path_to_firebase_admin_sdk.json')
    firebase_admin.initialize_app(cred)

def firebase_token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        id_token = request.headers.get('Authorization')

        if not id_token:
            return jsonify({'message': 'Missing authorization token'}), 401

        try:
            decoded_token = auth.verify_id_token(id_token)
            request.user = decoded_token
        except Exception as e:
            return jsonify({'message': 'Invalid token', 'error': str(e)}), 401

        return f(*args, **kwargs)
    return decorated_function
