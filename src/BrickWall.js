const Entity = require('./Entity')

class BrickWall extends Entity
{
    constructor() {
        super()

        this.canBeDestroyed = true
        this.isDestroyed    = false
        this.color          = 'red'
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

module.exports = BrickWall