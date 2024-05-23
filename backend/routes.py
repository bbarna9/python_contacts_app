from app import app, db
from flask import request, jsonify
from models import Card

# Get all cards
@app.route("/api/cards", methods = ["GET"])
def get_cards():
    cards = Card.query.all()
    result = [card.to_json() for card in cards]
    return jsonify(result), 200
    
# Create a new card
@app.route("/api/cards", methods = ["POST"])
def create_card():
    try:
        data = request.json
        
        # Validate request body
        required_fields = ["name", "role", "description", "gender"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error":f"{field} field is required"}), 400
        
        name = data.get('name')
        role = data.get('role')
        description = data.get('description')
        gender = data.get('gender')
        
        # Fetch avatar image based on gender
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None
        
        new_card = Card(name=name, role=role, description=description, gender=gender, img_url=img_url)
        
        
        db.session.add(new_card)
        
        db.session.commit()
        
        return jsonify(new_card.to_json()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500

# Delete a card    
@app.route("/api/cards/<int:id>", methods = ["DELETE"])
def delete_card(id):
    try:
        card = Card.query.get(id)
        if card is None:
            return jsonify({"error":"Card not found"}), 404
        db.session.delete(card)
        db.session.commit()
        
        return jsonify({"msg":"Card deleted successfully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
    
# Update a card
@app.route("/api/cards/<int:id>", methods = ["PUT"])
def update_card(id):
    try:
        card = Card.query.get(id)
        if card is None:
            return jsonify({"error":"Card not found"}), 404
        
        data = request.json
        
        card.name = data.get('name', card.name)
        card.role = data.get('role', card.role)
        card.description = data.get('description', card.description)
        card.gender = data.get('gender', card.gender)
        
        db.session.commit()
        return jsonify(card.to_json()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500