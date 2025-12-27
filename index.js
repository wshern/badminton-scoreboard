// player name elements
const player1Name = document.getElementById('player1-name');
const player2Name = document.getElementById('player2-name');
const player1Input = document.getElementById('player1-name-input');
const player2Input = document.getElementById('player2-name-input');

// win condition elements
const winRadio = document.getElementsByName('win-condition');
const win11 = document.getElementById('win-11');
const win21 = document.getElementById('win-21');
const win30 = document.getElementById('win-30');
const customWin = document.getElementById('custom-win');
const customWinInput = document.getElementById('custom-win-input');
let winPoints;


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
const resetGameBtn = document.getElementById('reset-game-btn');
const newGameBtn = document.getElementById('new-game-btn');
let player1Score = document.getElementById('player1-score');
let player2Score = document.getElementById('player2-score');

function scoreIncrement(playerScore) {
    let currentScore = Number(playerScore.textContent);
    currentScore += 1;
    playerScore.textContent = currentScore;
    
    if (currentScore >= winPoints) {
        
    }
}

addPoints1.addEventListener("click", function() {
    scoreIncrement(player1Score);
});

addPoints2.addEventListener("click", function() {
    scoreIncrement(player2Score);
});

resetGameBtn.addEventListener("click", function() {
    player1Score.textContent = 0;
    player2Score.textContent = 0;
});

newGameBtn.addEventListener("click", function() {
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    player1Name.textContent = "";
    player2Name.textContent = "";
    player1Input.value = "";
    player2Input.value = "";
    document.getElementById('scoreboard').style.display = 'none';
    document.getElementById('player-reg').style.display = 'block';
})