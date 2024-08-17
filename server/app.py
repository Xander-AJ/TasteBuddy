# server/app.py
from flask import Flask
from server.config import Config
from server.models import db, migrate
from server.routes.auth_routes import auth_bp
from server.routes.recipe_routes import recipe_bp
from server.routes.user_routes import user_bp
from server.utils.auth_utils import initialize_firebase
from server.routes import init_app 

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    # Initialize Firebase
    initialize_firebase()

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(recipe_bp, url_prefix='/api')
    app.register_blueprint(user_bp, url_prefix='/api')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

app = create_app() 