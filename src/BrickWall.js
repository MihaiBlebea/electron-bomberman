const Entity = require('./Entity')

class BrickWall extends Entity
{
    constructor() {
        super()

        this.canBeDestroyed = true
        this.isDestroyed    = false
        this.color          = 'red'
    }
}

module.exports = BrickWall