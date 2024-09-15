from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///faqs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# FAQ Model
class FAQ(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(200), nullable=False)
    answer = db.Column(db.String(500), nullable=False)
    fruit = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {"id": self.id, "question": self.question, "answer": self.answer, "fruit": self.fruit}

# Create the database
with app.app_context():
    db.create_all()

# Routes for CRUD operations

# Fetch all FAQs
@app.route('/faqs', methods=['GET'])
def get_faqs():
    faqs = FAQ.query.all()
    return jsonify([faq.to_dict() for faq in faqs])

# Fetch a single FAQ by ID
@app.route('/faqs/<int:id>', methods=['GET'])
def get_faq_by_id(id):
    faq = FAQ.query.get(id)
    if not faq:
        return jsonify({"message": "FAQ not found"}), 404
    return jsonify(faq.to_dict())

# Create a new FAQ
@app.route('/faqs', methods=['POST'])
def create_faq():
    data = request.get_json()
    if not data or not 'question' in data or not 'answer' in data or not 'fruit' in data:
        return jsonify({"message": "Invalid data"}), 400

    new_faq = FAQ(question=data['question'], answer=data['answer'], fruit=data['fruit'])
    db.session.add(new_faq)
    db.session.commit()
    return jsonify({"message": "FAQ created successfully", "faq": new_faq.to_dict()}), 201

# Update an FAQ by ID
@app.route('/faqs/<int:id>', methods=['PUT'])
def update_faq(id):
    faq = FAQ.query.get(id)
    if not faq:
        return jsonify({"message": "FAQ not found"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"message": "No data provided"}), 400

    faq.question = data.get('question', faq.question)
    faq.answer = data.get('answer', faq.answer)
    faq.fruit = data.get('fruit', faq.fruit)
    db.session.commit()

    return jsonify({"message": "FAQ updated successfully", "faq": faq.to_dict()})

# Delete an FAQ by ID
@app.route('/faqs/<int:id>', methods=['DELETE'])
def delete_faq(id):
    faq = FAQ.query.get(id)
    if not faq:
        return jsonify({"message": "FAQ not found"}), 404

    db.session.delete(faq)
    db.session.commit()
    return jsonify({"message": "FAQ deleted successfully"})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)


