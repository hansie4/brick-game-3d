const VIEWPORT_WIDTH = 600;
const VIEWPORT_HEIGHT = 600;

const BLOCK_SIZE = 70;
const N = 4;

let scoreElement;
let greatestValueElement;
let gamecube;

function setup() {
  createCanvas(VIEWPORT_WIDTH, VIEWPORT_HEIGHT, WEBGL);
  background(0);

  frameRate(30);

  camera();

  gamecube = new Gamecube();

  scoreElement = select("#gameScore");
  greatestValueElement = select("#gameGreatestCubieValue");
  gameoverElement = select("#gameover")

  scoreElement.html('Score: ' + gamecube.score);
  greatestValueElement.html('Greatest cubie: ' + gamecube.getGreatestCubieValue());
  gameoverElement.html('GAME IN PROGRESS')
}

function draw() {
  background(150);

  orbitControl();

  gamecube.render();
}

function keyPressed() {
  if (!gamecube.gameOver) {
    if (keyCode == 87) {
      gamecube.shiftCubiesNorth();
      gamecube.addRandomCubie();
    } else if (keyCode === 83) {
      gamecube.shiftCubiesSouth();
      gamecube.addRandomCubie();
    } else if (keyCode === 65) {
      gamecube.shiftCubiesEast();
      gamecube.addRandomCubie();
    } else if (keyCode === 68) {
      gamecube.shiftCubiesWest();
      gamecube.addRandomCubie();
    } else if (keyCode === 81) {
      gamecube.shiftCubiesUp();
      gamecube.addRandomCubie();
    } else if (keyCode === 69) {
      gamecube.shiftCubiesDown();
      gamecube.addRandomCubie();
    } else if (keyCode === 13) {
      gamecube.addRandomCubie();
    } else if (keyCode === 16) {
      console.log(gamecube.gameboard);
    }
  }

  gamecube.gameOver = !gamecube.canMakeMove();

  if (gamecube.gameOver) {
    gameoverElement.html('GAME OVER')
  }

  gamecube.calculateScore();
  scoreElement.html('Score: ' + gamecube.score);
  greatestValueElement.html('Greatest cubie: ' + gamecube.getGreatestCubieValue());
}