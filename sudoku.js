var screen = 450;
var cuadro = screen / 9;
var board = [];

function setup() {
  createCanvas(screen, screen);
}

function draw() {
  background(220);

  for (let i = 0; i < 81; i++) {
    stroke(51);
    strokeWeight(0.1);

    push();
    translate(((i % 9) * cuadro), (floor((i / 9)) * cuadro));
    rect(0, 0, cuadro, cuadro);
    pop();

    //Create inputs
    board[i] = createInput();
    board[i].size(cuadro / 0.8, cuadro / 0.8);
    //board[i].position(20, 65);
  }

  for (let i = 1; i < 3; i++) {
    stroke(51);
    strokeWeight(3);
    line(i*cuadro*3, 0, i*cuadro*3, screen);
    line(0, i*cuadro*3, screen, i*cuadro*3);
  }




}
