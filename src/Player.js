const Entity = require('./Entity')

class Player extends Entity
{
    constructor() {
        super()
        
        this.canBeDestroyed = true
        this.isDestroyed    = false
        this.color          = '#FFF'
    }

    render(canvas, startX, startY, endX, endY)
    {
        let context = canvas.getContext('2d')

        let img = new Image()
        img.src = './assets/Male/Male 01-1.png'
        img.onload = function() {
            step()
        }

        const w = 32
        const h = 32
        const scale = 1.2

        let index = 0
        let cycles = [0, 1, 0, 2]
        let frameCount = 0

        let step = ()=> {
            frameCount++
            if (frameCount < 15) {
                window.requestAnimationFrame(step)
                return
            }
            frameCount = 0
            context.fillStyle = this.color
            context.fillRect(startX, startY, 40, 40)

            let frame = cycles[index]
            context.drawImage(img, w * frame, 0, w, h,  startX, startY, w * scale, h * scale)

            index++
            if (index >= cycles.length) {
                index = 0
            }

            window.requestAnimationFrame(step)
        }
    }
}

module.exports = Player