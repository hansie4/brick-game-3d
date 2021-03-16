class Cubie {
    constructor(x, y, z, value) {
        this.xInGameboard = x;
        this.yInGameboard = y;
        this.zInGameboard = z;
        this.value = value;

        this.isMoving = false;

        this.currentX = x;
        this.currentY = y;
        this.currentZ = z;

        this.xAnimationSpeed = 0;
        this.yAnimationSpeed = 0;
        this.zAnimationSpeed = 0;
    }

    moveTo(x, y, z) {
        if (!this.isMoving) {
            this.isMoving = true;
            this.xInGameboard = x;
            this.yInGameboard = y;
            this.zInGameboard = z;

            // calculate the speed the cubie needs to move in the given direction
            this.xAnimationSpeed = (this.xInGameboard - this.currentX) / ANIMATION_CONSTANT;
            this.yAnimationSpeed = (this.yInGameboard - this.currentY) / ANIMATION_CONSTANT;
            this.zAnimationSpeed = (this.zInGameboard - this.currentZ) / ANIMATION_CONSTANT;

            return this;
        } else {
            return false;
        }
    }

    render() {
        push();

        // accounting for the offset due to blocksize and translating to first corner of cube
        const offset = -(N / 2 * BLOCK_SIZE) + BLOCK_SIZE / 2;
        translate(offset, offset, offset);

        let xPos;
        let yPos;
        let zPos;

        if (!this.isMoving) {
            // rendering at the x y z values if the block isnt moving
            xPos = (this.xInGameboard * BLOCK_SIZE);
            yPos = (this.yInGameboard * BLOCK_SIZE);
            zPos = (this.zInGameboard * BLOCK_SIZE);
        } else {
            // animating if this.isMoving is true

            // first find the distance you need to move in what direction
            let xDiff = this.xInGameboard - this.currentX;
            let yDiff = this.yInGameboard - this.currentY;
            let zDiff = this.zInGameboard - this.currentZ;

            // incrementing the cubie along the x axis
            if (xDiff > 0) {
                this.currentX += this.xAnimationSpeed;

                if (this.currentX >= this.xInGameboard) {
                    this.currentX = this.xInGameboard;
                }
            } else if (xDiff < 0) {
                this.currentX += -this.xAnimationSpeed;

                if (this.currentX <= this.xInGameboard) {
                    this.currentX = this.xInGameboard;
                }
            }

            // incrementing the cubie along the y axis
            if (yDiff > 0) {
                this.currentY += this.yAnimationSpeed;

                if (this.currentY >= this.yInGameboard) {
                    this.currentY = this.yInGameboard;
                }
            } else if (yDiff < 0) {
                this.currentY += -this.yAnimationSpeed;

                if (this.currentY <= this.yInGameboard) {
                    this.currentY = this.yInGameboard;
                }
            }

            // incrementing the cubie along the z axis
            if (zDiff > 0) {
                this.currentZ += this.zAnimationSpeed;

                if (this.currentZ >= this.zInGameboard) {
                    this.currentZ = this.zInGameboard;
                }
            } else if (zDiff < 0) {
                this.currentZ += -this.zAnimationSpeed;

                if (this.currentZ <= this.zInGameboard) {
                    this.currentZ = this.zInGameboard;
                }
            }

            // calculating the values for x y z
            xPos = (this.currentX * BLOCK_SIZE);
            yPos = (this.currentY * BLOCK_SIZE);
            zPos = (this.currentZ * BLOCK_SIZE);

            // resetting values once cubie has reached desired coordinates
            if (this.currentX === this.xInGameboard &&
                this.currentY === this.yInGameboard &&
                this.currentZ === this.zInGameboard) {
                this.isMoving = false;
            }

        }

        // translating to the calculated values
        translate(xPos, yPos, zPos);

        // drawing the cubie
        strokeWeight(1);
        stroke(0);

        fill(this.getColor());
        box(BLOCK_SIZE);

        pop();
    }

    getColor() {
        switch (this.value) {
            case 1:
                return color('MediumTurquoise');
            case 2:
                return color('DarkSlateBlue');
            case 4:
                return color('LightSkyBlue');
            case 8:
                return color('HoneyDew');
            default:
                return color('LightGray');
        }
    }
}