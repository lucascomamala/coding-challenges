function Cell (i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;
  this.mine = false;
  this.revealed = false;
}

Cell.prototype.show = function() {
  stroke(0);
  fill(127);
  rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.mine) {
      fill(255);
      rect(this.x, this.y, this.w, this.w);
      fill(127);
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
    }
    else {
      fill(250);
      rect(this.x, this.y, this.w, this.w);
      if (this.neighborCount > 0) {
        textAlign(CENTER);
        fill(0);

        switch (this.neighborCount) {
          case 1:
            fill('blue');
            break;
          case 2:
            fill('green');
            break;
          case 3:
            fill('red');
            break;
          case 4:
            fill('purple');
            break;
          case 5:
            fill('orange');
            break;
          case 6:
            fill(245, 239, 66);
            break;
          case 7:
            break;
          case 8:
            break;
        }
          text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      }
    }
  }
}

Cell.prototype.countMines = function () {
  if (this.mine) {
    this.neighborCount = -1;
    return;
  }
  var total = 0;
  for (var xoff = -1; xoff <= 1; xoff++) {
    for (var yoff = -1; yoff <= 1; yoff++) {
      var i = this.i + xoff;
      var j = this.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
        var neighbor = grid [i][j];
        if (neighbor.mine)
          total++
      }
    }
  }
  this.neighborCount = total;
}

Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
  this.revealed = true;

  if (this.neighborCount == 0) {
    this.floodFill();
    //Flood Fill
  }
}

Cell.prototype.floodFill = function() {
  for (var xoff = -1; xoff <= 1; xoff++) {
    for (var yoff = -1; yoff <= 1; yoff++) {
      var i = this.i + xoff;
      var j = this.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
        var neighbor = grid [i][j];
        if (!neighbor.mine && !neighbor.revealed)
          neighbor.reveal();
      }
    }
  }
}

Cell.prototype.gameOver = function () {
  fill('red');
  rect(this.x, this.y, this.w, this.w);
  //fill(127);
  //ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
}
