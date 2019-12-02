const { Cache } = require('defra-hapi-utils')

class SelectOneOptionHandlers extends require('defra-hapi-modules').option.single.handlers {
  get Model () {
    return {
      get: async (request) => {
        return Cache.get(request, this.objectName) || {}
      },
      set: async (request, data) => {
        return Cache.set(request, this.objectName, data)
      }
    }
  }
}

module.exports = SelectOneOptionHandlers
