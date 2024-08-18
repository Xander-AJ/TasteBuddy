from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

# metadata = MetaData(
#     naming_convention={
#         "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
#     }
# )

db = SQLAlchemy()


#======================================= USER MODEL =========================================================
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    firstName = db.Column(db.String(120), nullable=False)
    lastName = db.Column(db.String(120), nullable=False)
    title = db.Column(db.String(120), nullable=False)
    aboutMe = db.Column(db.Text)
    profilePicture = db.Column(db.String)

    bookmarks = db.relationship('Bookmark', back_populates='user', lazy=True, cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='user', lazy=True, cascade='all, delete-orphan')
    ratings = db.relationship('Rating', back_populates='user', lazy=True, cascade='all, delete-orphan')
    notifications = db.relationship('Notification', back_populates='user', lazy=True, cascade='all, delete-orphan')
    recipes = db.relationship('Recipe', back_populates='user', lazy=True, cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='user', lazy=True, cascade='all, delete-orphan')

    # @property
    # def password(self):
    #     return self._password

    # @password.setter
    # def password(self, plain_text_password):
    #     self._password = bcrypt.generate_password_hash(plain_text_password).decode('utf-8')

    # def check_password(self, plain_text_password):
    #     return bcrypt.check_password_hash(self._password, plain_text_password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
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
    
    def __repr__(self):
        return f'<User {self.username}, {self.email}, {self.password}, {self.firstName} >'
    

#======================================= RECIPE MODEL =========================================================

class Recipe(db.Model, SerializerMixin):
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

    userId = db.Column(db.Integer, db.ForeignKey("users.id"))

    bookmarks = db.relationship('Bookmark', back_populates='recipe', lazy=True)
    likes = db.relationship('Like', back_populates='recipe', lazy=True)
    ratings = db.relationship('Rating', back_populates='recipe', lazy=True, cascade="all, delete-orphan")
    user = db.relationship('User', back_populates='recipes', lazy=True)
    comments = db.relationship('Comment', back_populates='recipe', lazy=True, cascade='all, delete-orphan')
    
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
    
    def __repr__(self):
        return f'<Recipe {self.id}, {self.chefName}, {self.title}, {self.dietType}, {self.countryOfOrigin}, {self.comments}>'
    

#======================================= BOOKMARK MODEL =========================================================

class Bookmark(db.Model, SerializerMixin):

    __tablename__ = 'bookmarks'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipeId = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    user = db.relationship('User', back_populates='bookmarks')
    recipe = db.relationship('Recipe', back_populates='bookmarks')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'recipeId': self.recipeId,
        }
    
    def __repr__(self):
        return f'<Bookmark {self.id}, {self.userId}, {self.recipeId}>'
    

#======================================= LIKE MODEL =========================================================

class Like(db.Model, SerializerMixin):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipeId = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    user = db.relationship('User', back_populates='likes')
    recipe = db.relationship('Recipe', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'recipeId': self.recipeId,
        }
    
    def __repr__ (self):
        return f'<Like {self.id}, {self.userId}, {self.recipeId}>'

    
#======================================= RATING MODEL =========================================================

class Rating(db.Model, SerializerMixin):
    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipeId = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='ratings')
    recipe = db.relationship('Recipe', back_populates='ratings')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'recipeId': self.recipeId,
            'rating': self.rating,
        }
    
    def __repr__(self):
        return f'<Rating {self.id}, {self.userId}, {self.recipeId}, {self.rating}>'
    
#======================================= NOTIFICATION MODEL =========================================================

class Notification(db.Model, SerializerMixin):
    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String(200), nullable=False)
    isRead = db.Column(db.Boolean, default=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='notifications')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'message': self.message,
            'isRead': self.isRead,
            'timestamp': self.timestamp.isoformat(),
        }
    
    def __repr__(self):
        return f'<Notification {self.id}, {self.message}, {self.timestamp}>'

#======================================= COMMENT MODEL =========================================================

class Comment(db.Model, SerializerMixin):

    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    recipeId = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    recipe = db.relationship('Recipe', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'recipeId': self.recipeId,
            'userId': self.userId,
            'comment': self.comment,
            'timestamp': self.timestamp.isoformat(),
        }
 
    def __repr__(self):
        return f'<Comment {self.id}, {self.content}, {self.timestamp}>'


#======================================= CONTACTUS MODEL =========================================================

class Contact(db.Model, SerializerMixin):

    __tablename__ = "contactus"

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phoneNumber = db.Column(db.String(20), nullable=False)
    inquiryType = db.Column(db.String(50), nullable=False)
    message = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'phoneNumber': self.phoneNumber,
            'inquiryType': self.inquiryType,
            'message': self.message
        }

    def __repr__(self):
        return f'<Contact {self.id}, {self.firstName}, {self.email}, {self.phoneNumber}, {self.inquiryType}, {self.message}>'



