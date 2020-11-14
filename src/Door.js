const Entity = require('./Entity')

class Door extends Entity
{
    constructor() {
        super()
        
        this.canBeDestroyed = false
        this.isDestroyed    = false
        this.color          = 'blue'
    }
}

module.exports = Door