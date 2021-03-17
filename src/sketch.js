const VIEWPORT_WIDTH = 600;
const VIEWPORT_HEIGHT = 600;

const BLOCK_SIZE = 50;
const N = 4;

let scoreElement;
let gamecube;

function setup() {
  createCanvas(VIEWPORT_WIDTH, VIEWPORT_HEIGHT, WEBGL);
  background(0);

  frameRate(30);

  camera();

  gamecube = new Gamecube();

  scoreElement = select("#gameScore");

  scoreElement.html('Score: ' + gamecube.score);
}

function draw() {
  background(150);

  orbitControl();

  gamecube.render();
}

function keyPressed() {
  if (keyCode == 87) {
    gamecube.shiftCubiesNorth();
  } else if (keyCode === 83) {
    gamecube.shiftCubiesSouth();
  } else if (keyCode === 65) {
    gamecube.shiftCubiesEast();
  } else if (keyCode === 68) {
    gamecube.shiftCubiesWest();
  } else if (keyCode === 81) {
    gamecube.shiftCubiesUp();
  } else if (keyCode === 69) {
    gamecube.shiftCubiesDown();
  } else if (keyCode === 13) {
    gamecube.addRandomCubie();
  } else if (keyCode === 16) {
    console.log(gamecube.gameboard);
  }

  gamecube.addRandomCubie();
  gamecube.calculateScore();
  scoreElement.html('Score: ' + gamecube.score);
}