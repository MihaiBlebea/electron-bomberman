const Entity = require('./Entity')

class Door extends Entity
{
    constructor() {
        super()
        
        this.canBeDestroyed = false
        this.isDestroyed    = false
        this.color          = 'blue'
    }

    render(canvas, startX, startY, endX, endY) {
        let context = canvas.getContext('2d')

        context.clearRect(startX, startY, endX, endY)
        
        context.fillStyle = this.color

        context.fillRect(startX, startY, endX, endY)
    }
}

module.exports = Door