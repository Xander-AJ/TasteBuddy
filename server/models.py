from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    firstName = db.Column(db.String(120), nullable=False)
    lastName = db.Column(db.String(120), nullable=False)
    title = db.Column(db.String(120), nullable=False)
    aboutMe = db.Column(db.Text),
    profilePicture = db.Column(db.String)

    # Relationship definitions
    bookmarks = db.relationship('Bookmark', backref='user', lazy=True, cascade='all, delete-orphan')
    likes = db.relationship('Like', backref='user', lazy=True, cascade='all, delete-orphan')
    ratings = db.relationship('Rating', backref='user', lazy=True, cascade='all, delete-orphan')
    notifications = db.relationship('Notification', backref='user', lazy=True, cascade='all, delete-orphan')
    recipes = db.relationship('Recipe', back_populates='user', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'password': self.password,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'title': self.title,
            'aboutMe': self.aboutMe,
            'profilePicture': self.profilePicture,
            'recipes': [recipe.to_dict() for recipe in self.recipes],
            'bookmarks': [bookmark.to_dict() for bookmark in self.bookmarks],
            'likes': [like.to_dict() for like in self.likes],
            'ratings': [rating.to_dict() for rating in self.ratings],
            'notifications': [notification.to_dict() for notification in self.notifications],
        }

class Recipe(db.Model):
    
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    chefName = db.Column(db.String, nullable=False)
    chefImage = db.Column(db.String, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String, nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    url = db.Column(db.String)
    moreInfoUrl = db.Column(db.String)
    rating = db.Column(db.Integer, nullable=False)
    prepTime = db.Column(db.String, nullable=False)
    servings = db.Column(db.Integer, nullable=False)
    countryOfOrigin = db.Column(db.String(200), nullable=False)
    dietType = db.Column(db.String(200), nullable=False)

    # Foreign key that stores the user ID
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))

    # Relationship definitions
    bookmarks = db.relationship('Bookmark', backref='recipe', lazy=True)
    likes = db.relationship('Like', backref='recipe', lazy=True)
    ratings = db.relationship('Rating', backref='recipe', lazy=True)
    user = db.relationship('User', back_populates='recipes', lazy=True)
    

    def to_dict(self):
        return {
            'id': self.id,
            'chefName': self.chefName,
            'chefImage': self.chefImage,
            'title': self.title,
            'image': self.image,
            'ingredients': self.ingredients,
            'instructions': self.instructions,
            'url': self.url,
            'moreInfoUrl': self.moreInfoUrl,
            'rating': self.rating,
            'prepTime': self.prepTime,
            'servings': self.servings,
            'countryOfOrigin': self.countryOfOrigin,
            'dietType': self.dietType,
            'bookmarks': [bookmark.to_dict() for bookmark in self.bookmarks],
            'likes': [like.to_dict() for like in self.likes],
            'ratings': [rating.to_dict() for rating in self.ratings],
        }

class Bookmark(db.Model):

    __tablename__ = 'bookmarks'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipeId = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'recipeId': self.recipeId,
        }

class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipeId = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'recipeId': self.recipeId,
        }

class Rating(db.Model):
    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipeId = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'recipeId': self.recipeId,
            'rating': self.rating,
        }

class Notification(db.Model):
    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String(200), nullable=False)
    isRead = db.Column(db.Boolean, default=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'message': self.message,
            'isRead': self.isRead,
            'timestamp': self.timestamp.isoformat(),
        }
