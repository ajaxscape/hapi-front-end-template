const path = require('path')
const nunjucks = require('nunjucks')
const pkg = require('../../package.json')

const serviceName = 'My demo service'

module.exports = {
  plugin: require('@hapi/vision'),
  options: {
    engines: {
      njk: {
        compile: (src, options) => {
          const template = nunjucks.compile(src, options.environment)

          return (context) => {
            return template.render(context)
          }
        },

        prepare: (options, next) => {
          options.compileOptions.environment = nunjucks.configure([
            path.join(options.relativeTo || process.cwd(), options.path),
            'node_modules/govuk-frontend/govuk',
            'node_modules/govuk-frontend/govuk/components/',
            'node_modules/defra-hapi-modules/source/modules/'
          ], {
            autoescape: true,
            watch: false
          })

          return next()
        }
      }
    },
    path: '../modules',
    relativeTo: __dirname,
    isCached: false,
    context: {
      appVersion: pkg.version,
      assetPath: '/assets',
      serviceName: serviceName,
      pageTitle: serviceName + ' - GOV.UK'
    }
  }
}
