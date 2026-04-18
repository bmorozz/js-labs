const boardElement = document.getElementById("board");
const movesElement = document.getElementById("moves");
const messageElement = document.getElementById("message");
const levelElement = document.getElementById("level");
const newGameBtn = document.getElementById("newGameBtn");

const levels = [
    [
        [0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1]
    ],
    [
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 1, 1],
        [1, 0, 1, 0, 0]
    ],
    [
        [1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1],
        [1, 0, 0, 1, 1],
        [0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0]
    ]
];

const minSteps = [7, 8, 9];

let board = [];
let moves = 0;

function copyBoard(source) {
    return source.map(row => [...row]);
}

function createBoard() {
    boardElement.innerHTML = "";

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (board[row][col] === 1) {
                cell.classList.add("on");
            }

            cell.addEventListener("click", () => handleCellClick(row, col));
            boardElement.appendChild(cell);
        }
    }
}

function updateBoard() {
    const cells = document.querySelectorAll(".cell");

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const index = row * 5 + col;

            if (board[row][col] === 1) {
                cells[index].classList.add("on");
            } else {
                cells[index].classList.remove("on");
            }
        }
    }
}

function toggleCell(row, col) {
    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
        board[row][col] = board[row][col] === 1 ? 0 : 1;
    }
}

function handleCellClick(row, col) {
    toggleCell(row, col);
    toggleCell(row - 1, col);
    toggleCell(row + 1, col);
    toggleCell(row, col - 1);
    toggleCell(row, col + 1);

    moves++;
    movesElement.textContent = moves;

    updateBoard();
    checkWin();
}

function checkWin() {
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (board[row][col] === 1) {
                return;
            }
        }
    }

    const currentLevel = Number(levelElement.value);
    messageElement.textContent =
        `Перемога! Ви виконали за ${moves} ходів. Мінімум для цього варіанту: ${minSteps[currentLevel]}`;
}

function startGame() {
    const selectedLevel = Number(levelElement.value);
    board = copyBoard(levels[selectedLevel]);
    moves = 0;

    movesElement.textContent = moves;
    messageElement.textContent = "Вимкніть усі лампочки";

    createBoard();
}

levelElement.addEventListener("change", startGame);
newGameBtn.addEventListener("click", startGame);

startGame();
