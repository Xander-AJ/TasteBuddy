from datetime import datetime
from app import app
from models import db, User, Recipe, Bookmark, Like, Notification, Rating, Comment, Contact
from flask_bcrypt import Bcrypt
import json

# Initialize Bcrypt
bcrypt = Bcrypt(app)

# Load recipe data from db.json
with open('db.json') as f:
    data = json.load(f)

recipes_data = data['recipes']

with app.app_context():

    # Delete all rows in tables
    Comment.query.delete()
    Contact.query.delete()
    Bookmark.query.delete()
    Notification.query.delete()
    Like.query.delete()
    Rating.query.delete()
    Recipe.query.delete()
    User.query.delete()

    def seed_users():
        user1 = User(
            email='user1@example.com',
            username='user1',
            password=bcrypt.generate_password_hash("newpass").decode("utf-8"),
            firstName='Mike',
            lastName='Doe',
            title='Chef',
            aboutMe='I am a passionate chef.',
            profilePicture='https://img.freepik.com/free-photo/young-confused-afro-american-cook-chef-uniform-gestures-ok-hand-sign-isolated-orange-wall_141793-33238.jpg?t=st=1723930127~exp=1723933727~hmac=3c912eeea9d20f737d43e022debbb0c973ae746c0524624d09c6da2bbdbb0338&w=740'
        )

        user2 = User(
            email='user2@example.com',
            username='user2',
            password=bcrypt.generate_password_hash("12345678").decode("utf-8"),
            firstName='Jane',
            lastName='Doe',
            title='Food Critic',
            aboutMe='I love trying new recipes.',
            profilePicture='https://plus.unsplash.com/premium_photo-1666299612295-84f5c6355a33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWZyaWNhbiUyMGNoZWZ8ZW58MHx8MHx8fDA%3D'
        )

        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()

    def seed_recipes():
        for recipe in recipes_data:
            new_recipe = Recipe(
                chefName=recipe['chefName'],
                chefImage=recipe['chefImage'],
                title=recipe['title'],
                image=recipe['image'],
                ingredients=recipe['ingredients'],
                instructions=recipe['instructions'],
                url=recipe['url'],
                moreInfoUrl=recipe['moreInfoUrl'],
                rating=recipe['rating'],
                prepTime=recipe['prepTime'],
                servings=recipe['servings'],
                countryOfOrigin=recipe['countryOfOrigin'],
                dietType=recipe['dietType'],
                userId=recipe.get('userId')  # Assuming userId is optional
            )
            db.session.add(new_recipe)
        db.session.commit()

    def seed_bookmarks():
        bookmark1 = Bookmark(
            userId=1,
            recipeId=1
        )

        bookmark2 = Bookmark(
            userId=2,
            recipeId=2
        )

        db.session.add(bookmark1)
        db.session.add(bookmark2)
        db.session.commit()

    def seed_likes():
        like1 = Like(
            userId=1,
            recipeId=2
        )

        like2 = Like(
            userId=2,
            recipeId=1
        )

        db.session.add(like1)
        db.session.add(like2)
        db.session.commit()

    def seed_ratings():
        rating1 = Rating(
            userId=1,
            recipeId=1,
            rating=5
        )

        rating2 = Rating(
            userId=2,
            recipeId=2,
            rating=4
        )

        db.session.add(rating1)
        db.session.add(rating2)
        db.session.commit()

    def seed_notifications():
        notification1 = Notification(
            userId=1,
            message='Your recipe has been liked!',
            isRead=False
        )

        notification2 = Notification(
            userId=2,
            message='You have a new bookmark!',
            isRead=False
        )

        db.session.add(notification1)
        db.session.add(notification2)
        db.session.commit()

    def seed_comments():
        comment1 = Comment(
            recipeId=1,
            userId=2,
            content='This spaghetti is amazing!',
            timestamp=datetime.utcnow()
        )

        comment2 = Comment(
            recipeId=2,
            userId=1,
            content='The biryani is full of flavor!',
            timestamp=datetime.utcnow()
        )

        db.session.add(comment1)
        db.session.add(comment2)
        db.session.commit()

    def seed_contacts():
        contact1 = Contact(
            firstName='John',
            lastName='Smith',
            email='john.smith@example.com',
            phoneNumber='123-456-7890',
            inquiryType='Support',
            message='I need help with my account.'
        )

        contact2 = Contact(
            firstName='Mary',
            lastName='Johnson',
            email='mary.johnson@example.com',
            phoneNumber='987-654-3210',
            inquiryType='Feedback',
            message='Great website! I love the recipes.'
        )

        db.session.add(contact1)
        db.session.add(contact2)
        db.session.commit()

    # Call all the seeding functions
    seed_users()
    seed_recipes()
    seed_bookmarks()
    seed_likes()
    seed_ratings()
    seed_notifications()
    seed_comments()
    seed_contacts()
