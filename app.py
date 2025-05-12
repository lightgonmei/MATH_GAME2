from flask import Flask, render_template, request, jsonify
import random
import os

app = Flask(__name__)

@app.route('/')
def index():
    """Render the main game page."""
    return render_template('index.html')

@app.route('/generate-problem', methods=['POST'])
def generate_problem():
    """Generate a new math problem based on the provided difficulty and operations."""
    data = request.get_json()
    difficulty = data.get('difficulty', 'medium')
    operations = data.get('operations', {})
    
    # Convert operations from JavaScript format to Python
    enabled_operations = []
    if operations.get('+'): enabled_operations.append('+')
    if operations.get('-'): enabled_operations.append('-')
    if operations.get('*'): enabled_operations.append('*')
    if operations.get('/'): enabled_operations.append('/')
    
    # Default to addition if nothing selected
    if not enabled_operations:
        enabled_operations = ['+']
    
    # Get difficulty ranges
    difficulty_ranges = {
        "easy": {"min": 1, "max": 10},
        "medium": {"min": 1, "max": 25},
        "hard": {"min": 1, "max": 50}
    }
    
    range_values = difficulty_ranges.get(difficulty, difficulty_ranges['medium'])
    min_val, max_val = range_values['min'], range_values['max']
    
    # Generate random numbers
    num1 = random.randint(min_val, max_val)
    num2 = random.randint(min_val, max_val)
    
    # Select operation
    operation = random.choice(enabled_operations)
    
    # Handle division special case
    if operation == '/':
        # Ensure division results in clean integer (no remainder)
        answer = random.randint(min_val, max_val)
        num1 = answer * num2
    else:
        # Calculate answer for other operations
        if operation == '+':
            answer = num1 + num2
        elif operation == '-':
            # Ensure result is positive for easier math
            if num1 < num2:
                num1, num2 = num2, num1
            answer = num1 - num2
        elif operation == '*':
            answer = num1 * num2
    
    problem = {
        "num1": num1,
        "num2": num2,
        "operation": operation,
        "answer": answer
    }
    
    return jsonify(problem)

@app.route('/check-answer', methods=['POST'])
def check_answer():
    """Check if the provided answer is correct."""
    data = request.get_json()
    user_answer = data.get('userAnswer')
    correct_answer = data.get('correctAnswer')
    
    # Handle potential floating point comparison issues
    is_correct = abs(float(user_answer) - float(correct_answer)) < 0.001
    
    return jsonify({"correct": is_correct})

if __name__ == '__main__':
    app.run(debug=True)