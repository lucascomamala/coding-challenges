function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++)
    arr[i] = new Array(rows);

  return arr;
}

var grid;
var cols;
var rows;
var w = 20;
var totalMines = 15;

function setup() {
  createCanvas(200, 200);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);

  //Create every cell
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++)
      grid[i][j] = new Cell(i, j, w);

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

}

function gameOver(pin, pon) {
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++)
      grid[i][j].revealed = true;

  //fill('red');
  //rect(pin, pon, w, w);
}

function mousePressed() {
  var cellX = floor(mouseX / w);
  var cellY = floor(mouseY / w);
  grid[cellX][cellY].reveal();

  if (grid[cellX][cellY].mine) {

    //grid[cellX][cellY].gameOver();
    gameOver(cellX, cellY);
    fill('red');
  rect(cellX, cellY, w, w);
  }
}

function draw() {
  background(255);

  //Draw each cell
  for (let i = 0; i < cols; i++)
      for (let j = 0; j < rows; j++)
        grid[i][j].show();
}
