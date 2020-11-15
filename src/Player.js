const Entity = require('./Entity')

class Player extends Entity
{
    constructor() {
        super()
        
        this.canBeDestroyed = true
        this.isDestroyed    = false
        this.color          = 'green'
    }

    // render(canvas, startX, startY, endX, endY) {
    //     let context = canvas.getContext('2d')
    //     let box_size = endX - startX

    //     context.clearRect(startX, startY, endX, endY)

    //     context.fillStyle = this.color

    //     context.fillRect(startX, startY, endX, endY)

    //     context.fillStyle = '#000'

    //     context.fillText(`${startX / box_size}-${startY / box_size}`, startX + 10, startY + 10)
    // }

    render(canvas, startX, startY, endX, endY)
    {
        let context = canvas.getContext('2d')
        
        let img = new Image()
        img.src = './assets/Male/Male 01-1.png'
        img.onload = function() {
            init()
        }

        const w = 32
        const h = 32
        const scale = 2

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

            context.clearRect(0, 0, w * scale, h * scale)

            let frame = cycles[index]
            context.drawImage(img, w * frame, 0, w, h,  0, 0, w * scale, h * scale)

            index++
            if (index >= cycles.length) {
                index = 0
            }

            window.requestAnimationFrame(step)
        }

        let init = ()=> {

            // context.clearRect(0, 0, w * scale, h * scale)
            // context.drawImage(img, 0, 0, w, h,  0, 0, w * scale, h * scale)
            // context.drawImage(img, w, 0, w, h,  w * scale, 0, w * scale, h * scale)
            // context.drawImage(img, 0, 0, w, h,  w * scale * 2, 0, w * scale, h * scale)
            // context.drawImage(img, w * 2, 0, w, h,  w * scale * 3, 0, w * scale, h * scale)
            window.requestAnimationFrame(step)
        }
    }
}

module.exports = Player