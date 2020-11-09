//TODO Ensure first click isn't a bomb

window.onload = function() {
  document.addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById("easy").onclick = function() {newGame(9, 9, 10)};
  document.getElementById("medium").onclick = function() {newGame(16, 16, 40)};
  document.getElementById("expert").onclick = function() {newGame(30, 16, 99)};
}

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++)
    arr[i] = new Array(rows);

  return arr;
}

var w = 30;
var totalMines = 15;
var grid, cols, rows;
var canvas;
var gameLost = false;

function newGame(x, y, mines) {

  //Board parameters
  cols = x;
  rows = y;
  totalMines = mines;
  gameLost = false;

  canvas = createCanvas(cols * w, rows * w);
  canvas.parent('sketch-div');

  grid = make2DArray(cols, rows);
  //Create every cell
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  //Choose mine spots
  for (let n = 0; n < totalMines; n++){
    var i = floor(random(cols));
    var j = floor(random(rows));
    if (grid[i][j].mine == true)
      n--;
    grid[i][j].mine = true;
  }

  //Count the nearby mines for every cell
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++)
      grid[i][j].countMines();

  loop();
}


function setup() {
  background(255);
  newGame(9, 9, 10);
}

function draw() {

  //Draw each cell and check for win
  let needed = grid.length * grid[0].length - totalMines;
  let counter = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
      if (grid[i][j].revealed && !grid[i][j].mine && !gameLost) {
        counter++;
      }
    }
  }

  if (needed == counter) {
    gameWon();
  }
}

function gameWon() {
  noStroke();
  fill('red');
  rect(0,width/2-50,width,10);
  rect(0,width/2+50,width,10);
  fill(80);
  rect(0,width/2-40,width,90);
  fill(255);
  textSize(50);
  text("YOU WIN!", width/2, height/2+20);
  noLoop();
}

function mousePressed() {
  if (mouseX >= width || mouseY >= height)
    return;

  let cellX = floor(mouseX / w);
  let cellY = floor(mouseY / w);
  let clickedCell = grid[cellX][cellY];

  if (mouseButton === LEFT) {
    if (!clickedCell.revealed && !clickedCell.flagged) {
      clickedCell.reveal();
      // if (clickedCell.mine) {
      //   clickedCell.lost = true;
      //   gameOver();
      // }
    }
  }
  else if (mouseButton === RIGHT) {
    if (!clickedCell.revealed) {
      clickedCell.flag();
    }
  }
}

function gameOver() {
  gameLost = true;
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++)
      grid[i][j].revealed = true;
}

function doubleClicked() {
  if (mouseX >= width || mouseY >= height)
    return;

  let cellX = floor(mouseX / w);
  let cellY = floor(mouseY / w);
  let clickedCell = grid[cellX][cellY];

  if (clickedCell.revealed) {
    clickedCell.revealAround();
  }
}
