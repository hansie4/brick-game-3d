class Gamecube {
    constructor() {
        this.gameboard = this.initGameboard();
        this.cubiesMoving = false;
    }

    initGameboard() {
        let gb = new Array(N);
        for (let x = 0; x < N; x++) {
            gb[x] = new Array(N);
            for (let y = 0; y < N; y++) {
                gb[x][y] = new Array(N);
                for (let z = 0; z < N; z++) {
                    gb[x][y][z] = null;
                }
            }
        }
        return gb;
    }

    isGameboardFull() {
        for (let x = 0; x < this.gameboard.length; x++) {
            for (let y = 0; y < this.gameboard[x].length; y++) {
                for (let z = 0; z < this.gameboard[x][y].length; z++) {
                    if (this.gameboard[x][y][z] === null) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    addRandomCubie() {
        let randX;
        let randY;
        let randZ;
        let randValue;
        while (!this.isGameboardFull()) {
            randX = floor(random(N));
            randY = floor(random(N));
            randZ = floor(random(N));
            randValue = floor(random(1, 3));

            if (this.gameboard[randX][randY][randZ] === null) {
                this.gameboard[randX][randY][randZ] = new Cubie(randX, randY, randZ, randValue);
                return true;
            }
        }
        return false;
    }

    render() {
        const cube_width = BLOCK_SIZE * N;

        // render outside box
        strokeWeight(4);
        stroke(255);
        noFill();
        box(cube_width + 2);

        const vertex_locations = cube_width / 2 + 4;

        // drawing visual aid for front of cube
        beginShape();
        strokeWeight(8);
        stroke(255, 0, 0);
        vertex(vertex_locations, vertex_locations, vertex_locations);
        vertex(-vertex_locations, vertex_locations, vertex_locations);
        vertex(-vertex_locations, -vertex_locations, vertex_locations);
        vertex(vertex_locations, -vertex_locations, vertex_locations);
        endShape(CLOSE);

        // render cubies from gameboard matrix
        for (let x = 0; x < this.gameboard.length; x++) {
            for (let y = 0; y < this.gameboard[x].length; y++) {
                for (let z = 0; z < this.gameboard[x][y].length; z++) {
                    if (this.gameboard[x][y][z] !== null) {
                        this.gameboard[x][y][z].render();
                    }
                }
            }
        }
    }

    currentlyAnimating() {
        for (let x = 0; x < this.gameboard.length; x++) {
            for (let y = 0; y < this.gameboard[x].length; y++) {
                for (let z = 0; z < this.gameboard[x][y].length; z++) {
                    if (this.gameboard[x][y][z] !== null) {
                        if (this.gameboard[x][y][z].isMoving) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    moveCubie(x1, y1, z1, x2, y2, z2) {
        if (x1 < 0 || x1 >= N) return false;
        if (x2 < 0 || x2 >= N) return false;
        if (y1 < 0 || y1 >= N) return false;
        if (y2 < 0 || y2 >= N) return false;
        if (z1 < 0 || z1 >= N) return false;
        if (z2 < 0 || z2 >= N) return false;

        if (this.gameboard[x1][y1][z1] !== null) {
            if (this.gameboard[x2][y2][z2] === null) {

                this.gameboard[x2][y2][z2] = this.gameboard[x1][y1][z1].moveTo(x2, y2, z2);
                this.gameboard[x1][y1][z1] = null;

                return true;
            } else if (this.gameboard[x2][y2][z2].value === this.gameboard[x1][y1][z1].value) {
                // MERGE
                return false;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    shiftCubiesUp() {

    }
}