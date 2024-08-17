# server/routes/__init__.py
from flask import Flask
from .auth_routes import auth_bp
from .recipe_routes import recipe_bp
from .user_routes import user_bp
from .contact_routes import contact_bp  # Import the contact blueprint

def create_app():
    app = Flask(__name__)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(recipe_bp, url_prefix='/recipes')
    app.register_blueprint(user_bp, url_prefix='/users')
    app.register_blueprint(contact_bp, url_prefix='/contact')  # Register the contact blueprint

    return app
