# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9147f24a-a5eb-4e7f-9a6d-dd7f634707ca

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9147f24a-a5eb-4e7f-9a6d-dd7f634707ca) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:
```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**
- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9147f24a-a5eb-4e7f-9a6d-dd7f634707ca) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.
Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Math Game - Flask Edition

A simple math game built with Python Flask, HTML, CSS, and JavaScript.

## Features

- Random math problems (addition, subtraction, multiplication, division)
- Difficulty levels (easy, medium, hard)
- 60-second gameplay timer
- Score tracking and statistics
- Responsive design

## Project Structure

```
math-game-flask/
│
├── app.py              # Flask application with main routes
├── templates/
│   └── index.html      # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css   # CSS styles
│   └── js/
│       └── script.js   # Frontend JavaScript logic
└── README.md           # Project documentation
```

## How to Run

1. Install Flask:
   ```
   pip install flask
   ```

2. Run the application:
   ```
   python app.py
   ```

3. Open your browser and navigate to `http://127.0.0.1:5000/`

## Game Instructions

1. Select a difficulty level (Easy, Medium, Hard)
2. Choose which operations to include (addition, subtraction, multiplication, division)
3. Click "Start Game" to begin
4. Solve as many math problems as you can within 60 seconds
5. Submit your answer by typing it in the input field and pressing Enter or clicking Submit
6. View your final score when the time runs out or when you click "End Game"



#----- Creating seperate virtual environment----**
   steps:- 
   To create a virtual environment with a specific version of Python, such as Python 3.13.1.

   1. First, locate the full path to the specific Python executable. 
         e.g:- C:\Users\gonme\AppData\Local\Programs\Python
         might see folders like:

         Python310 (Python 3.10)
         Python313 (Python 3.13.1)

            Go into the folder for Python 3.13.1, and note the path to the python.exe file:
            C:\Users\gonme\AppData\Local\Programs\Python\Python313\python.exe

   2. Now use it to create a venv In your project directory:

      "C:\Users\gonme\AppData\Local\Programs\Python\Python313\python.exe" -m venv venv
      -------> This creates a virtual environment using Python 3.13.1, without affecting any system-wide settings.
   3. Activate the venv (virtual environment)
      --->  source venv/Script/activate
   4. Then confirm which python is using
      --->  python --version
      example output:- 
         -------- Python 3.13.3

*----------- CREATING-REQUIREMENTS-FILE ----------------* 
   
   ------->  pip freeze > requirements.txt
   Expaination:- 
      pip freeze lists all packages (and exact versions) currently installed in your active virtual environment.
      > writes the output to a file named requirements.txt.
   #-----------To install from requirements.txt later-----------#
   ------->  pip install -r requirements.txt
