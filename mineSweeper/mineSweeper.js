document.addEventListener('contextmenu', event => event.preventDefault());

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++)
    arr[i] = new Array(rows);

  return arr;
}

var sz  = 400;
var w = 40;
var totalMines = 15;
var grid, cols, rows;

function setup() {
  background(255);
  createCanvas(sz, sz);
  cols = floor(width / w);
  rows = floor(height / w);
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

  //   //Count the nearby mines for every cell
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++)
      grid[i][j].countMines();
}

function draw() {

  //Draw each cell
  for (let i = 0; i < cols; i++)
      for (let j = 0; j < rows; j++)
        grid[i][j].show();


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
      if (clickedCell.mine) {
        clickedCell.lost = true;
        gameOver();
      }
    }
  }
  else if (mouseButton === RIGHT) {
    if (!clickedCell.revealed) {
      clickedCell.flag();
    }
  }
}

function gameOver() {
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
