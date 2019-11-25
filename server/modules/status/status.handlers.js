class StatusHandlers extends require('defra-hapi-modules').handlers {
  // Overrides parent class handleGet
  async handleGet (request, h, errors) {
    this.viewData = { greeting: 'My status is good' }
    return super.handleGet(request, h, errors)
  }
}

module.exports = StatusHandlers
