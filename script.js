// ===============================
// DOM Elements
// ===============================

const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const newGameBtn = document.querySelector("#new-btn");

const popup = document.querySelector(".popup");
const msg = document.querySelector("#msg");

const turnIndicator = document.querySelector("#turn-indicator");

const scoreX = document.querySelector("#score-x");
const scoreO = document.querySelector("#score-o");
const scoreDraw = document.querySelector("#score-draw");

// ===============================
// Variables
// ===============================

let turnO = true;
let moveCount = 0;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

let gameOver = false;

// ===============================
// Winning Patterns
// ===============================

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

// ===============================
// Update Turn
// ===============================

const updateTurn = () => {
    turnIndicator.innerText = `Current Turn : ${turnO ? "O" : "X"}`;
};

// ===============================
// Enable Boxes
// ===============================

const enableBoxes = () => {

    boxes.forEach(box => {

        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winner");

    });

};

// ===============================
// Disable Boxes
// ===============================

const disableBoxes = () => {

    boxes.forEach(box => {

        box.disabled = true;

    });

};

// ===============================
// Reset Board
// ===============================

const resetBoard = () => {

    turnO = true;
    moveCount = 0;
    gameOver = false;

    popup.classList.add("hide");

    enableBoxes();

    updateTurn();

};

// ===============================
// Update Score
// ===============================

const updateScore = () => {

    scoreX.innerText = xScore;
    scoreO.innerText = oScore;
    scoreDraw.innerText = drawScore;

};

// ===============================
// Winner Popup
// ===============================

const showWinner = (winner) => {

    gameOver = true;

    msg.innerHTML = `🏆 Player ${winner} Wins!`;

    popup.classList.remove("hide");

    disableBoxes();

    if (winner === "X") {

        xScore++;

    } else {

        oScore++;

    }

    updateScore();

};

// ===============================
// Draw Popup
// ===============================

const showDraw = () => {

    gameOver = true;

    drawScore++;

    updateScore();

    msg.innerHTML = "🤝 It's a Draw!";

    popup.classList.remove("hide");

    disableBoxes();

};

// ===============================
// Winner Check
// ===============================

const checkWinner = () => {

    for (let pattern of winPatterns) {

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {

            if (pos1 === pos2 && pos2 === pos3) {

                boxes[pattern[0]].classList.add("winner");
                boxes[pattern[1]].classList.add("winner");
                boxes[pattern[2]].classList.add("winner");

                showWinner(pos1);

                return true;

            }

        }

    }

    return false;

};

// ===============================
// Click Events
// ===============================

boxes.forEach(box => {

    box.addEventListener("click", () => {

        if (gameOver) return;

        if (turnO) {

            box.innerText = "O";

        } else {

            box.innerText = "X";

        }

        box.disabled = true;

        moveCount++;

        let winnerFound = checkWinner();

        if (!winnerFound && moveCount === 9) {

            showDraw();

            return;

        }

        turnO = !turnO;

        updateTurn();

    });

});

// ===============================
// Button Events
// ===============================

resetBtn.addEventListener("click", resetBoard);

newGameBtn.addEventListener("click", resetBoard);

// ===============================
// Initial Setup
// ===============================

updateTurn();

updateScore();