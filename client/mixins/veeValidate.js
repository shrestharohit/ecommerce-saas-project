import VueFormErrors from '@/components/common/VueFormErrors'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  setInteractionMode
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { messages } from 'vee-validate/dist/locale/en.json'

export default {
  components: { ValidationObserver, ValidationProvider, VueFormErrors },
  data() {
    return {
      currentIndex: 0,
      nonFieldErrors: [],
      fieldErrors: {}
    }
  },
  created() {
    this.initializeVeeValidate()
  },
  methods: {
    initializeVeeValidate() {
      setInteractionMode('aggressive')
      Object.keys(rules).forEach(rule => {
        extend(rule, {
          ...rules[rule] /* eslint-disable-line */,
          message: messages[rule]
        })
      })
      extend('password', {
        params: ['target'],
        validate(value, { target }) {
          return value === target
        },
        message: "Password confirmation doesn't match"
      })
      extend('strongPassword', value => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/
        if (regex.test(value)) {
          return true
        }
        return 'Password field must have one uppercase, one lowercase, one special character and one number.'
      })
      extend('phoneNumber', value => {
        const regex = /^[+0-9 ]*$/
        if (regex.test(value)) {
          return true
        }
        return 'Phone Number can only contain numbers, spaces or +.'
      })
    },
    getError(error) {
      this.fieldErrors = {}
      this.nonFieldErrors = []
      const errorResponse = error.response ? error.response.data : error.message
      for (const errorField in errorResponse) {
        if (Array.isArray(errorResponse[errorField])) {
          this.getErrorsFromArray(errorResponse, errorField)
        } else if (typeof errorResponse[errorField] === 'string') {
          this.displayErrors(errorField, errorResponse[errorField])
        } else {
          this.getErrorsFromNestedObject(errorResponse, errorField)
        }
      }
    },
    getErrorsFromArray(errorResponse, errorField) {
      let errorMessage = ''
      const errorCollection = errorResponse[errorField]
      for (const i in errorCollection) {
        errorMessage = errorCollection[i]
        if (!isEmpty(errorMessage)) {
          if (typeof errorMessage === 'object') {
            this.getError(errorMessage)
          } else {
            this.displayErrors(errorField, errorMessage)
          }
        }
        if (
          this.incrementIndex &&
          isEqual(errorResponse, this.mainErrorCollection)
        ) {
          this.currentIndex = this.currentIndex + 1
        }
      }
    },
    getErrorsFromNestedObject(errorResponse, errorField) {
      for (const errorFieldInner in errorResponse[errorField]) {
        let fieldName = ''
        if (typeof parseInt(errorField) !== 'number') {
          fieldName = `${errorField}.${errorFieldInner}`
        } else {
          fieldName = errorFieldInner
        }
        if (typeof errorResponse[errorField][errorFieldInner] === 'string') {
          this.displayErrors(
            fieldName,
            errorResponse[errorField][errorFieldInner]
          )
        } else {
          const errorMessage = errorResponse[errorField][errorFieldInner][0]
          if (
            typeof errorMessage === 'object' &&
            (isEmpty(errorMessage) || Object.keys(errorMessage).length > 0)
          ) {
            continue
          }
          this.displayErrors(fieldName, errorMessage)
        }
      }
    },
    displayErrors(fieldName, errorMessage) {
      if (this.incrementIndex && fieldName !== 'non_field_errors') {
        fieldName = fieldName + this.currentIndex
        this.addNonFieldValidation(fieldName, errorMessage)
        return
      }
      this.addNonFieldValidation(fieldName, errorMessage)
    },
    addNonFieldValidation(field, msg) {
      // /* eslint-disable */
      // debugger
      const errorObj = {}
      if (!msg) {
        return
      }
      if (
        field !== 'non_field_errors' &&
        field !== 'non-field-errors' &&
        field !== ''
      ) {
        this.$set(this.fieldErrors, field, msg)
      } else {
        errorObj[field.split('_').join(' ')] = {
          field: field.split('_').join(' '),
          message: msg
        }
        this.nonFieldErrors.push(errorObj)
      }
    },
    validateAllFields() {
      return this.$refs.observer.validate()
    },
    resetAllFields() {
      return this.$refs.observer.reset()
    },
    veeValidate(fieldName, errors) {
      return {
        id: 'id_' + fieldName,
        errors,
        'error-messages': errors
      }
    },
    showSnackbar(errorMessage, type) {
      this.$bvToast.toast(errorMessage, {
        variant: type,
        noCloseButton: true,
        toaster: 'b-toaster-bottom-right',
        autoHideDelay: 2000,
        solid: true
      })
    }
  }
}
