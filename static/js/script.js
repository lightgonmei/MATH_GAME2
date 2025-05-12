// Game state
let gameState = {
    score: 0,
    totalQuestions: 0,
    timeLeft: 60,
    gameStarted: false,
    currentProblem: null,
    timer: null,
    difficulty: "medium",
    operations: {
        "+": true,
        "-": true,
        "*": true,
        "/": true
    }
};

// DOM elements
const gameSetupSection = document.getElementById('game-setup');
const gamePlaySection = document.getElementById('game-play');
const startGameButton = document.getElementById('start-game');
const endGameButton = document.getElementById('end-game');
const answerForm = document.getElementById('answer-form');
const answerInput = document.getElementById('answer');
const scoreDisplay = document.getElementById('score');
const totalDisplay = document.getElementById('total');
const timerDisplay = document.getElementById('timer');
const timeBar = document.getElementById('time-bar');
const num1Display = document.getElementById('num1');
const num2Display = document.getElementById('num2');
const operationDisplay = document.getElementById('operation');
const correctCountDisplay = document.getElementById('correct-count');
const totalCountDisplay = document.getElementById('total-count');
const accuracyDisplay = document.getElementById('accuracy');
const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');
const operationButtons = document.querySelectorAll('.operation-btn');
const toast = document.getElementById('toast');

// Event listeners
startGameButton.addEventListener('click', startGame);
endGameButton.addEventListener('click', endGame);
answerForm.addEventListener('submit', handleAnswerSubmit);

// Set up difficulty change handlers
difficultyRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        gameState.difficulty = e.target.value;
    });
});

// Set up operation toggle buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const operation = button.dataset.operation;
        
        // Toggle selected state
        button.classList.toggle('selected');
        
        // Update gameState
        gameState.operations[operation] = button.classList.contains('selected');
        
        // Make sure at least one operation is selected
        const hasOperationSelected = Object.values(gameState.operations).some(Boolean);
        if (!hasOperationSelected) {
            button.classList.add('selected');
            gameState.operations[operation] = true;
        }
    });
});

// Helper functions
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(gameState.timeLeft);
    
    // Update progress bar
    const progressPercent = (gameState.timeLeft / 60) * 100;
    timeBar.style.width = `${progressPercent}%`;
    
    // Update timer color based on time left
    if (gameState.timeLeft <= 10) {
        timerDisplay.className = 'timer danger';
    } else if (gameState.timeLeft <= 30) {
        timerDisplay.className = 'timer warning';
    } else {
        timerDisplay.className = 'timer';
    }
}

function updateScoreDisplay() {
    scoreDisplay.textContent = gameState.score;
    totalDisplay.textContent = gameState.totalQuestions;
    correctCountDisplay.textContent = gameState.score;
    totalCountDisplay.textContent = gameState.totalQuestions;
    
    // Update accuracy
    let accuracy = 0;
    if (gameState.totalQuestions > 0) {
        accuracy = Math.round((gameState.score / gameState.totalQuestions) * 100);
    }
    accuracyDisplay.textContent = `${accuracy}%`;
}

function updateProblemDisplay() {
    if (!gameState.currentProblem) return;
    
    num1Display.textContent = gameState.currentProblem.num1;
    num2Display.textContent = gameState.currentProblem.num2;
    
    // Update operation symbol
    let symbol = '+';
    switch (gameState.currentProblem.operation) {
        case '-': symbol = '−'; break;
        case '*': symbol = '×'; break;
        case '/': symbol = '÷'; break;
    }
    operationDisplay.textContent = symbol;
}

function showToast(message, type = '') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    // Auto-hide after 2 seconds
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2000);
}

// Game functions
async function generateNewProblem() {
    try {
        const response = await fetch('/generate-problem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                difficulty: gameState.difficulty,
                operations: gameState.operations
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to generate problem');
        }
        
        gameState.currentProblem = await response.json();
        updateProblemDisplay();
        gameState.totalQuestions++;
        updateScoreDisplay();
    } catch (error) {
        console.error('Error generating problem:', error);
        showToast('Error generating problem. Please try again.', 'error');
    }
}

async function checkAnswer(userAnswer) {
    try {
        const response = await fetch('/check-answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userAnswer: userAnswer,
                correctAnswer: gameState.currentProblem.answer
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to check answer');
        }
        
        const result = await response.json();
        
        if (result.correct) {
            gameState.score++;
            updateScoreDisplay();
            showToast('Correct!', 'success');
            return true;
        } else {
            showToast('Incorrect. Try again!', 'error');
            return false;
        }
    } catch (error) {
        console.error('Error checking answer:', error);
        showToast('Error checking answer. Please try again.', 'error');
        return false;
    }
}

async function handleAnswerSubmit(e) {
    e.preventDefault();
    
    if (!gameState.gameStarted) return;
    
    const userAnswer = parseFloat(answerInput.value);
    
    if (isNaN(userAnswer)) {
        showToast('Please enter a valid number', 'error');
        return;
    }
    
    const isCorrect = await checkAnswer(userAnswer);
    
    if (isCorrect) {
        answerInput.value = '';
        generateNewProblem();
    }
    
    answerInput.focus();
}

function startGame() {
    gameState.score = 0;
    gameState.totalQuestions = 0;
    gameState.timeLeft = 60;
    gameState.gameStarted = true;
    
    generateNewProblem();
    updateTimerDisplay();
    
    // Show game play section, hide setup
    gameSetupSection.classList.add('hidden');
    gamePlaySection.classList.remove('hidden');
    
    // Focus on answer input
    answerInput.value = '';
    answerInput.focus();
    
    // Start timer
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        updateTimerDisplay();
        
        if (gameState.timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameState.gameStarted = false;
    
    // Clear timer
    clearInterval(gameState.timer);
    
    // Show game setup section, hide play
    gamePlaySection.classList.add('hidden');
    gameSetupSection.classList.remove('hidden');
    
    // Show final score
    showToast(`Game Over! Your score: ${gameState.score} out of ${gameState.totalQuestions}`, 'success');
}

// Initialize display
updateTimerDisplay();
updateScoreDisplay();