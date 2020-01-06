class AddUserQuestionHandlers extends require('../common/option/single/single-option.handlers') {
  get objectName () {
    return 'Application'
  }

  get fieldname () {
    return 'userRequired'
  }

  get selectError () {
    return 'You must select yes or no'
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

  async userRequired (request) {
    const model = await this.Model.get(request, this.objectName)
    return model[this.fieldname]
  }
}

module.exports = AddUserQuestionHandlers
