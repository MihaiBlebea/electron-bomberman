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

        let img = new Image()
        img.src = './assets/concrete.png'
        img.onload = ()=> {
            context.drawImage(img,
                0, 0, 40, 40,
                startX, startY, 40, 40)
        }

        // context.clearRect(startX, startY, endX, endY)

        // context.fillStyle = this.color

        // context.fillRect(startX, startY, endX, endY)

        // context.fillStyle = '#000'

        // context.fillText(`${startX / box_size}-${startY / box_size}`, startX + 10, startY + 10)
    }
}

module.exports = ConcreteWall