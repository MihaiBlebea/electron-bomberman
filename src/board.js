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

    canvas = null

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

                if (x === this.player_x && y === this.player_y) {
                    box.addEntity(new Player())
                }

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

    move({x, y}) 
    {
        console.log("moving")
        this._board[this.player_x][this.player_y].removeEntity('Player')

        this.player_x += x
        this.player_y += y

        this._board[this.player_x][this.player_y].addEntity(new Player())
    }

    createCanvas(anchorElement)
    {
        this.canvas        = document.createElement("CANVAS")
        this.canvas.width  = this._boxSize * this._boardSize
        this.canvas.height = this._boxSize * this._boardSize

        anchorElement.appendChild(this.canvas)
    }

    render()
    {
        let context = this.canvas.getContext('2d')

        for (let x = 0; x < this._boardSize; x++) {
            for (let y = 0; y < this._boardSize; y++) {

                let startX = x * this._boxSize
                let startY = y * this._boxSize

                if (this._board[x][y].hasAnyEntity()) {
                    this._board[x][y]._contains[0].render(this.canvas, startX, startY, startX + this._boxSize, startY + this._boxSize)
                } else {
                    context.fillStyle = "#FFF"
                    context.fillRect(startX, startY, startX + this._boxSize, startY + this._boxSize)
                    context.fillStyle = '#000'
                    context.fillText(`${x}-${y}`, startX + 10, startY + 10)
                }
            }
        }

        // return this.render()
        // window.requestAnimationFrame(()=> this.render())
    }
}

module.exports = Board