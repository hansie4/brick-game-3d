const VIEWPORT_WIDTH = 700;
const VIEWPORT_HEIGHT = 700;

const BLOCK_SIZE = 60;
const N = 4;

let gamecube;

let x = 0;
let y = 0;
let z = 0;

function setup() {
  createCanvas(VIEWPORT_WIDTH, VIEWPORT_HEIGHT, WEBGL);
  background(0);

  frameRate(30);

  gamecube = new Gamecube(N, BLOCK_SIZE);

  //gamecube.gameboard[floor(random(N))][floor(random(N))][floor(random(N))] = 2;

  gamecube.gameboard[2][3][0] = 2;
  gamecube.gameboard[1][3][0] = 2;
  gamecube.gameboard[3][3][1] = 2;
  gamecube.gameboard[1][3][1] = 2;

  gamecube.gameboard[1][1][1] = 2;

  console.log(gamecube.gameboard);

  camera();
}

function draw() {
  background(150);

  orbitControl();

  //gamecube.gameboard[x][y][z] = 2;

  gamecube.render();

  // if (frameCount % 15 == 0) {
  //   x++;
  //   if (x >= N) {
  //     x = 0;
  //     y++;
  //   }
  //   if (y >= N) {
  //     y = 0;
  //     z++;
  //   }
  //   if (z >= N) {
  //     x = 0;
  //     y = 0;
  //     z = 0;
  //     for (let i = 0; i < N; i++) {
  //       for (let j = 0; j < N; j++) {
  //         for (let k = 0; k < N; k++) {
  //           gamecube.gameboard[i][j][k] = 0;
  //         }
  //       }
  //     }
  //   }
  // }

}

function keyPressed() {
  if (keyCode == 87) {
    gamecube.shiftCubiesNorth();
  } else if (keyCode === 83) {
    gamecube.shiftCubiesSouth();
  } else if (keyCode === 65) {
    gamecube.shiftCubiesWest();
  } else if (keyCode === 68) {
    gamecube.shiftCubiesEast();
  } else if (keyCode === 81) {
    gamecube.shiftCubiesUp();
  } else if (keyCode === 69) {
    gamecube.shiftCubiesDown();
  }
}