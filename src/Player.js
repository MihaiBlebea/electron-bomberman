const Entity = require('./Entity')

class Player extends Entity
{
    constructor() {
        super()
        
        this.canBeDestroyed = true
        this.isDestroyed    = false
        this.color          = 'green'
    }
}

module.exports = Player