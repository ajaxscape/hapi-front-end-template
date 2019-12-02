const { Cache } = require('defra-hapi-utils')

class UserNameHandlers extends require('defra-hapi-modules').person.name.handlers {
  get Person () {
    return {
      get: async (request) => {
        return Cache.get(request, this.objectName) || {}
      },
      set: async (request, data) => {
        return Cache.set(request, this.objectName, data)
      }
    }
  }

  get objectName () {
    return 'Application'
  }

  get fieldname () {
    return 'userName'
  }
}

module.exports = UserNameHandlers
