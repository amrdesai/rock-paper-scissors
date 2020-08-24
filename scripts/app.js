// Variables
let winningScore = 0;
let playerScore = 0;
let computerScore = 0;
const startBtn = document.getElementById('start-btn');
const playerHand = document.querySelector('.player-hand');
const computerHand = document.querySelector('.computer-hand');



const computerSelection = () => {
    const options = ['rock', 'paper', 'scissors'];
    const optionsBtn = document.querySelectorAll('.options button');
    
    
    optionsBtn.forEach(option => {
        option.addEventListener('click', function() {
            // Generate random option for Computer
            const computerChoice = options[Math.floor(Math.random() * 3)];
            console.log(computerChoice);
        });
    });


}

const game = () => {
    // Current view 
    const startGameScreen = document.querySelector('.start-game-screen');
    
    // Game  Page
    const gameScreen = document.querySelector('.game-screen');

    // Get the entered winning score
    const winningScoreValue = document.getElementById('winning-score-input').value;

    // Load game page if winning score is greater than 0
    if(parseInt(winningScoreValue) > 0) {
        startGameScreen.style.display = 'none'
        gameScreen.style.display = 'block'
    }

    // 
    computerSelection();

}


// Start Game - Event Listener
startBtn.addEventListener('click', game);

