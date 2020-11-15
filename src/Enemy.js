const Entity = require('./Entity')

const FACING_DOWN  = 0
const FACING_LEFT  = 1
const FACING_RIGHT = 2
const FACING_UP    = 3

const FRAME_LIMIT = 15

class Enemy extends Entity
{
    keyPresses = {}

    // Initial position X
    positionX = 0

    // Initial position Y
    positionY = 0

    img = null

    canvas = null

    movementSpeed = 2 // in pixels

    // Current frames, only move once a limit of frames has been reached
    frameCount = 0

    currentDirection = null

    // Current loop index for th player movement
    currentLoopIndex = 0

    // cycle loop animation for the player movemenet
    cycleLoop = [0, 1, 0 , 2]

    constructor(canvas) {
        super()

        this.canBeDestroyed = true
        this.isDestroyed    = false
        this.color          = '#FFF'

        this.canvas = canvas

        // let keyDownListener = (event)=> {
        //     this.keyPresses[event.key] = true
        // }

        // let keyUpListener = (event)=> {
        //     this.keyPresses[event.key] = false
        // }

        // window.addEventListener('keydown', keyDownListener)
        // window.addEventListener('keyup', keyUpListener)

        this.loadImage()
    }

    loadImage()
    {
        this.img = new Image()
        this.img.src = './assets/Enemy/Enemy 12-1.png'
        this.img.onload = ()=> {
            window.requestAnimationFrame(()=> this.gameLoop())
        }
    }

    gameLoop() 
    {
        let context = this.canvas.getContext('2d')
        // context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        let hasMoved = false

        if (this.keyPresses.w) {
            this.moveCharacter(0, -this.movementSpeed, FACING_UP)
            hasMoved = true
        } else if (this.keyPresses.s) {
            this.moveCharacter(0, this.movementSpeed, FACING_DOWN)
            hasMoved = true
        }

        if (this.keyPresses.a) {
            this.moveCharacter(-this.movementSpeed, 0, FACING_LEFT)
            hasMoved = true
        } else if (this.keyPresses.d) {
            this.moveCharacter(this.movementSpeed, 0, FACING_RIGHT)
            hasMoved = true
        }

        if (hasMoved) {
            this.frameCount++
            if (this.frameCount >= FRAME_LIMIT) {
                this.frameCount = 0
                this.currentLoopIndex++
                if (this.currentLoopIndex >= this.cycleLoop.length) {
                    this.currentLoopIndex = 0
                }
            }
        }

        if (!hasMoved) {
            this.currentLoopIndex = 0
        }

        this.drawFrame(this.cycleLoop[this.currentLoopIndex], this.currentDirection, this.positionX, this.positionY)
        window.requestAnimationFrame(()=> this.gameLoop())
    }

    moveCharacter(deltaX, deltaY, direction) 
    {
        if (this.positionX + deltaX > 0 && this.positionX + 32 * 1.2 + deltaX < this.canvas.width) {
            this.positionX += deltaX
        }
        if (this.positionY + deltaY > 0 && this.positionY + 32 * 1.2 + deltaY < this.canvas.height) {
            this.positionY += deltaY
        }

        this.currentDirection = direction
    }

    drawFrame(frameX, frameY, canvasX, canvasY) {
        const SCALE = 1.2
        const SIZE = 32

        let context = this.canvas.getContext('2d')

        context.drawImage(this.img,
                      frameX * SIZE, frameY * SIZE, SIZE, SIZE,
                      canvasX, canvasY, SIZE * SCALE, SIZE * SCALE)
    }
}

module.exports = Enemy