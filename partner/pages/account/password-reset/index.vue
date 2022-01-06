<template>
  <client-only>
    <b-overlay :show="loading" rounded="sm">
      <b-container>
        <b-row align-v="center" align-h="center" class="g-0">
          <b-col cols="12" md="5" class="my-4 p-0 m-0">
            <b-card class="shadow">
              <div>
                <b-card-title
                  class="h3 font-weight-bold text-center text-accent1-500"
                >
                  Account Password Reset
                </b-card-title>
                <b-card-text>
                  <div v-if="success">
                    <div>
                      <h6 class="text-muted text-center text-secondary">
                        {{ message }}
                      </h6>
                      <div>
                        <div class="text-center">
                          <i
                            class="icon-check-circle1 icon-check-circle1 display-2 text-success"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="small text-secondary">
                      Enter your email address to send password reset link.
                    </div>
                    <validation-observer ref="observer">
                      <b-form @submit.prevent="changePassword">
                        <validation-provider
                          v-slot="{ errors, valid }"
                          rules="required|email"
                          name="Email"
                        >
                          <b-form-group label="Email" class="small">
                            <b-form-input
                              v-model="formValues.user"
                              placeholder="Enter your Email Address"
                              autocomplete="on"
                              :state="
                                errors[0] || fieldErrors.email
                                  ? false
                                  : valid
                                  ? true
                                  : null
                              "
                              type="email"
                            />
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.email }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                        <div class="text-center pt-2">
                          <b-button
                            block
                            variant="accent1-500"
                            class="button button-rounded nomargin"
                            name="login-form-modal-submit"
                            type="submit"
                          >
                            Reset Password
                          </b-button>
                        </div>
                      </b-form>
                    </validation-observer>
                  </div>
                </b-card-text>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-overlay>
  </client-only>
</template>
<script>
import veeValidate from '@/mixins/veeValidate'
import accountApi from '@/api/account'
export default {
  mixins: [veeValidate],
  layout: 'homepage',
  middleware: 'anonymous',
  data() {
    return {
      formValues: {
        user: '',
        user_type: 'Partner'
      },
      message:
        'Password Reset email has been sent successfully. Please check your email',
      success: false,
      loading: false
    }
  },
  methods: {
    async changePassword() {
      if (this.loading) return
      if (await this.validateAllFields()) {
        this.loading = true
        const endpoint = accountApi.requestPasswordChange()
        this.$axios
          .post(endpoint, this.formValues)
          .then(() => {
            this.success = true
          })
          .catch(error => {
            this.showSnackbar(error.response.data.user[0], 'danger')
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>
