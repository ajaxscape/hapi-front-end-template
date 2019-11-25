const { errorPages, routeFlow } = require('defra-hapi-modules').plugins
let flow

module.exports = {
  plugin: errorPages,
  options: {
    handleFailedPrecondition: (request, h) => {
      flow = flow || routeFlow.flow()
      return h.redirect(flow.home.path)
    }
  }
}
