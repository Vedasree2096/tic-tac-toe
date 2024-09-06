// Get elements
const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const statusMessage = document.getElementById("statusMessage");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let gameState = Array(9).fill(null);
let isGameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle player click on cells
function handleClick(event) {
  const cell = event.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  // Check if the cell is already occupied or game is over
  if (gameState[cellIndex] !== null || !isGameActive) {
    return;
  }

  // Mark the cell and update game state
  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check for win or draw
  if (checkWin()) {
    statusMessage.textContent = `${currentPlayer} Wins!`;
    isGameActive = false;
  } else if (checkDraw()) {
    statusMessage.textContent = "It's a Draw!";
    isGameActive = false;
  } else {
    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check if the current player has won
function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => gameState[index] === currentPlayer);
  });
}

// Check if the game is a draw
function checkDraw() {
  return gameState.every((cell) => cell !== null);
}

// Restart the game
function restartGame() {
  gameState = Array(9).fill(null);
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  isGameActive = true;
  statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

// Event listeners
cells.forEach((cell) => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);

// Initialize game
statusMessage.textContent = `Player ${currentPlayer}'s turn`;
