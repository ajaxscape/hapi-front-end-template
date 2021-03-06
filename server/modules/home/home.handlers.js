const { Cache } = require('defra-hapi-utils')

class HomeHandlers extends require('defra-hapi-handlers') {
  async handleGet (request, h, errors) {
    // Clear the cookies and create a new registration
    await Cache.clear(request)

    const nextPath = await this.getNextPath(request)

    return h.redirect(nextPath)
  }
}

module.exports = HomeHandlers
