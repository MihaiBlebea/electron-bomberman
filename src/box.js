class Box
{
    _contains = []

    constructor(contains) 
    {
        if (Array.isArray(contains) === true) {
            this._contains = contains
        }
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

    hasAnyEntity(entityList)
    {
        for(let i = 0; i < entityList.length; i++) {
            if(this.hasEntity(entityList[i]) === true) {
                return true
            }
        }

        return false
    }

    isEmpty() 
    {
        return this._contains.length === 0
    }
}

module.exports = Box