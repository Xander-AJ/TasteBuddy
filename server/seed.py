from datetime import datetime
from app import app
from models import db, User, Recipe, Bookmark, Like, Notification, Rating, Comment, Contact
from flask_bcrypt import Bcrypt

# Initialize Bcrypt
bcrypt = Bcrypt(app)

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
        recipe1 = Recipe(
            chefName='Chef John',
            chefImage='https://img.freepik.com/free-photo/head-cook-throwing-fresh-chopped-herbs-pan-improve-taste-meal-while-professional-kitchen-master-chef-seasoning-dish-prepared-food-contest-held-fine-dining-restaurant_482257-40137.jpg?ga=GA1.2.1322605301.1720433628&semt=ais_hybrid',
            title='Spaghetti Carbonara',
            image='https://img.freepik.com/free-photo/pasta-plate-chopping-board-with-fork_23-2148357206.jpg?t=st=1723926966~exp=1723930566~hmac=6c8ea80cf3409e569e0af4c45145f9635731c1c03f4a1f041130ef885777c16b&w=740',
            ingredients='Spaghetti, eggs, pancetta, parmesan, garlic',
            instructions='Cook spaghetti, mix with eggs and cheese, add pancetta and garlic.',
            url='http://example.com/spaghetti-carbonara',
            moreInfoUrl='http://example.com/more-info-spaghetti-carbonara',
            rating=5,
            prepTime='30 minutes',
            servings=4,
            countryOfOrigin='Italy',
            dietType='Non-Vegetarian',
            userId=1
        )

        recipe2 = Recipe(
            chefName='Chef Jane',
            chefImage='https://img.freepik.com/free-photo/horizontal-shot-young-attractive-african-cook-cutting-vegetables-with-knife_181624-52268.jpg?ga=GA1.2.1322605301.1720433628&semt=ais_hybrid',
            title='Chicken Biryani',
            image='https://plus.unsplash.com/premium_photo-1694141251673-1758913ade48?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            ingredients='1 whole Chicken (Cut into 8 pieces), 5 whole tomatoes (chopped), 6 onions Sliced, (Deep fried until golden and crispy),1 chilli (Chopped), 3 tbsp tomato paste, 1–2 tbsp Cumin (ground), 1 tbsp sugar, 1 tsp cinnamon (ground), 1/4 tsp cloves (ground), 1 tsp cardamom (ground), 1 tsp black pepper, 1 tsp ginger (crushed), 1 tsp garlic (crushed). 1 1/2 cup water, 3 potatoes (peeled; halved & deep fried), 3 tbsp Coriander (roughly chopped), 1 chilli (chopped), 1/2 cup Mala (or natural yoghurt)',
            instructions='In a thick bottomed pan, add 1 tbsp ghee followed by the tomato paste and fry it for 1 min on medium heat, Add 1 tbsp cumin, 1/2 tsp ground cinnamon, 1 tsp ground cardamom, 1/2 tsp black pepper and a few cloves (4-5), Cook the spices for 2 min then add the chopped tomatoes and cover the pan, After 13 min, add the chicken, garlic, ginger, fresh chilly and, salt, Cover and cook until chicken soften (about 15min), Add 1/2 cup of mala or natural yoghurt cover and reduce the heat, Deep fry your sliced onions if you haven’t and also fry the potatoes until a skin forms, Add the deep friend and onions and potatoes to the biryani, Cook until the potatoes are soft, Serve with rice.',
            url='http://example.com/greek-salad',
            moreInfoUrl='http://example.com/more-info-greek-salad',
            rating=4,
            prepTime='15 minutes',
            servings=2,
            countryOfOrigin='Kenya',
            dietType='Meatarian',
            userId=2  # Link to the user created above
        )
        db.session.add(recipe1)
        db.session.add(recipe2)
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
