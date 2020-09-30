let player = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

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

const addEventListeners = () => {
  for (let index = 1; index <= 9; index++) {
    let cell = document.getElementById(`cell-${index}`);

    cell.addEventListener("click", () => handleClick(cell, index));
  }
};

const changeCurrentPlayer = () => {
  player === "X" ? (player = "O") : (player = "X");
};

const showCurrentPlayer = () => {
  const currentPlayer = document.getElementById("current__player");
  currentPlayer.innerHTML = `Current player is ${player}`;
};

const handleClick = (cell, index) => {
  if (cell.innerHTML === "") {
    cell.innerHTML = player;

    gameState[index - 1] = player;

    for (let i = 0; i < winConditions.length; i++) {
      const winCondition = winConditions[i];

      const a = gameState[winCondition[0]];
      const b = gameState[winCondition[1]];
      const c = gameState[winCondition[2]];

      if (a && b && c) {
        if (a === b && b === c) {
          document.getElementById(
            "overlay__text"
          ).innerHTML = `${player} wins the game!`;

          document.getElementById("game__overlay").style.display = "block";
        }
      }
    }

    checkForEmptyCells();
    changeCurrentPlayer();
    showCurrentPlayer();
  }
};

const restartGame = () => {
  player = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  showCurrentPlayer();
  document
    .querySelectorAll(".game__cell")
    .forEach((cell) => (cell.innerHTML = ""));

  document.getElementById("game__overlay").style.display = "none";
};

const checkForEmptyCells = () => {
  let emptyCell;
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === "") {
      emptyCell = true;
    }
  }

  if (!emptyCell) {
    document.getElementById("game__overlay").style.display = "block";
    document.getElementById("overlay__text").innerHTML = "Draw!";
  }
};

document
  .getElementById("restart__button")
  .addEventListener("click", restartGame);
document
  .getElementById("overlay__button")
  .addEventListener("click", restartGame);

addEventListeners();
showCurrentPlayer();
