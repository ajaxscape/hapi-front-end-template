const { Cache } = require('defra-hapi-utils')

class SingleOptionHandlers extends require('defra-hapi-modules').option.single.handlers {
  get Model () {
    return {
      get: async (request) => {
        return Cache.get(request, this.constructor.name) || {}
      },
      set: async (request, data) => {
        return Cache.set(request, this.constructor.name, data)
      }
    }
  }

  get fieldname () {
    return 'selectedOption'
  }

  get selectError () {
    return 'You must select an option'
  }

  get items () {
    return [
      {
        value: 'yes',
        text: 'Yes'
      },
      {
        value: 'no',
        text: 'No'
      }
    ]
  }

  // Overrides parent class handleGet
  async handleGet (request, h, errors) {
    this.viewData = { greeting: 'My single option' }
    return super.handleGet(request, h, errors)
  }

  // Overrides parent class handlePost
  async handlePost (request, h) {
    return super.handlePost(request, h)
  }
}

module.exports = SingleOptionHandlers
