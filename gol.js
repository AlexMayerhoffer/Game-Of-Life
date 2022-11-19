let game_board = document.getElementById("game_board");

function drawCells(board, rows, cols) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.style.width = `${100 / cols}%`;
      if (board[i][j] == 1) {
        cell.style.backgroundColor = "darkgreen";
      }
      game_board.appendChild(cell);
    }
  }
}

function removeCells() {
  while (game_board.firstChild) {
    game_board.removeChild(game_board.lastChild);
  }
}

document.getElementById("start").addEventListener("click", (e) => {
  startGame(seed);
});

let cols = 100;
let rows = Math.floor(cols * (15 / 40));

// Game logic --------------------------------------------
async function startGame(seed) {
  console.log("Start game");
  let curr_board = getNextBoard(seed, rows, cols);
  console.log("Got here");
  while (true) {
    console.log("Waiting...");
    await delay(20);
    console.log("Passed .5 seconds...");
    removeCells();
    drawCells(curr_board, rows, cols);
    curr_board = getNextBoard(curr_board, rows, cols);
  }
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function getNextBoard(board, rows, cols) {
  let next_board = createMatrix(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let neighb_count = calcNeighbors(board, i, j);
      if (neighb_count > 3) next_board[i][j] = 0;
      if (neighb_count < 2) next_board[i][j] = 0;
      if (neighb_count == 3) next_board[i][j] = 1;
      if (neighb_count == 2) next_board[i][j] = board[i][j];
    }
  }
  return next_board;
}

function calcNeighbors(board, x, y) {
  let sum = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (!(i < 0 || i == rows || j < 0 || j == cols)) {
        sum += board[i][j];
      }
    }
  }
  console.log(`Sum for [${x}][${y}] is ${sum}`);
  return sum - board[x][y];
}

function createMatrix(rows, cols) {
  let board = new Array(rows);
  for (let i = 0; i < rows; i++) board[i] = new Array(cols);
  return board;
}

function createSeed(board, rows, cols) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      board[i][j] = Math.floor(Math.random() * 2);
    }
  }
  return board;
}

mat = createMatrix(rows, cols);
seed = createSeed(mat, rows, cols);
drawCells(seed, rows, cols);
