let snake;
let rez = 10;
let food;
let w;
let h;

function setup() {
  createCanvas(400, 400);
  w = floor(width/rez)
  h = floor(height/rez);
  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      snake.setDir(0,-1);
      break;
    case DOWN_ARROW:
    snake.setDir(0,1);
      break;
    case LEFT_ARROW:
      snake.setDir(-1,0);
      break;
    case RIGHT_ARROW:
    snake.setDir(1,0);
      break;
  }
}

function draw() {
  scale(rez);
  background(220);
  snake.update();
  snake.show();
  snake.eat(food);

  noStroke();
  fill(255,0,0);
  rect(food.x, food.y, 1, 1);
}
