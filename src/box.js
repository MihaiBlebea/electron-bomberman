class Box
{
    _contains = []

    constructor() 
    {
        this._contains = []
    }

    addEntity(entity) 
    {
        this._contains.push(entity)
    }

    hasEntity(entity)
    {
        if (typeof entity !== 'object'|| entity === null) {
            return false
        }

        if (this._contains.lenght === 0) {
            return false
        }

        let entityName = entity.constructor.name
        for (let i = 0; i < this._contains.length; i++) {
            if (this._contains[i].constructor.name === entityName) {
                return true
            }
        }

        return false
    }
}

module.exports = Box