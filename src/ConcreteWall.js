const Entity = require('./Entity')

class ConcreteWall extends Entity
{
    constructor() {
        super()

        this.canBeDestroyed = false
        this.isDestroyed    = false
        this.color          = '#b3b3b3'
    }

    render(canvas, startX, startY, endX, endY) {
        let context = canvas.getContext('2d')
        let box_size = endX - startX

        context.clearRect(startX, startY, endX, endY)

        context.fillStyle = this.color

        context.fillRect(startX, startY, endX, endY)

        context.fillStyle = '#000'

        context.fillText(`${startX / box_size}-${startY / box_size}`, startX + 10, startY + 10)
    }
}

module.exports = ConcreteWall