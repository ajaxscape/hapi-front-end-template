
class SingleOptionHandlers extends require('defra-hapi-modules').option.single.handlers {
  get Model () {
    return {
      get: () => {
        // Clone the data
        const { ...data } = this._data || {}
        return data
      },
      set: (data) => {
        this._data = data
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
}

module.exports = SingleOptionHandlers
