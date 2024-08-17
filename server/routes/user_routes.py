# server/routes/user_routes.py
from flask import Blueprint, request, jsonify
from server.models import User, db
from server.utils.auth_utils import firebase_token_required  # Import the decorator

user_bp = Blueprint('user', __name__)

@user_bp.route('/users/<int:id>', methods=['GET'])
@firebase_token_required
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict()), 200

@user_bp.route('/users/<int:id>', methods=['PUT'])
@firebase_token_required
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()

    user.username = data.get('username', user.username)
    user.profile_picture = data.get('profile_picture', user.profile_picture)

    db.session.commit()
    return jsonify(user.to_dict()), 200

@user_bp.route('/users/<int:id>', methods=['DELETE'])
@firebase_token_required
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200
