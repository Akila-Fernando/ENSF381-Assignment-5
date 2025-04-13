from flask import Flask, request, jsonify
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

students = [
    {
        "id": 1,
        "username": "student1",
        "password": "password123",
        "email": "student1@example.com",
        "enrolled_courses": []
    },
    {
        "id": 2,
        "username": "student2",
        "password": "securepass456",
        "email": "student2@gmail.com",
        "enrolled_courses": []
    },
    {
        "id": 3,
        "username": "student3",
        "password": "mypassword789",
        "email": "student3@example.com",
        "enrolled_courses": []
    }
]

# @app.route('/')
# def index():
#     return "Welcome to the Flask API!"

# def rjson(filename):
#     base_path = os.path.dirname(__file__)
#     file_path = os.path.join(base_path, filename)
#     with open(file_path, 'r', encoding='utf-8') as file:
#         return json.load(file)

# @app.route('/backend/courses', methods=['GET'])
# def get_courses():
#     courses = rjson('courses.json')
#     return jsonify(courses)

# @app.route('/backend/testimonials', methods=['GET'])
# def get_courses():
#     courses = rjson('testimonials.json')
#     return jsonify(courses)

# Route to authenticate user
@app.route('/login', methods=['POST'])
def authenticate_user():
    data = request.get_json()
    entered_username = data.get('username')
    entered_password = data.get('password')
    # Check if the entered username and password match any user in the array
    for student in students:
        if student['username'] == entered_username and student['password'] == entered_password:
            return jsonify({"authenticated": True, "message": "Authentication successful"})
    return jsonify({"authenticated": False, "message": "Authentication failed. Incorrect username or password."})

if __name__ == '__main__':
    app.run()