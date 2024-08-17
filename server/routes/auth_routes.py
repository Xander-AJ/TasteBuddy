from flask import Blueprint, request, jsonify
from server.models import User, db
from server.utils.auth_utils import hash_password, check_password, verify_firebase_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    password = data['password']
    username = data['username']

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered'}), 409

    hashed_password = hash_password(password)
    user = User(email=email, password=hashed_password, username=username)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    if user and check_password(user.password, password):
        return jsonify({'message': 'Login successful', 'user_id': user.id}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@auth_bp.route('/firebase-auth', methods=['POST'])
def firebase_auth():
    token = request.json.get('token')
    uid = verify_firebase_token(token)
    if uid:
        user = User.query.filter_by(email=uid).first()
        if user:
            return jsonify({'message': 'Authenticated', 'user_id': user.id}), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    else:
        return jsonify({'message': 'Invalid token'}), 401
