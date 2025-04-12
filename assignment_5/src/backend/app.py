from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)


@app.route('/')
def index():
    return "Welcome to the Flask API!"

if __name__ == '__main__':
    app.run()

def rjson(filename):
    base_path = os.path.dirname(__file__)
    file_path = os.path.join(base_path, filename)
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

@app.route('/backend/courses', methods=['GET'])
def get_courses():
    courses = rjson('courses.json')
    return jsonify(courses)

@app.route('/backend/testimonials', methods=['GET'])
def get_courses():
    courses = rjson('testimonials.json')
    return jsonify(courses)

if __name__ == '__main__':
    app.run()