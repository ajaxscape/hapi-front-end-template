const register = function (server) {
  server.route({
    method: 'GET',
    path: '/assets/all.js',
    handler: {
      file: 'node_modules/govuk-frontend/govuk/all.js'
    },
    options: {
      tags: ['asset', 'always']
    }
  })

  server.route({
    method: 'GET',
    path: '/assets/{path*}',
    handler: {
      directory: {
        path: [
          'public/static',
          'public/build',
          'node_modules/govuk-frontend/govuk/assets'
        ]
      }
    }
  })
}

const plugin = {
  name: 'defra-public',
  register: register,
  once: true,
  pkg: require('../../package.json')
}

module.exports = {
  plugin: plugin
}
