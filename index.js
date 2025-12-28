// player name elements
const player1Name = document.getElementById('player1-name');
const player2Name = document.getElementById('player2-name');
const player1Input = document.getElementById('player1-name-input');
const player2Input = document.getElementById('player2-name-input');
let gameActive = true;

// win condition elements
const winRadio = document.getElementsByName('win-condition');
const win11 = document.getElementById('win-11');
const win21 = document.getElementById('win-21');
const win30 = document.getElementById('win-30');
const customWin = document.getElementById('custom-win');
const customWinInput = document.getElementById('custom-win-input');
let winPoints;
let bestOf;
let gamesNeeded;
let player1GamesWon = 0;
let player2GamesWon = 0;


Array.from(winRadio).forEach(function(radio) {
    radio.addEventListener("change", function() {
        if (radio.value === "custom" && radio.checked) {
            customWinInput.disabled = false;
        } else {
            customWinInput.disabled = true;
        }
    });
});

function startGame() {
    gameActive = true;
    if (!player1Input.value || !player2Input.value) {
        alert("Please enter names for both players!");
        return;
    }
    const selectedWinRadio = document.querySelector('input[name="win-condition"]:checked');
    
    if (selectedWinRadio.value === "custom") {
        winPoints = Number(customWinInput.value);
    } else {
        winPoints = Number(selectedWinRadio.value);
    }

    const selectedBoRadio = document.querySelector('input[name="bo-condition"]:checked');
    bestOf = Number(selectedBoRadio.value);
    gamesNeeded = Math.ceil(bestOf / 2);



    player1Name.textContent = player1Input.value;
    player2Name.textContent = player2Input.value;

    // change it after adding css
    document.getElementById('player-reg').style.display = 'none';
    document.getElementById('scoreboard').style.display = 'block';

}
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener("click", startGame);


// game start
const addPoints1 = document.getElementById('add-points1');
const addPoints2 = document.getElementById('add-points2');
const minusPoints1 = document.getElementById('minus-points1');
const minusPoints2 = document.getElementById('minus-points2');
const resetGameBtn = document.getElementById('reset-game-btn');
const newSessionBtn = document.getElementById('new-session-btn');
let player1Score = document.getElementById('player1-score');
let player2Score = document.getElementById('player2-score');

function scoreIncrement(playerScore, playerNum) {
    let currentScore = Number(playerScore.textContent);
    currentScore += 1;
    playerScore.textContent = currentScore;

    if (currentScore >= winPoints) {
        let winnerName;
        if (playerNum === 1) {
            player1GamesWon += 1;
            winnerName = player1Name.textContent;
        } else {
            player2GamesWon += 1;
            winnerName = player2Name.textContent;
        }
        alert(`${winnerName} wins the game!`);


        if (player1GamesWon === gamesNeeded || player2GamesWon === gamesNeeded) {
        alert(`${winnerName} wins the match!`);
        addPoints1.disabled = true;
        addPoints2.disabled = true;
        minusPoints1.disabled = true;
        minusPoints2.disabled = true;
        gameActive = false;
        } else {
        player1Score.textContent = 0;
        player2Score.textContent = 0;
        }
    
    document.getElementById('player1-gamescore').textContent = `Games won: ${player1GamesWon}`;
    document.getElementById('player2-gamescore').textContent = `Games won: ${player2GamesWon}`;
    } 
}

addPoints1.addEventListener("click", function() {
    scoreIncrement(player1Score, 1);
});

addPoints2.addEventListener("click", function() {
    scoreIncrement(player2Score, 2);
});

function scoreDecrement(playerScore) {
    if (!gameActive) return;
    let currentScore = Number(playerScore.textContent);
    if (currentScore > 0) {
        currentScore -= 1;
        playerScore.textContent = currentScore;
    }
}

minusPoints1.addEventListener("click", function() {
    scoreDecrement(player1Score);
});

minusPoints2.addEventListener("click", function() {
    scoreDecrement(player2Score);
});

resetGameBtn.addEventListener("click", function() {
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    addPoints1.disabled = false;
    addPoints2.disabled = false;
    gameActive = true;
    
});

newSessionBtn.addEventListener("click", function() {
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    addPoints1.disabled = false;
    addPoints2.disabled = false;
    player1Name.textContent = "";
    player2Name.textContent = "";
    player1Input.value = "";
    player2Input.value = "";
    document.getElementById('scoreboard').style.display = 'none';
    document.getElementById('player-reg').style.display = 'block';
    gameActive = true;
})