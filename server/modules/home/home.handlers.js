class HomeHandlers extends require('defra-hapi-modules').handlers {
  // Overrides parent class handleGet
  async handleGet (request, h, errors) {
    this.viewData = { greeting: 'Hello world' }
    return super.handleGet(request, h, errors)
  }
}

module.exports = HomeHandlers
