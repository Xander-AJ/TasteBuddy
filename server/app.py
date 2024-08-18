import random
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required,  get_jwt
from datetime import timedelta
from flask_cors import CORS

app  = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tastetribe.db"
app.config["JWT_SECRET_KEY"] = "fsbdgfnhgvjnvhmvh"+str(random.randint(1,1000000000000)) 
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
app.config["SECRET_KEY"] = "JKSRVHJVFBSRDFV"+str(random.randint(1,1000000000000))


bcrypt = Bcrypt(app)
jwt = JWTManager(app)

from models import db, User, Recipe, Bookmark, Like, Notification, Rating, Comment, Contact

migrate = Migrate(app, db, render_as_batch=True)
db.init_app(app)


#======================================= SIGNUP ROUTES ================================================================

@app.route('/signup', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    password = data['password']
    username = data['username']

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered'}), 409

    user = User(email=email, password=password, username=username)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


#======================================= LOGIN ROUTES =========================================================

# Login
@app.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token":access_token})

    else:
        return jsonify({"message":"Invalid email or password"}), 401
    

#======================================= CURRENT USER ROUTES =========================================================

# Fetch current user
@app.route("/currentUser", methods=["GET"])
@jwt_required()
def get_current_user():
    currentUserId =  get_jwt_identity()
    currentUser = User.query.get(currentUserId)

    if currentUser:
        return jsonify({"id":currentUser.id, "name":currentUser.name, "email":currentUser.email}), 200
    else:
        jsonify({"error":"User not found"}), 404


#======================================= LOGOUT ROUTES =========================================================

# Logout
BLACKLIST = set()
@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, decrypted_token):
    return decrypted_token['jti'] in BLACKLIST

@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"success":"Successfully logged out"}), 200


#====================================== USERS ROUTES ==================================================================
# Add user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    newUser = User(
        username=data['name'], 
        email=data['email'], 
        password=data['password']
        ) 
    
    db.session.add(newUser)
    db.session.commit()
    return jsonify({'success': 'User created successfully'}), 201

# Get single user
@app.route('/users/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict()), 200

# Update user
@app.route('/users/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()

    user.username = data.get('username', user.username)
    user.firstName = data.get('firstName', user.firstName)
    user.lastName = data.get('lastName', user.lastName)
    user.title = data.get('title', user.title)
    user.aboutMe = data.get('aboutMe', user.aboutMe)
    user.profilePicture = data.get('profilePicture', user.profilePicture)
    
    db.session.commit()
    return jsonify(user.to_dict()), 200

# Delete user
@app.route('/users/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200


# ================================== RECIPES ROUTES ===========================================================
# Get All Recipes
@app.route('/recipes', methods=['GET'])
@jwt_required()
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify([recipe.to_dict() for recipe in recipes]), 200


# Add Recipe
@app.route('/recipes', methods=['POST'])
def create_recipe():
    data = request.get_json()
    recipe = Recipe(
        chefName=data['chefName'],
        chefImage=data['chefImage'],
        title=data['title'],
        image=data['image'],
        ingredients=data['ingredients'],
        instructions=data['instructions'],
        url=data['url'],
        moreInfoUrl=data['moreInfoUrl'],
        rating=data['rating'],
        prepTime=data['prepTime'],
        servings=data['servings'],
        countryOfOrigin=data['countryOfOrigin'],
        dietType=data['dietType'],
        userId=data['userId']
    )

    db.session.add(recipe)
    db.session.commit()
    return jsonify(recipe.to_dict()), 201


# Get Single Recipe
@app.route('/recipes/<int:id>', methods=['GET'])
def get_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    return jsonify(recipe.to_dict()), 200

# Update Recipe
@app.route('/recipes/<int:id>', methods=['PUT'])
def update_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    data = request.get_json()

    recipe.chefName=data['chefName'],
    recipe.chefImage=data['chefImage'],
    recipe.title=data['title'],
    recipe.image=data['image'],
    recipe.ingredients=data['ingredients'], 
    recipe.instructions=data['instructions'],
    recipe.url=data['url'],
    recipe.moreInfoUrl=data['moreInfoUrl'],
    recipe.rating=data['rating'],
    recipe.prepTime=data['prepTime'],
    recipe.servings=data['servings'],
    recipe.countryOfOrigin=data['countryOfOrigin'],
    recipe.dietType=data['dietType'],
    recipe.userId=data['userId']

    db.session.commit()
    return jsonify(recipe.to_dict()), 200

# Delete Recipe
@app.route('/recipes/<int:id>', methods=['DELETE'])
def delete_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    db.session.delete(recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe deleted successfully'}), 200


# ================================== BOOKMARKS ROUTES ===========================================================
# GET bookmarks
@app.route('/bookmarks', methods=['GET'])
def get_bookmarks():
    bookmarks = Bookmark.query.all()
    return jsonify([bookmark.to_dict() for bookmark in bookmarks]), 200

# GET a single bookmark
@app.route('/bookmarks/<int:id>', methods=['GET'])
def get_bookmark(id):
    bookmark = Bookmark.query.get_or_404(id)
    return jsonify(bookmark.to_dict()), 200

# POST a bookmark
@app.route('/bookmarks', methods=['POST'])
def create_bookmark():
    data = request.get_json()
    new_bookmark = Bookmark(
        userId=data['userId'],
        recipeId=data['recipeId']
    )
    db.session.add(new_bookmark)
    db.session.commit()
    return jsonify(new_bookmark.to_dict()), 201

# PUT a bookmark
@app.route('/bookmarks/<int:id>', methods=['PUT'])
def update_bookmark(id):
    bookmark = Bookmark.query.get_or_404(id)
    data = request.get_json()
    bookmark.userId = data.get('userId', bookmark.userId)
    bookmark.recipeId = data.get('recipeId', bookmark.recipeId)
    db.session.commit()
    return jsonify(bookmark.to_dict()), 200

# Delete a bookmark
@app.route('/bookmarks/<int:id>', methods=['DELETE'])
def delete_bookmark(id):
    bookmark = Bookmark.query.get_or_404(id)
    db.session.delete(bookmark)
    db.session.commit()
    return '', 204

# ================================== LIKES ROUTES ==============================================================
# GET likes
@app.route('/likes', methods=['GET'])
def get_likes():
    likes = Like.query.all()
    return jsonify([like.to_dict() for like in likes]), 200

# GET a single like
@app.route('/likes/<int:id>', methods=['GET'])
def get_like(id):
    like = Like.query.get_or_404(id)
    return jsonify(like.to_dict()), 200

# POST a like
@app.route('/likes', methods=['POST'])
def create_like():
    data = request.get_json()
    new_like = Like(
        userId=data['userId'],
        recipeId=data['recipeId']
    )
    db.session.add(new_like)
    db.session.commit()
    return jsonify(new_like.to_dict()), 201

# PUT a like
@app.route('/likes/<int:id>', methods=['PUT'])
def update_like(id):
    like = Like.query.get_or_404(id)
    data = request.get_json()
    like.userId = data.get('userId', like.userId)
    like.recipeId = data.get('recipeId', like.recipeId)
    db.session.commit()
    return jsonify(like.to_dict()), 200

# Delete/Unlike
@app.route('/likes/<int:id>', methods=['DELETE'])
def delete_like(id):
    like = Like.query.get_or_404(id)
    db.session.delete(like)
    db.session.commit()
    return '', 204


# ================================== RATINGS ROUTES ===========================================================
# GET Ratings
@app.route('/ratings', methods=['GET'])
def get_ratings():
    ratings = Rating.query.all()
    return jsonify([rating.to_dict() for rating in ratings]), 200

# GET a single rating
@app.route('/ratings/<int:id>', methods=['GET'])
def get_rating(id):
    rating = Rating.query.get_or_404(id)
    return jsonify(rating.to_dict()), 200

# POST a Rating
@app.route('/ratings', methods=['POST'])
def create_rating():
    data = request.get_json()
    new_rating = Rating(
        userId=data['userId'],
        recipeId=data['recipeId'],
        rating=data['rating']
    )
    db.session.add(new_rating)
    db.session.commit()
    return jsonify(new_rating.to_dict()), 201

# PUT a Rating/Update/Change
@app.route('/ratings/<int:id>', methods=['PUT'])
def update_rating(id):
    rating = Rating.query.get_or_404(id)
    data = request.get_json()
    rating.userId = data.get('userId', rating.userId)
    rating.recipeId = data.get('recipeId', rating.recipeId)
    rating.rating = data.get('rating', rating.rating)
    db.session.commit()
    return jsonify(rating.to_dict()), 200

# Delete a rating
@app.route('/ratings/<int:id>', methods=['DELETE'])
def delete_rating(id):
    rating = Rating.query.get_or_404(id)
    db.session.delete(rating)
    db.session.commit()
    return '', 204


# ================================== NOTIFICATIONS ROUTES ===========================================================
# Get Notifications
@app.route('/notifications', methods=['GET'])
def get_notifications():
    notifications = Notification.query.all()
    return jsonify([notification.to_dict() for notification in notifications]), 200

# GET a single notification
@app.route('/notifications/<int:id>', methods=['GET'])
def get_notification(id):
    notification = Notification.query.get_or_404(id)
    return jsonify(notification.to_dict()), 200

# POST a notification
@app.route('/notifications', methods=['POST'])
def create_notification():
    data = request.get_json()
    new_notification = Notification(
        userId=data['userId'],
        message=data['message'],
        isRead=data.get('isRead', False)
    )
    db.session.add(new_notification)
    db.session.commit()
    return jsonify(new_notification.to_dict()), 201

# PUT a notication
@app.route('/notifications/<int:id>', methods=['PUT'])
def update_notification(id):
    notification = Notification.query.get_or_404(id)
    data = request.get_json()
    notification.userId = data.get('userId', notification.userId)
    notification.message = data.get('message', notification.message)
    notification.isRead = data.get('isRead', notification.isRead)
    db.session.commit()
    return jsonify(notification.to_dict()), 200

# Delete a notification
@app.route('/notifications/<int:id>', methods=['DELETE'])
def delete_notification(id):
    notification = Notification.query.get_or_404(id)
    db.session.delete(notification)
    db.session.commit()
    return '', 204

#======================================== COMMENTS ROUTES =====================================================================
# Get All Comments

@app.route('/comments', methods = ["GET"])
@jwt_required()
def get_comments():
    comments = Comment.query.all()
    return jsonify([comment.to_dict() for comment in comments]), 200

# Get a Single Comment
@app.route('/comments/<int:id>', methods = ["GET"])
@jwt_required()
def get_comment(id):
    comment = Comment.query.get_or_404(id)
    return jsonify(comment.to_dict()), 200

# POST a Comment
@app.route('/comments', methods = ["POST"])
@jwt_required()
def create_comment():
    data = request.get_json()
    new_comment = Comment(
        userId = data['userId'],
        recipeId = data['recipeId'],
        content = data['content']
    )
    db.session.add(new_comment)
    db.session.commit()
    return jsonify(new_comment.to_dict()), 201

# PUT a Comment
@app.route('/comments/<int:id>', methods = ["PUT"])
@jwt_required()
def update_comment(id):
    comment = Comment.query.get_or_404(id)
    data = request.get_json()
    comment.userId = data.get('userId', comment.userId)
    comment.recipeId = data.get('recipeId', comment.recipeId)
    comment.content = data.get('content', comment.content)
    db.session.commit()
    return jsonify(comment.to_dict()), 200

# Delete a Comment
@app.route('/comments/<int:id>', methods = ["DELETE"])
@jwt_required()
def delete_comment(id):
    comment = Comment.query.get_or_404(id)
    db.session.delete(comment)
    db.session.commit()
    return '', 204

#======================================== CONTACT US ROUTES =====================================================================

@app.route('/contactus', methods=['POST'])
def contact():
    if request.method == 'POST':
        try:
            data = request.json

            if not all(key in data for key in ['firstName', 'lastName', 'email', 'phoneNumber', 'inquiryType', 'message']):
                return jsonify({'error': 'Missing required fields'}), 400

            new_contact = Contact(
                firstName = data['firstName'],
                lastName = data['lastName'],
                email = data['email'],
                phoneNumber = data['phoneNumber'],
                inquiryType = data['inquiryType'],
                message = data['message']
            )
            db.session.add(new_contact)
            db.session.commit()
            return jsonify({'message': 'Message received!'}), 201
        
        except KeyError as e:
            return jsonify({'error': 'Missing required field: {}'.format(str(e))}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    app.run(port=5555, debug=True)