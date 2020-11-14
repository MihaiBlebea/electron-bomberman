const Box          = require('./Box')
const BrickWall    = require('./BrickWall')
const ConcreteWall = require('./ConcreteWall')

class Board 
{
    _boxSize = 40

    _boardSize = 20

    _board = {}

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

                this._board[x][y] = box
            }
        }
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

    render(anchorElement)
    {
        let canvas = this._createCanvas()
        anchorElement.appendChild(canvas)
    }

    _createCanvas()
    {
        let canvas    = document.createElement("CANVAS")
        canvas.width  = this._boxSize * this._boardSize
        canvas.height = this._boxSize * this._boardSize

        let context = canvas.getContext('2d')
        
        for (let x = 0; x < this._boardSize; x++) {
            for (let y = 0; y < this._boardSize; y++) {
                let startX = x * this._boxSize
                let startY = y * this._boxSize
                context.font = "10px Georgia"

                context.fillStyle = '#fff'

                if (this._board[x][y].hasAnyEntity([new ConcreteWall(), new BrickWall()])) {
                    context.fillStyle = this._board[x][y]._contains[0].color
                }

                context.fillRect(startX, startY, startX + this._boxSize, startY + this._boxSize)

                context.fillStyle = '#000'
                context.fillText(`${x}-${y}`, startX + 10, startY + 10)
            }
        }

        return canvas
    }

    update()
    {

    }
}

module.exports = Board