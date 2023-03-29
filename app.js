// How a Naughts and Crosses game works.

// We have 2 players
// let playerOne = "X";
// let playerTwo = "0";
let isGameRunning = false;

// I need to know the current player
let currentPlayer = "X";
// Creating a new Array using the new Array and fill method
let array = new Array(9).fill("");
// console.log(array); // Testing the output of the array.
let winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialise Game!
startGame();

// A function to start the game and select all the grid elements on click
function startGame() {
  document.querySelectorAll(".grid").forEach((element) => {
    // The clicked once option true
    element.addEventListener("click", gridClicked, { once: true });
  });
  // This sets the inital current player
  document.getElementById(
    "player-status"
  ).textContent = `Current player is ${currentPlayer}`;
  // Set to true when the game is started.
  isGameRunning = true;
  // Restart game button
  document.getElementById("restart").addEventListener("click", gameRestart);
}

function gridClicked() {
  let gridId = this.id;
  // console.log(this.id);

  // Will keep running until we set to false
  if (!isGameRunning) {
    console.log(!isGameRunning);
    return;
  }
  // See the value that this holds in the console
  // console.log(this.id);

  // The "this" being the click event from startGame
  this.textContent = currentPlayer;
  console.log(`What value is this: ${this.textContent}`);
  array[gridId] = currentPlayer;
  // console.log(array);
  isWinner();
}

function isWinner() {
  let winner = false;
  for (i = 0; i < winningCombo.length; i++) {
    // Use Array destructuring
    let [a, b, c] = winningCombo[i];
    // console.log(winningCombo[i]);
    if (array[a] === "" || array[b] === "" || array[c] === "") {
      continue;
    }
    if (array[a] === array[b] && array[b] === array[c]) {
      winner = true;
      break;
    }
  }
  // isGameRunning = false;
  if (winner) {
    document.getElementById(
      "player-status"
    ).textContent = `Player ${currentPlayer} wins`;
    // Stop game from running.
    isGameRunning = false;
    // Checks to see if the array doesn't include any empty strings ""
  } else if (!array.includes("")) {
    document.getElementById("player-status").innerHTML = `DRAW!`;
  } else {
    changePlayer();
  }
}

// Resetting the game
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "0" : "X";
  // currentPlayer.textContent = currentPlayer;
  document.getElementById(
    "player-status"
  ).textContent = `Current player is ${currentPlayer}`;
}

function gameRestart() {
  currentPlayer = "X";
  array = new Array(9).fill("");
  document.getElementById(
    "player-status"
  ).textContent = `Current player is ${currentPlayer}`;
  document
    .querySelectorAll(".grid")
    .forEach((element) => (element.textContent = ""));
  document.querySelectorAll(".grid").forEach((element) => {
    // The clicked once option reset to false
    element.addEventListener("click", gridClicked, { once: false });
  });
  isGameRunning = true;
}
