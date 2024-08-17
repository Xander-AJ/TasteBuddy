# server/routes/contact_routes.py
from flask import Blueprint, request, jsonify

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/contact', methods=['POST'])
def contact_us():
    data = request.get_json()
    # Handle the data, such as sending an email or storing it in a database.
    return jsonify({'message': 'Contact form submitted successfully'}), 200
