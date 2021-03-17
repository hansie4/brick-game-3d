class Gamecube {
    constructor() {
        this.gameboard = this.initGameboard();
        this.gameOver = false;
        this.addRandomCubie();
        this.addRandomCubie();
        this.addRandomCubie();
        this.calculateScore();
    }

    initGameboard() {
        let gb = new Array(N);
        for (let x = 0; x < N; x++) {
            gb[x] = new Array(N);
            for (let y = 0; y < N; y++) {
                gb[x][y] = new Array(N);
                for (let z = 0; z < N; z++) {
                    gb[x][y][z] = 0;
                }
            }
        }
        return gb;
    }

    isGameboardFull() {
        for (let x = 0; x < N; x++) {
            for (let y = 0; y < N; y++) {
                for (let z = 0; z < N; z++) {
                    if (this.gameboard[x][y][z] === 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    canMakeMove() {
        for (let x = 0; x < N; x++) {
            for (let y = 0; y < N; y++) {
                for (let z = 0; z < N; z++) {
                    let currentCubieValue = this.gameboard[x][y][z];
                    if (currentCubieValue !== 0) {
                        // checking adjacent on x-axis
                        if (x === 0) {
                            if (this.gameboard[x + 1][y][z] === 0 || this.gameboard[x + 1][y][z] === currentCubieValue) {
                                return true;
                            }
                        } else if (x === (N - 1)) {
                            if (this.gameboard[x - 1][y][z] === 0 || this.gameboard[x - 1][y][z] === currentCubieValue) {
                                return true;
                            }
                        } else {
                            if (this.gameboard[x + 1][y][z] === 0 ||
                                this.gameboard[x + 1][y][z] === currentCubieValue ||
                                this.gameboard[x - 1][y][z] === 0 ||
                                this.gameboard[x - 1][y][z] === currentCubieValue) {
                                return true;
                            }
                        }

                        // checking adjacent on y-axis
                        if (y === 0) {
                            if (this.gameboard[x][y + 1][z] === 0 || this.gameboard[x][y + 1][z] === currentCubieValue) {
                                return true;
                            }
                        } else if (y === (N - 1)) {
                            if (this.gameboard[x][y - 1][z] === 0 || this.gameboard[x][y - 1][z] === currentCubieValue) {
                                return true;
                            }
                        } else {
                            if (this.gameboard[x][y + 1][z] === 0 ||
                                this.gameboard[x][y + 1][z] === currentCubieValue ||
                                this.gameboard[x][y - 1][z] === 0 ||
                                this.gameboard[x][y - 1][z] === currentCubieValue) {
                                return true;
                            }
                        }

                        // checking adjacent on z-axis
                        if (z === 0) {
                            if (this.gameboard[x][y][z + 1] === 0 || this.gameboard[x][y][z + 1] === currentCubieValue) {
                                return true;
                            }
                        } else if (z === (N - 1)) {
                            if (this.gameboard[x][y][z - 1] === 0 || this.gameboard[x][y][z - 1] === currentCubieValue) {
                                return true;
                            }
                        } else {
                            if (this.gameboard[x][y][z + 1] === 0 ||
                                this.gameboard[x][y][z + 1] === currentCubieValue ||
                                this.gameboard[x][y][z - 1] === 0 ||
                                this.gameboard[x][y][z - 1] === currentCubieValue) {
                                return true;
                            }
                        }
                    } else {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    calculateScore() {
        let score = 0;
        for (let x = 0; x < N; x++) {
            for (let y = 0; y < N; y++) {
                for (let z = 0; z < N; z++) {
                    if (this.gameboard[x][y][z] !== 0) {
                        score += this.gameboard[x][y][z];
                    }
                }
            }
        }
        this.score = score;
    }

    getGreatestCubieValue() {
        let greatestValue = -1;
        for (let x = 0; x < N; x++) {
            for (let y = 0; y < N; y++) {
                for (let z = 0; z < N; z++) {
                    if (this.gameboard[x][y][z] > greatestValue) {
                        greatestValue = this.gameboard[x][y][z];
                    }
                }
            }
        }
        return greatestValue;
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

            if (this.gameboard[randX][randY][randZ] === 0) {
                this.gameboard[randX][randY][randZ] = randValue;
                return true;
            }
        }
        return false;
    }

    removeCubie(x, y, z) {
        if (this.gameboard[x][y][z] !== 0) {
            this.gameboard[x][y][z] = 0;
            return true;
        } else {
            return false;
        }
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
        for (let x = 0; x < N; x++) {
            for (let y = 0; y < N; y++) {
                for (let z = 0; z < N; z++) {
                    if (this.gameboard[x][y][z] > 0) {
                        this.renderCubie(x, y, z, this.gameboard[x][y][z]);
                    }
                }
            }
        }
    }

    renderCubie(x, y, z, value) {
        push();

        // accounting for the offset due to blocksize and translating to first corner of cube
        const offset = -(N / 2 * BLOCK_SIZE) + BLOCK_SIZE / 2;
        translate(offset, offset, offset);

        let xPos = (x * BLOCK_SIZE);
        let yPos = (y * BLOCK_SIZE);
        let zPos = (z * BLOCK_SIZE);

        // translating to the calculated values
        translate(xPos, yPos, zPos);

        // drawing the cubie
        strokeWeight(1);
        stroke(0);

        fill(this.getColor(value));
        box(BLOCK_SIZE);

        pop();
    }

    getColor(value) {
        switch (value) {
            case 1:
                return color(255, 71, 71);
            case 2:
                return color(255, 99, 71);
            case 4:
                return color(255, 117, 71);
            case 8:
                return color(255, 163, 71);
            case 16:
                return color(255, 209, 71);
            case 32:
                return color(255, 255, 71);
            case 64:
                return color(209, 255, 71);
            case 128:
                return color(163, 255, 71);
            case 256:
                return color(117, 255, 71);
            case 1024:
                return color(71, 255, 71);
            case 1024:
                return color(71, 255, 117);
            case 2048:
                return color(71, 255, 163);
            default:
                return color(71, 255, 209);
        }
    }

    shiftCubiesUp() {
        for (let y = 1; y < N; y++) {
            for (let x = 0; x < N; x++) {
                for (let z = 0; z < N; z++) {
                    let currentCubieValue = this.gameboard[x][y][z];
                    if (currentCubieValue > 0) {

                        // finding the highest value the current cubie can slide into for function's direction
                        let newY = y;
                        while (newY > 0 && (this.gameboard[x][newY - 1][z] === 0 || this.gameboard[x][newY - 1][z] === currentCubieValue)) {
                            newY--;
                        }

                        if (newY !== y) {
                            if (this.gameboard[x][newY][z] === 0) {
                                // MOVE TO NEW Y
                                this.gameboard[x][newY][z] = currentCubieValue;
                                this.gameboard[x][y][z] = 0;
                            } else if (this.gameboard[x][newY][z] === currentCubieValue) {
                                // MERGE AT NEW Y
                                this.gameboard[x][newY][z] = this.gameboard[x][newY][z] + currentCubieValue;
                                this.gameboard[x][y][z] = 0;
                            }
                        }
                    }
                }
            }
        }
    }

    shiftCubiesDown() {
        for (let y = (N - 2); y >= 0; y--) {
            for (let x = 0; x < N; x++) {
                for (let z = 0; z < N; z++) {
                    let currentCubieValue = this.gameboard[x][y][z];
                    if (currentCubieValue > 0) {

                        // finding the highest value the current cubie can slide into for function's direction
                        let newY = y;
                        while ((newY < (N - 1)) && (this.gameboard[x][newY + 1][z] === 0 || this.gameboard[x][newY + 1][z] === currentCubieValue)) {
                            newY++;
                        }

                        if (newY !== y) {
                            if (this.gameboard[x][newY][z] === 0) {
                                // MOVE TO NEW Y
                                this.gameboard[x][newY][z] = currentCubieValue;
                                this.gameboard[x][y][z] = 0;
                            } else if (this.gameboard[x][newY][z] === currentCubieValue) {
                                // MERGE AT NEW Y
                                this.gameboard[x][newY][z] = this.gameboard[x][newY][z] + currentCubieValue;
                                this.gameboard[x][y][z] = 0;
                            }
                        }
                    }
                }
            }
        }
    }

    shiftCubiesNorth() {
        for (let z = 1; z < N; z++) {
            for (let x = 0; x < N; x++) {
                for (let y = 0; y < N; y++) {
                    let currentCubieValue = this.gameboard[x][y][z];
                    if (currentCubieValue > 0) {

                        // finding the highest value the current cubie can slide into for function's direction
                        let newZ = z;
                        while (newZ > 0 && (this.gameboard[x][y][newZ - 1] === 0 || this.gameboard[x][y][newZ - 1] === currentCubieValue)) {
                            newZ--;
                        }

                        if (newZ !== z) {
                            if (this.gameboard[x][y][newZ] === 0) {
                                // MOVE TO NEW Y
                                this.gameboard[x][y][newZ] = currentCubieValue;
                                this.gameboard[x][y][z] = 0;
                            } else if (this.gameboard[x][y][newZ] === currentCubieValue) {
                                // MERGE AT NEW Y
                                this.gameboard[x][y][newZ] = this.gameboard[x][y][newZ] + currentCubieValue;
                                this.gameboard[x][y][z] = 0;
                            }
                        }
                    }
                }
            }
        }
    }

    shiftCubiesSouth() {
        for (let z = (N - 2); z >= 0; z--) {
            for (let x = 0; x < N; x++) {
                for (let y = 0; y < N; y++) {
                    let currentCubieValue = this.gameboard[x][y][z];
                    if (currentCubieValue > 0) {

                        // finding the highest value the current cubie can slide into for function's direction
                        let newZ = z;
                        while ((newZ < (N - 1)) && (this.gameboard[x][y][newZ + 1] === 0 || this.gameboard[x][y][newZ + 1] === currentCubieValue)) {
                            newZ++;
                        }

                        if (newZ !== z) {
                            if (this.gameboard[x][y][newZ] === 0) {
                                // MOVE TO NEW Y
                                this.gameboard[x][y][newZ] = currentCubieValue;
                                this.gameboard[x][y][z] = 0;
                            } else if (this.gameboard[x][y][newZ] === currentCubieValue) {
                                // MERGE AT NEW Y
                                this.gameboard[x][y][newZ] = this.gameboard[x][y][newZ] + currentCubieValue;
                                this.gameboard[x][y][z] = 0;
                            }
                        }
                    }
                }
            }
        }
    }

    shiftCubiesEast() {
        for (let x = 1; x < N; x++) {
            for (let y = 0; y < N; y++) {
                for (let z = 0; z < N; z++) {
                    let currentCubieValue = this.gameboard[x][y][z];
                    if (currentCubieValue > 0) {

                        // finding the highest value the current cubie can slide into for function's direction
                        let newX = x;
                        while (newX > 0 && (this.gameboard[newX - 1][y][z] === 0 || this.gameboard[newX - 1][y][z] === currentCubieValue)) {
                            newX--;
                        }

                        if (newX !== x) {
                            if (this.gameboard[newX][y][z] === 0) {
                                // MOVE TO NEW Y
                                this.gameboard[newX][y][z] = currentCubieValue;
                                this.gameboard[x][y][z] = 0;
                            } else if (this.gameboard[newX][y][z] === currentCubieValue) {
                                // MERGE AT NEW Y
                                this.gameboard[newX][y][z] = this.gameboard[newX][y][z] + currentCubieValue;
                                this.gameboard[x][y][z] = 0;
                            }
                        }
                    }
                }
            }
        }
    }

    shiftCubiesWest() {
        for (let x = (N - 2); x >= 0; x--) {
            for (let y = 0; y < N; y++) {
                for (let z = 0; z < N; z++) {
                    let currentCubieValue = this.gameboard[x][y][z];
                    if (currentCubieValue > 0) {

                        // finding the highest value the current cubie can slide into for function's direction
                        let newX = x;
                        while ((newX < (N - 1)) && (this.gameboard[newX + 1][y][z] === 0 || this.gameboard[newX + 1][y][z] === currentCubieValue)) {
                            newX++;
                        }

                        if (newX !== x) {
                            if (this.gameboard[newX][y][z] === 0) {
                                // MOVE TO NEW Y
                                this.gameboard[newX][y][z] = currentCubieValue;
                                this.gameboard[x][y][z] = 0;
                            } else if (this.gameboard[newX][y][z] === currentCubieValue) {
                                // MERGE AT NEW Y
                                this.gameboard[newX][y][z] = this.gameboard[newX][y][z] + currentCubieValue;
                                this.gameboard[x][y][z] = 0;
                            }
                        }
                    }
                }
            }
        }
    }
}