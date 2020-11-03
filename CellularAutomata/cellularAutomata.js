
var sz = 1000;    //Screen size
var w = 2;        //Cell Size
var cells;        //Array of cells
var pause = false;

let generation = 0;

// An array to store the ruleset, for example {0,1,1,0,1,1,0,1}
let ruleset = [0, 1, 0, 1, 1, 0, 1, 0];

function setup() {
  createCanvas(1000, 1000);
  cells = Array(floor(width / w));
  //Only the middle cell should be filled at the start
  for (let i = 0; i < cells.length; i++) {
    cells[i] = 0;
  }
  cells[cells.length/2] = 1;
}


function draw() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === 1) {
      fill(200);
    } else {
      fill(51);
      noStroke();
      rect(i * w, generation * w, w, w);
    }
  }
  if (generation < height/w) {
    generate();
  }
}

function generate() {
  let nextgen = Array(cells.length);

  for (let i = 1; i < cells.length-1; i++) {
    let left   = cells[i-1];
    let me     = cells[i];
    let right  = cells[i+1];
    nextgen[i] = rules(left, me, right);
  }
  // The current generation is the new generation
  cells = nextgen;
  generation++;
}

function rules(a, b, c) {
  if (a == 1 && b == 1 && c == 1) return ruleset[0];
  if (a == 1 && b == 1 && c == 0) return ruleset[1];
  if (a == 1 && b == 0 && c == 1) return ruleset[2];
  if (a == 1 && b == 0 && c == 0) return ruleset[3];
  if (a == 0 && b == 1 && c == 1) return ruleset[4];
  if (a == 0 && b == 1 && c == 0) return ruleset[5];
  if (a == 0 && b == 0 && c == 1) return ruleset[6];
  if (a == 0 && b == 0 && c == 0) return ruleset[7];
  return 0;
}
