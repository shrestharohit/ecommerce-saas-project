import veeValidate from '@/mixins/veeValidate'

const retrieveMixin = {
  created() {
    if (this.crudInfo && this.crudInfo.autoFetch === true) {
      this.getData()
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    getData() {
      this.loading = true
      this.$axios
        .$get(this.crudInfo.endpoint.get)
        .then(response => {
          this.crudInfo.results = response
          this.fetchSuccess()
        })
        .finally(() => {
          this.loading = false
        })
    },
    fetchSuccess() {}
  }
}

const createMixin = {
  mixins: [veeValidate],
  data() {
    return {
      loading: false,
      formValues: {}
    }
  },
  methods: {
    async checkValidity() {
      return !!this.crudInfo.offValidation || (await this.validateAllFields())
    },
    async addData() {
      if (this.loading) {
        return
      }
      if (await this.checkValidity()) {
        this.loading = true
        const endpoint = this.crudInfo.endpoint.create
        this.$axios
          .$post(endpoint, this.getFormValues())
          .then(response => {
            this.$emit('create')
            this.showSnackbar(
              this.crudInfo.createSuccessMessage ||
                `Successfully Created ${[this.crudInfo.name]}`,
              'success'
            )
            this.createSuccess()
          })
          .catch(error => {
            this.getError(error)
            this.showNonFieldErrors(error)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    createSuccess() {},
    showNonFieldErrors(error) {
      const nonFieldError = JSON.parse(error.response.request.response)
      if (
        nonFieldError.non_field_errors &&
        nonFieldError.non_field_errors.length
      ) {
        this.showSnackbar(nonFieldError.non_field_errors[0], 'danger')
      }

      if (error.response.data.detail) {
        this.showSnackbar(error.response.data.detail, 'danger')
      }
    },
    getFormValues() {
      return this.formValues
    }
  }
}

const updateMixin = {
  mixins: [veeValidate],
  data() {
    return {
      loading: false,
      formValues: {}
    }
  },
  methods: {
    async checkValidity() {
      return !!this.crudInfo.offValidation || (await this.validateAllFields())
    },
    async updateData() {
      if (this.loading) {
        return
      }
      if (await this.checkValidity()) {
        this.loading = true
        const endpoint = `${this.crudInfo.endpoint.update}`
        const data = this.getFormValues()
        this.$axios({
          method: this.crudInfo.updateRequestType || 'put',
          url: endpoint,
          data
        })
          .then(response => {
            this.$emit('update')
            this.updateSuccess()
            this.showSnackbar(
              `Successfully Updated ${[this.crudInfo.name]}`,
              'success'
            )
          })
          .catch(error => {
            this.getError(error)
            this.showNonFieldErrors(error)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    updateSuccess() {},
    showNonFieldErrors(error) {
      const nonFieldError = JSON.parse(error.response.request.response)
      if (
        nonFieldError.non_field_errors &&
        nonFieldError.non_field_errors.length
      ) {
        this.showSnackbar(nonFieldError.non_field_errors[0], 'danger')
      }
    },
    getFormValues() {
      return this.formValues
    }
  }
}

const deleteMixin = {
  mixins: [veeValidate],
  methods: {
    deleteInfo() {
      const endpoint = `${this.crudInfo.endpoint.delete}`
      this.$axios
        .$delete(endpoint)
        .then(() => {
          this.showSnackbar(
            `'Successfully Deleted' ${[this.crudInfo.name]}`,
            'success'
          )
          this.deleteSuccess()
        })
        .catch(error => {
          this.getError(error)
          this.showNonFieldErrors(error)
        })
    },
    deleteSuccess() {},
    showNonFieldErrors(error) {
      const nonFieldError = JSON.parse(error.response.request.response)
      if (
        nonFieldError.non_field_errors &&
        nonFieldError.non_field_errors.length
      ) {
        this.showSnackbar(nonFieldError.non_field_errors[0], 'danger')
      }
    }
  }
}

export { createMixin, retrieveMixin, updateMixin, deleteMixin }
