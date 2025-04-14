# ENSF 381 Group 8 Members:
# Akila Fernando - 30169955
# Tanvi Mahalwar - 30210358

from flask import Flask, request, jsonify, json
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open('courses.json', 'r') as file:
    courses = json.load(file)

with open('testimonials.json', 'r') as file:
    testimonials = json.load(file)

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

#Route to register student
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    for student in students:
        if(student['username'] == username):
            return jsonify({"success": False, "message": "Username is already taken."})

    new_student = {
        "id": len(students) + 1,
        "username": username,
        "password": password,
        "email": email,
        "enrolled_courses": []
    }
    students.append(new_student)

    return jsonify({"success": True, "message": "Registration successful."})

# Route to authenticate user
@app.route('/login', methods=['POST'])
def authenticate_user():
    data = request.get_json()
    entered_username = data.get('username')
    entered_password = data.get('password')
    # Check if the entered username and password match any user in the array
    for student in students:
        if student['username'] == entered_username and student['password'] == entered_password:
            return jsonify({"authenticated": True, "message": "Authentication successful", "student": student})
    return jsonify({"authenticated": False, "message": "Authentication failed. Incorrect username or password."})


# Random testimonials
@app.route('/testimonials', methods=['GET'])
def get_random_testimonials():
    random_testimonials = random.sample(testimonials, 2)
    return jsonify(random_testimonials)

@app.route('/courses/random', methods=['GET'])
def get_random_courses():
    random_courses = random.sample(courses, 3)
    return jsonify(random_courses)

# Route to enroll student in a course
@app.route('/enroll/<student_id>', methods=['POST'])
def enroll_course(student_id):
    course = request.get_json()

    student = None
    for s in students:
        if s['id'] == int(student_id):
            student = s
            break

    if not student:
        return jsonify({"message": "Student not found"})

    student['enrolled_courses'].append(course)
    return jsonify({"message": "Course enrolled successfully"})

# # Route to delete an enrolled course
@app.route('/drop/<student_id>', methods=['DELETE'])
def drop_course(student_id):
    data = request.get_json()
    course_id = data.get('id')

    student = None
    for s in students:
        if s['id'] == int(student_id):
            student = s
            break

    if not student:
        return jsonify({"message": "Student not found"})
    
    return jsonify({"message": "Course dropped successfully"})

# Route to get all available courses
@app.route('/courses', methods=['GET'])
def get_all_courses():
    return jsonify(courses)


# Route to get courses enrolled by a student
@app.route('/student_courses/<student_id>', methods=['GET'])
def get_student_courses(student_id):
    student = None
    for s in students:
        if s['id'] == int(student_id):
            student = s
            break

    if not student:
        return jsonify([])

    return jsonify(student['enrolled_courses'])



if __name__ == '__main__':
    app.run()