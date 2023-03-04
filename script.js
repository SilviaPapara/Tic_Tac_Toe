const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");
const winBg = document.querySelector(".winBg");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

(function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClick));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
})();

function cellClick() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer === "X" ? "x" : "o");
}

function changePlayer() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  statusText.textContent = `${currentPlayer}'s turn`;
}

function showResult(message) {
  winBg.style.display = "block";
  restartBtn.style.opacity = 1;
  statusText.style.transform = "translateY(185px) scale(2.5)";
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
    showResult(`${currentPlayer} wins!`);
  } else if (!options.includes("")) {
    statusText.textContent = "Draw!";
    showResult("Draw!");
  } else {
    changePlayer();
  }
}

function restartGame() {
  statusText.style.transform = "none";
  winBg.style.display = "none";
  restartBtn.style.opacity = 0;
  currentPlayer = "X";
  options.fill("");
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
  running = true;
}
