class AddUserQuestionHandlers extends require('../common/select-one-option.handlers') {
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
    const result = await this.Model.get(request, this.fieldname)
    return result[this.fieldname]
  }
}

module.exports = AddUserQuestionHandlers
