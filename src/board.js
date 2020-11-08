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
}

module.exports = Board