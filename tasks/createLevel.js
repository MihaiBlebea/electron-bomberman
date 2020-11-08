(function() {
    const fs = require('fs')
    const Board = require('./../src/Board')

    let board = new Board(20)
    
    fs.writeFile('./levels/level_01.json', JSON.stringify(board.getBoard()), function(err) {
        if (err !== null) { console.log(err) }
    })
})()