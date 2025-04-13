# ENSF 381 Group 8 Members:
# Akila Fernando - 30169955
# Tanvi Mahalwar - 30210358


from flask import Flask, request, jsonify
import json, os, random
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
            return jsonify({"authenticated": True, "message": "Authentication successful"})
    return jsonify({"authenticated": False, "message": "Authentication failed. Incorrect username or password."})


# Random testimonials
@app.route('/testimonials', methods=['GET'])
def get_testimonials():
    try:
        backend = os.path.dirname(os.path.abspath(__file__))
        with open(os.path.join(backend, 'testimonials.json')) as f:
            testimonials_data = json.load(f)
        return jsonify(random.sample(testimonials_data, 2))
    except Exception as e:
        return jsonify({'message': f'Error loading testimonials: {str(e)}'})



# Route to enroll student in a course
@app.route('/enroll/<student_id>', methods=['POST'])
def enroll(student_id):
    data = request.get_json()
    student = data.get('student_id')
    course_id = data.get('course_id')

    if not student_id:
        return jsonify({'message': 'Student not found'})
    
    backend_folder = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(backend_folder, 'courses.json')) as f:
        courses_data = json.load(f)

    course = next((c for c in courses_data if c['id'] == course_id), None)
    if not course:
        return jsonify({'message': 'Course not found'})
    if any(c['id'] == course_id for c in student['enrolled_courses']):
        return jsonify({'message': 'Already enrolled in this course'}),

    student['enrolled_courses'].append(course)
    return jsonify({'message': 'Enrolled successfully'})


# Route to delete an enrolled course
@app.route('/drop/<student_id>', methods=['DELETE'])
def drop(student_id):
    data = request.get_json()
    student = data.get('student_id')
    course_id = data.get('course_id')

    if not student:
        return jsonify({'message': 'Student not found'})
    
    backend_folder = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(backend_folder, 'courses.json')) as f:
        courses_data = json.load(f)


    course = next((c for c in courses_data if c['id'] == course_id), None)
    if not course:
        return jsonify({'message': 'Course not found'})

    student['enrolled_courses'] = [
        c for c in student['enrolled_courses'] if c['id'] != course_id
    ]

    return jsonify({'message': 'Course dropped successfully'})


# Route to get all courses
@app.route('/courses', methods=['GET'])
def get_courses():
    try:
        backend = os.path.dirname(os.path.abspath(__file__))
        with open(os.path.join(backend, 'courses.json')) as f:
            courses_data = json.load(f)
        return jsonify(courses_data)
    except Exception as e:
        return jsonify({'message': f'Error loading courses: {str(e)}'})
    
# Route to get a course enroolled by a student
@app.route('/student_courses/<student_id>', methods=['GET'])
def get_student_courses(student_id):
    student = next((s for s in students if s['id'] == int(student_id)), None)
    if not student:
        return jsonify({'message': 'Student not found'})
    
    return jsonify(student['enrolled_courses'])


if __name__ == '__main__':
    app.run()