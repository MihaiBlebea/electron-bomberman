const Box = require('./box')

class Board 
{
    _boxSize = 20

    _boardSize = 20

    _board = {}

    constructor(boardSize)
    {
        if (boardSize !== undefined) {
            this._boardSize = boardSize
        }
    }

    new() 
    {
        for (let x = 0; x < this._boardSize; x++) {
            for (let y = 0; y < this._boardSize; y++) {
                if (this._board[x] === undefined) {
                    this._board[x] = {}
                }
                this._board[x][y] = new Box()
            }
        }
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
                if (x % 2 === 0 && y % 2 === 0) {
                    context.fillStyle = '#000'
                } else {
                    context.fillStyle = '#fff'
                }

                let startX = x * this._boxSize
                let startY = y * this._boxSize
                context.fillRect(startX, startY, startX + this._boxSize, startY + this._boxSize)
            }
        }

        return canvas
    }

    update()
    {

    }
}

module.exports = Board