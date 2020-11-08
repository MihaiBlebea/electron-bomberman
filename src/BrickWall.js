const Entity = require('./Entity')

class BrickWall extends Entity
{
    constructor() {
        super()

        this.canBeDestroyed = true
        this.isDestroyed    = false
    }
}

module.exports = BrickWall