const Box          = require('./Box')
const BrickWall    = require('./BrickWall')
const ConcreteWall = require('./ConcreteWall')
const Door         = require('./Door')
const Player       = require('./Player')

class Board 
{
    _boxSize = 40

    _boardSize = 20

    _board = {}

    player_x = 1

    player_y = 1

    player = null

    canvas = null

    playerCanvas = null

    constructor(boardSize)
    {
        if (boardSize !== undefined) {
            this._boardSize = boardSize
        }

        this.new()
    }

    new() 
    {
        for (let x = 0; x < this._boardSize; x++) {
            for (let y = 0; y < this._boardSize; y++) {
                if (this._board[x] === undefined) {
                    this._board[x] = {}
                }

                let box = new Box()
                if (x === 0 || y === 0 || x === this._boardSize - 1 || y === this._boardSize - 1) {
                    box.addEntity(new ConcreteWall())
                }
                
                if (x % 2 === 0 && y % 2 == 0) {
                    box.addEntity(new ConcreteWall())
                }
                
                // if (x === this.player_x && y === this.player_y) {
                //     this.player = new Player()
                //     box.addEntity(this.player)
                // }

                this._board[x][y] = box
            }
        }
    }

    genLevel()
    {
        let emptyBoxes = this._emptyBoxes()
        let count = Math.floor(emptyBoxes.length / 2)

        for (let i = 0; i < count; i++) {
            let index    = this._getRandomInt(emptyBoxes.length)
            let position = emptyBoxes[index]

            this._board[position.x][position.y].addEntity(new BrickWall())

            if (i === count - 1) {
                this._board[position.x][position.y].addEntity(new Door())
            }

            emptyBoxes.splice(index, 1)
        }
    }

    _getRandomInt(max) {
        return Math.floor(Math.random() * max)
    }

    _emptyBoxes()
    {
        let emptyBoxes = []
        for (let x = 0; x < this._boardSize; x++) {
            for (let y = 0; y < this._boardSize; y++) {
                if (this._board[x][y].isEmpty() && !['1-2', '2-1'].includes(`${x}-${y}`)) {
                    emptyBoxes.push({x, y})
                }
            }
        }

        return emptyBoxes
    }

    addEntity(entity, x, y)
    {
        this._board[x][y].addEntity(entity)
    }

    getBoard()
    {
        return this._board
    }

    getBoardSize()
    {
        return this._boardSize
    }

    getBoxSize()
    {
        return this._boxSize
    }

    getPlayer()
    {
        return this.player
    }

    getCanvas()
    {
        return this.canvas
    }

    createCanvas(anchorElement)
    {
        this.canvas        = document.createElement("CANVAS")
        this.canvas.width  = this._boxSize * this._boardSize
        this.canvas.height = this._boxSize * this._boardSize

        this.canvas.style.position = 'absolute'
        this.canvas.style.top = 0
        this.canvas.style.left = 0

        anchorElement.appendChild(this.canvas)

        return this.canvas
    }

    createPlayerCanvas(anchorElement)
    {
        this.playerCanvas        = document.createElement("CANVAS")
        this.playerCanvas.width  = this._boxSize * this._boardSize
        this.playerCanvas.height = this._boxSize * this._boardSize

        this.playerCanvas.style.position = 'absolute'
        this.playerCanvas.style.top = 0
        this.playerCanvas.style.left = 0
        this.playerCanvas.style.zIndex = 100

        anchorElement.appendChild(this.playerCanvas)

        return this.playerCanvas
    }

    render()
    {
        let context = this.canvas.getContext('2d')
        this.buildBoard(context)
    }

    buildBoard(context) 
    {
        // let frameCount = 0
        
        for (let x = 0; x < this._boardSize; x++) {
            for (let y = 0; y < this._boardSize; y++) {

                let startX = x * this._boxSize
                let startY = y * this._boxSize

                // Initially, wipe clean this box
                context.fillStyle = "#f3f3f3"
                context.fillRect(startX, startY, startX + this._boxSize, startY + this._boxSize)
                // context.fillStyle = '#000'
                // context.fillText(`${x}-${y}`, startX + 10, startY + 10)

                // Then render what needs to be rendered inside the box
                if (this._board[x][y].hasAnyEntity()) {
                    this._board[x][y]._contains[0].render(this.canvas, startX, startY, startX + this._boxSize, startY + this._boxSize)
                } 
            }
        }
    }
}

module.exports = Board