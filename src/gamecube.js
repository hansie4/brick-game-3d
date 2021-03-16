class Gamecube {
    constructor(n, block_size) {
        this.n = n;
        this.block_size = block_size;
        this.gameboard = this.initGameboard(n);
    }

    initGameboard(n) {
        let gb = new Array(n);
        for (let x = 0; x < n; x++) {
            gb[x] = new Array(n);
            for (let y = 0; y < n; y++) {
                gb[x][y] = new Array(n);
                for (let z = 0; z < n; z++) {
                    gb[x][y][z] = 0;
                }
            }
        }
        return gb;
    }

    render() {
        const cube_width = this.block_size * this.n;

        // render outside box
        strokeWeight(4);
        stroke(255);
        noFill();
        box(cube_width + 2);

        // render cubies from gameboard matrix
        for (let x = 0; x < this.gameboard.length; x++) {
            for (let y = 0; y < this.gameboard[x].length; y++) {
                for (let z = 0; z < this.gameboard[x][y].length; z++) {
                    if (this.gameboard[x][y][z] != 0) {
                        this.renderCubie(x, y, z, this.gameboard[x][y][z]);
                    }
                }
            }
        }

    }

    renderCubie(x, y, z, value) {
        push();

        const offset = -(this.n / 2 * this.block_size) + this.block_size / 2;
        translate(offset, offset, offset);

        translate(x * this.block_size, y * this.block_size, z * this.block_size);

        strokeWeight(1);
        stroke(0);

        fill(255, 102, 94);
        box(this.block_size);

        pop();
    }

    shiftCubiesUp() {
        for (let y = 0; y < this.gameboard[0].length; y++) {
            for (let x = 0; x < this.gameboard.length; x++) {
                for (let z = 0; z < this.gameboard[x][y].length; z++) {
                    // if the cubie is not already at the top of the cube and there is not a cubie already above it
                    if (y != 0 && this.gameboard[x][y][z] > 0) {
                        if (this.gameboard[x][y - 1][z] == 0) {
                            let temp = this.gameboard[x][y][z];
                            this.gameboard[x][y][z] = 0;
                            this.gameboard[x][y - 1][z] = temp;
                        }
                    }

                    // NEED TO IMPLEMET CUBIE MERGING
                }
            }
        }
    }

    shiftCubiesDown() {
        for (let y = this.n - 1; y >= 0; y--) {
            for (let x = 0; x < this.gameboard.length; x++) {
                for (let z = 0; z < this.gameboard[x][y].length; z++) {
                    // if the cubie is not already at the bottom of the cube and there is not a cubie already below it
                    if (y != this.n - 1 && this.gameboard[x][y][z] > 0) {
                        if (this.gameboard[x][y + 1][z] == 0) {
                            let temp = this.gameboard[x][y][z];
                            this.gameboard[x][y][z] = 0;
                            this.gameboard[x][y + 1][z] = temp;
                        }
                    }

                    // NEED TO IMPLEMET CUBIE MERGING
                }
            }
        }
    }

    shiftCubiesWest() {
        for (let x = 0; x < this.gameboard.length; x++) {
            for (let y = 0; y < this.gameboard[x].length; y++) {
                for (let z = 0; z < this.gameboard[x][y].length; z++) {
                    // if the cubie is not already to the left of the cube and there is not a cubie already to the left of it
                    if (x != 0 && this.gameboard[x][y][z] > 0) {
                        if (this.gameboard[x - 1][y][z] == 0) {
                            let temp = this.gameboard[x][y][z];
                            this.gameboard[x][y][z] = 0;
                            this.gameboard[x - 1][y][z] = temp;
                        }
                    }

                    // NEED TO IMPLEMET CUBIE MERGING
                }
            }
        }
    }

    shiftCubiesEast() {
        for (let x = this.n - 1; x >= 0; x--) {
            for (let y = 0; y < this.gameboard[x].length; y++) {
                for (let z = 0; z < this.gameboard[x][y].length; z++) {
                    // if the cubie is not already to the right of the cube and there is not a cubie already to the right of it
                    if (x != this.n - 1 && this.gameboard[x][y][z] > 0) {
                        if (this.gameboard[x + 1][y][z] == 0) {
                            let temp = this.gameboard[x][y][z];
                            this.gameboard[x][y][z] = 0;
                            this.gameboard[x + 1][y][z] = temp;
                        }
                    }

                    // NEED TO IMPLEMET CUBIE MERGING
                }
            }
        }
    }

    shiftCubiesNorth() {
        for (let z = 0; z < this.gameboard[0][0].length; z++) {
            for (let x = 0; x < this.gameboard.length; x++) {
                for (let y = 0; y < this.gameboard[x].length; y++) {
                    // if the cubie is not already to the north of the cube and there is not a cubie already to the north of it
                    if (z != 0 && this.gameboard[x][y][z] > 0) {
                        if (this.gameboard[x][y][z - 1] == 0) {
                            let temp = this.gameboard[x][y][z];
                            this.gameboard[x][y][z] = 0;
                            this.gameboard[x][y][z - 1] = temp;
                        }
                    }

                    // NEED TO IMPLEMET CUBIE MERGING
                }
            }
        }
    }

    shiftCubiesSouth() {
        for (let z = this.n - 1; z >= 0; z--) {
            for (let x = 0; x < this.gameboard.length; x++) {
                for (let y = 0; y < this.gameboard[x].length; y++) {
                    // if the cubie is not already to the south of the cube and there is not a cubie already to the south of it
                    if (z != this.n - 1 && this.gameboard[x][y][z] > 0) {
                        if (this.gameboard[x][y][z + 1] == 0) {
                            let temp = this.gameboard[x][y][z];
                            this.gameboard[x][y][z] = 0;
                            this.gameboard[x][y][z + 1] = temp;
                        }
                    }

                    // NEED TO IMPLEMET CUBIE MERGING
                }
            }
        }
    }
}