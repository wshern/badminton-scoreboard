// toggle layer visibility
const scoreBoard = document.getElementById('scoreboard');
const playerReg = document.getElementById("player-reg");

// player name elements
const player1Name = document.getElementById('player1-name');
const player2Name = document.getElementById('player2-name');
const player1Input = document.getElementById('player1-name-input');
const player2Input = document.getElementById('player2-name-input');
let gameActive = true;

// win condition elements
const winRadio = document.getElementsByName('win-condition');
const customWinInput = document.getElementById('custom-win-input');
let winPoints;
let bestOf;
let gamesNeeded;
let player1GamesWon = 0;
let player2GamesWon = 0;

function setButtonsActive(active) {
    addPoints1.disabled = !active;
    addPoints2.disabled = !active;
    minusPoints1.disabled = !active;
    minusPoints2.disabled = !active;
}

Array.from(winRadio).forEach(function (radio) {
    radio.addEventListener("change", function () {
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
        if (!winPoints || winPoints < 1) {
            alert("Please enter min. 1 points!");
            return;
        }
    } else {
        winPoints = Number(selectedWinRadio.value);
    }

    const selectedBoRadio = document.querySelector('input[name="bo-condition"]:checked');
    bestOf = Number(selectedBoRadio.value);
    gamesNeeded = Math.ceil(bestOf / 2);

    player1Name.textContent = player1Input.value;
    player2Name.textContent = player2Input.value;
    document.getElementById('player1-gamescore').textContent = 'Games won: 0';
    document.getElementById('player2-gamescore').textContent = 'Games won: 0';

    // hide registration
    playerReg.classList.remove('active');
    // show scoreboard
    scoreBoard.classList.add('active');

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

// Increment score function
function scoreIncrement(playerScore, playerNum) {
    let isGameWon = false;

    if (!gameActive) return;
    let currentScore = Number(playerScore.textContent);
    currentScore += 1;
    playerScore.textContent = currentScore;

    let otherScore = playerNum === 1 ? Number(player2Score.textContent) : Number(player1Score.textContent);
    let scoreDiff = Math.abs(currentScore - otherScore);
    const deuceScore = winPoints - 1;

    // making flat branches like this helps with CSS customisation

    // custom points dont have deuce
    // custom branch:
    if ((winPoints !== 11 && winPoints !== 21) && currentScore >= winPoints) {
        isGameWon = true;
    }

    if ((winPoints === 11 || winPoints === 21) && currentScore >= winPoints) {
        let maxCap = winPoints === 11 ? 15 : 30;

        if (currentScore >= deuceScore && otherScore >= deuceScore) {
            if (scoreDiff >= 2 || currentScore >= maxCap) {
                isGameWon = true;
            } else {
                return;
            }
        } else {
            isGameWon = true;
        }
    }

    /* for learning purposes, i will split standard and deuce into 2 branches as well

    // standard branch
    if ((winPoints === 11 || winPoints === 21) && currentScore >= winPoints) {
        if (currentScore < deuceScore || otherScore < deuceScore) {
            isGameWon = true;
        }
    }

    // deuce branch
    if ((winPoints === 11 || winPoints === 21) && currentScore >= winPoints) {
        // Only check if BOTH are in deuce territory
        if (currentScore >= deuceScore && otherScore >= deuceScore) {
            // ← This makes the outer if selective!

            if (scoreDiff >= 2 || currentScore >= maxCap) {
                isGameWon = true;
            } else {
                return; // ← Now only runs during actual deuce!
            }
        }
        // If not in deuce territory, this entire branch is skipped
    }
    */

    if (isGameWon === true) {
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
            setButtonsActive(false);
            resetGameBtn.disabled = true;
            gameActive = false;
        } else {
            player1Score.textContent = 0;
            player2Score.textContent = 0;
            gameActive = true;
        }

        document.getElementById('player1-gamescore').textContent = `Games won: ${player1GamesWon}`;
        document.getElementById('player2-gamescore').textContent = `Games won: ${player2GamesWon}`;
    }
}



addPoints1.addEventListener("click", function () {
    scoreIncrement(player1Score, 1);
});

addPoints2.addEventListener("click", function () {
    scoreIncrement(player2Score, 2);
});

// Decrement score function
function scoreDecrement(playerScore) {
    if (!gameActive) return;
    let currentScore = Number(playerScore.textContent);
    if (currentScore > 0) {
        currentScore -= 1;
        playerScore.textContent = currentScore;
    }
}

minusPoints1.addEventListener("click", function () {
    scoreDecrement(player1Score);
});

minusPoints2.addEventListener("click", function () {
    scoreDecrement(player2Score);
});

resetGameBtn.addEventListener("click", function () {
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    setButtonsActive(true);
    gameActive = true;

});

newSessionBtn.addEventListener("click", function () {
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    player1GamesWon = 0;
    player2GamesWon = 0;
    document.getElementById('player1-gamescore').textContent = "Games won:";
    document.getElementById('player2-gamescore').textContent = "Games won:";
    player1Name.textContent = "";
    player2Name.textContent = "";
    player1Input.value = "";
    player2Input.value = "";
    customWinInput.value = "";
    setButtonsActive(true);
    resetGameBtn.disabled = false;
    gameActive = true;

    // hide scoreboard, show registration
    scoreBoard.classList.remove('active');
    playerReg.classList.add('active');

});