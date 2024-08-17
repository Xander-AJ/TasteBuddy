from flask import Blueprint, request, jsonify
from server.models import Recipe, db

recipe_bp = Blueprint('recipe', __name__)

@recipe_bp.route('/recipes', methods=['GET'])
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify([recipe.to_dict() for recipe in recipes]), 200

@recipe_bp.route('/recipes', methods=['POST'])
def create_recipe():
    data = request.get_json()
    recipe = Recipe(
        title=data['title'],
        content=data['content'],
        image_url=data['image_url'],
        diet_type=data['diet_type'],
        prep_time=data['prep_time'],
        servings=data['servings'],
        author_id=data['author_id']
    )
    db.session.add(recipe)
    db.session.commit()
    return jsonify(recipe.to_dict()), 201

@recipe_bp.route('/recipes/<int:id>', methods=['GET'])
def get_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    return jsonify(recipe.to_dict()), 200

@recipe_bp.route('/recipes/<int:id>', methods=['PUT'])
def update_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    data = request.get_json()

    recipe.title = data['title']
    recipe.content = data['content']
    recipe.image_url = data['image_url']
    recipe.diet_type = data['diet_type']
    recipe.prep_time = data['prep_time']
    recipe.servings = data['servings']

    db.session.commit()
    return jsonify(recipe.to_dict()), 200

@recipe_bp.route('/recipes/<int:id>', methods=['DELETE'])
def delete_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    db.session.delete(recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe deleted successfully'}), 200
