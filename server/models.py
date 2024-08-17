from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    profile_picture = db.Column(db.String(200), nullable=True)
    date_joined = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship definitions
    recipes = db.relationship('Recipe', backref='author', lazy=True)
    bookmarks = db.relationship('Bookmark', backref='user', lazy=True)
    likes = db.relationship('Like', backref='user', lazy=True)
    ratings = db.relationship('Rating', backref='user', lazy=True)
    notifications = db.relationship('Notification', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'profile_picture': self.profile_picture,
            'date_joined': self.date_joined.isoformat(),
            'recipes': [recipe.to_dict() for recipe in self.recipes],
            'bookmarks': [bookmark.to_dict() for bookmark in self.bookmarks],
            'likes': [like.to_dict() for like in self.likes],
            'ratings': [rating.to_dict() for rating in self.ratings],
            'notifications': [notification.to_dict() for notification in self.notifications],
        }

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(200), nullable=True)
    diet_type = db.Column(db.String(50), nullable=True)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relationship definitions
    bookmarks = db.relationship('Bookmark', backref='recipe', lazy=True)
    likes = db.relationship('Like', backref='recipe', lazy=True)
    ratings = db.relationship('Rating', backref='recipe', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'image_url': self.image_url,
            'diet_type': self.diet_type,
            'date_created': self.date_created.isoformat(),
            'author_id': self.author_id,
            'bookmarks': [bookmark.to_dict() for bookmark in self.bookmarks],
            'likes': [like.to_dict() for like in self.likes],
            'ratings': [rating.to_dict() for rating in self.ratings],
        }

class Bookmark(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'recipe_id': self.recipe_id,
        }

class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'recipe_id': self.recipe_id,
        }

class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'recipe_id': self.recipe_id,
            'rating': self.rating,
        }

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.String(200), nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'message': self.message,
            'is_read': self.is_read,
            'timestamp': self.timestamp.isoformat(),
        }
