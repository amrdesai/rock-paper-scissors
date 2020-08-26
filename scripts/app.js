// Initial Screen 
const startGameScreen = document.querySelector('.start-game-screen');
// Game Screen
const gameScreen = document.querySelector('.game-screen');
// Player & computer hands
const playerHand = document.querySelector('.player-hand');
const computerHand = document.querySelector('.computer-hand');
// Variables
let winningScore = 0;
let playerScore = 0;
let compScore = 0;
const startBtn = document.getElementById('start-btn');
// Get winner text 
const winner = document.querySelector('.winner');
// Option buttons
const optionsBtn = document.querySelectorAll('.options button');
// Game over div
const gameOverDiv = document.querySelector('.game-over');
// Restart game button
const restartBtn = document.getElementById('restart');
// Reset button
const resetBtn = document.getElementById('reset-winning-score');



// Restart Game Function
function restartGame() {
    // Reset scores
    playerScore = 0;
    compScore = 0;

    // Reset player hands images
    playerHand.src = `./resources/rock.png`;
    playerHand.alt = `Rock Image`;
    
    computerHand.src = `./resources/rock.png`;
    computerHand.alt = `Rock Image`;

    // Hide gameover div
    gameOverDiv.style.display = 'none';

    // Enable buttons
    enableOptionBtn();
    
    // Update scoreboard
    updateScore();
    winner.textContent = `Choose an option`;
}

// Disable option buttons
function disableOptionBtn() {
    // Disable option buttons
    optionsBtn.forEach(button => {
        button.disabled = true;
        button.classList.add('button-disable');
    });
}

// Enable option button
function enableOptionBtn() {
    // Disable option buttons
    optionsBtn.forEach(button => {
        button.disabled = false;
        button.classList.remove('button-disable');
    });
}

// Check if game over
function ifGameOver() {
    if(playerScore === winningScore) {
        winner.textContent = 'YOU WON THE GAME!';
        disableOptionBtn();
        gameOverDiv.style.display = 'block';
    } else if (compScore === winningScore) {
        winner.textContent = 'YOU LOST THE GAME!';
        disableOptionBtn();
        gameOverDiv.style.display = 'block';
    }
}

// Update game scoreboard
function updateScore() {
    // Get player & computer scores elements
    const playerScoreEl = document.getElementById('player-score');
    const compScoreEl = document.getElementById('computer-score');
    // update the score
    playerScoreEl.textContent = playerScore;
    compScoreEl.textContent = compScore;
}

// Play Match
function playMatch() {
    // Computer options
    const compOptions = ['rock', 'paper', 'scissors'];

    // Add event listener for player selection & random computer choice
    optionsBtn.forEach(option => {
        option.addEventListener('click', function() {
            // Generate random choice for computer
            const computerChoice = compOptions[Math.floor(Math.random() * 3)];
            // Player's selectied option
            const playerChoice = this.textContent;

            // Hands starting position
            playerHand.src = `./resources/rock.png`;
            computerHand.src = `./resources/rock.png`;

            // Animated shake effect
            playerHand.style.animation = 'playerShakeEffect 1s ease';
            computerHand.style.animation = 'computerShakeEffect 1s ease';
            
            // Timeout delay
            setTimeout(() => {
                // Compare hands
                compareChoices(playerChoice, computerChoice);
                
                //  Update Images
                playerHand.src = `./resources/${playerChoice}.png`;
                playerHand.alt = `${playerChoice}`;
                
                computerHand.src = `./resources/${computerChoice}.png`;
                computerHand.alt = `${computerChoice}`;
                
                // Update Score
                updateScore();

                // Reset animation
                playerHand.style.animation = '';
                computerHand.style.animation = '';

                // Check if game is over
                ifGameOver();
            }, 1000);
            
        });
    });
}

// Compare player choice v/s computer choice and change text
function compareChoices(playerChoice, compChoice) {
    // Check who wins the round 
    if(playerChoice === compChoice) {
        winner.textContent = `It's a draw!`;
        return;
    } else if(playerChoice === 'rock') {
        if(compChoice === 'paper') {
            winner.textContent = `Computer won this round!`;
            compScore++;
            return;
        } else {
            winner.textContent = 'You won this round!';
            playerScore++;
            return;
        }
    } else if(playerChoice === 'paper') {
        if(compChoice === 'scissors') {
            winner.textContent = `Computer won this round!`;
            compScore++;
            return;
        } else {
            winner.textContent = 'You won this round!';
            playerScore++;
            return;
        }
    } else if(playerChoice === 'scissors') {
        if(compChoice === 'rock') {
            winner.textContent = `Computer won this round!`;
            compScore++;
            return;
        } else {
            winner.textContent = 'You won this round!';
            playerScore++;
            return;
        }
    }
}

// Start game function
function startGame() {
    // Get the entered winning score
    const winningScoreValue = document.getElementById('winning-score-input').value;
    // Load game page only if winning score is entered greater than 0
    if(parseInt(winningScoreValue) > 0) {
        // Hide start game screen
        startGameScreen.style.display = 'none';
        // Show game screen
        gameScreen.style.display = 'block';
        // Update winning score in the App
        winningScore = parseInt(winningScoreValue);
        // Display winning score for both players
        const toWinScore = document.querySelectorAll('.score-to-win');
        toWinScore.forEach(item => {
            item.textContent = winningScoreValue;
        });
    }
    playMatch();
}


// Start Game - Event Listener
startBtn.addEventListener('click', startGame);

// Restart Game - Event Listener
restartBtn.addEventListener('click', restartGame);

// Restart Game - Event Listener
resetBtn.addEventListener('click', () => {
    location.reload();
});