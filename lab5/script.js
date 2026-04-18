let score = 0;
let time = 0;
let gameInterval;
let moveInterval;

const target = document.getElementById("target");
const gameArea = document.getElementById("gameArea");

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

const difficulty = document.getElementById("difficulty");
const color = document.getElementById("color");

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("resetBtn").addEventListener("click", resetGame);
target.addEventListener("click", hitTarget);

function startGame() {
    score = 0;
    time = 5;

    scoreEl.textContent = score;
    timeEl.textContent = time;

    target.style.display = "block";
    target.style.backgroundColor = color.value;

    moveTarget();

    moveInterval = setInterval(moveTarget, difficulty.value);
    gameInterval = setInterval(timer, 1000);
}

function moveTarget() {
    let x = Math.random() * (gameArea.clientWidth - 50);
    let y = Math.random() * (gameArea.clientHeight - 50);

    target.style.left = x + "px";
    target.style.top = y + "px";
}

function hitTarget() {
    score++;
    time = 5;

    scoreEl.textContent = score;
    timeEl.textContent = time;

    moveTarget();
}

function timer() {
    time--;
    timeEl.textContent = time;

    if (time <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(moveInterval);
    target.style.display = "none";

    alert("Game Over! Score: " + score);
}

function resetGame() {
    clearInterval(gameInterval);
    clearInterval(moveInterval);

    score = 0;
    time = 0;

    scoreEl.textContent = score;
    timeEl.textContent = time;

    target.style.display = "none";
}
