class Cell {


  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;
    this.mine = false;
    this.revealed = false;
    this.flagged = false;
    this.lost = 0;
    //var img = loadImage('images/mine.png');
  }

  //Draw the contents of the cell
  show() {
    //Not Revealed yet
    if (!this.revealed) {
      stroke(0);
      fill(127);
      rect(this.x, this.y, this.w, this.w);
      if (this.flagged) {
        textAlign(CENTER);
        textSize(this.w * 0.6);
        text('\u{1f6a9}', this.x + this.w * 0.5, this.y + this.w *0.75);
      }
    }
    //Reveal the inside only if its been activated
    else {
      //Draw a mine
      if (this.mine) {
        if (this.lost)
          fill('red');
        else
          fill(255);
        rect(this.x, this.y, this.w, this.w);
        //image(img, this.x, this.y);
        fill(127);
        ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
      }
      //Draw a number
      else if (this.neighborCount > 0) {
        fill(250);
        rect(this.x, this.y, this.w, this.w);
        textAlign(CENTER);
        textSize(this.w * 0.7);
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
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w *0.75);
      }
      else {
        fill(250);
        rect(this.x, this.y, this.w, this.w);
      }
    }
  }

  countMines() {
    if (this.mine) {
      this.neighborCount = -1;
      return;
    }

    let total = 0;
    //Iterate for each cell around (9 times)
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let i = this.i + xoff;
        let j = this.j + yoff;
        //Check that the cell exists (is not on an edge)
        if (i > -1 && i < cols && j > -1 && j < rows) {
          let neighbor = grid[i][j];
          if (neighbor.mine)
            total++;
        }
      }
    }
    this.neighborCount = total;
  }

  reveal() {
    this.revealed = true;

    if (this.neighborCount == 0) {
      this.floodFill();
    }
  }

  flag() {
    this.flagged = !this.flagged;
  }

  floodFill() {
    //Iterate for each cell around (9 times)
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let i = this.i + xoff;
        let j = this.j + yoff;
        //Check that the cell exists (is not on an edge)
        if (i > -1 && i < cols && j > -1 && j < rows) {
          let neighbor = grid [i][j];
          if (!neighbor.mine && !neighbor.revealed)
          neighbor.reveal();
        }
      }
    }
  }

  revealAround() {
    let flaggedNeigh = 0;
    //Iterate for each cell around (9 times)
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let i = this.i + xoff;
        let j = this.j + yoff;
        //Check that the cell exists (is not on an edge)
        if (i > -1 && i < cols && j > -1 && j < rows) {
          let neighbor = grid[i][j];
          if (neighbor.flagged)
            flaggedNeigh++;
          if (flaggedNeigh === this.neighborCount && !neighbor.flagged) {
            console.log(neighbor);
            console.log(flaggedNeigh);
            neighbor.reveal();

          }
        }
      }
    }
  }
}

// Cell.prototype.contains = function(x, y) {
//   return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
// }
//
//
// Cell.prototype.gameOver = function () {
//   fill('red');
//   rect(this.x, this.y, this.w, this.w);
//   //fill(127);
//   //ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
// }
