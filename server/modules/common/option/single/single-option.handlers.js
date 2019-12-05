const Joi = require('@hapi/joi')
const { Cache } = require('defra-hapi-utils')

class SelectOneOptionHandlers extends require('defra-hapi-handlers') {
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

  get schema () {
    const validValues = this.items.map(({ value }) => value)
    return Joi.object({
      [this.fieldname]: Joi.string().valid(...validValues).required()
    })
  }

  get errorMessages () {
    return {
      [this.fieldname]: {
        'any.required': this.selectError
      }
    }
  }

  async getData (request) {
    return await this.Model.get(request) || {}
  }

  async setData (request, registration) {
    return this.Model.set(request, registration)
  }

  // Overrides parent class handleGet
  async handleGet (request, h, errors) {
    const data = await this.getData(request)
    const { fieldname, hint, divider } = this

    const items = this.items.map(({ value, text, hint, storedValue = value }) => {
      return {
        value: value.toString(),
        text,
        hint: hint ? { text: hint } : undefined,
        checked: storedValue !== undefined && storedValue === data[fieldname]
      }
    })

    if (divider) {
      // Insert the divider before the last item
      items.splice(items.length - 1, 0, { divider })
    }

    this.viewData = {
      hint: hint ? { text: hint } : undefined,
      items,
      description: this.description,
      guidanceLink: this.guidanceLink
    }
    return super.handleGet(request, h, errors)
  }

  // Overrides parent class handlePost
  async handlePost (request, h) {
    const data = await this.getData(request)
    const { value, storedValue = value } = this.items.find(({ value }) => {
      return request.payload[this.fieldname] === value
    })
    data[this.fieldname] = storedValue
    await this.setData(request, data)
    return super.handlePost(request, h)
  }
}

module.exports = SelectOneOptionHandlers
