<template>
  <client-only>
    <b-overlay :show="loading" rounded="sm">
      <b-container>
        <b-row align-v="center" align-h="center" class="g-0">
          <b-col cols="12" md="5" class="my-4 p-0 m-0">
            <b-card class="shadow">
              <b-card-title
                class="h3 font-weight-bold text-center text-accent1-500"
              >
                Partner Login
              </b-card-title>
              <b-card-text>
                <validation-observer ref="observer">
                  <b-form @submit.prevent="login">
                    <validation-provider
                      v-slot="{ errors, valid }"
                      rules="required|email"
                      name="Email"
                    >
                      <b-form-group class="small" label="Email">
                        <b-form-input
                          v-model="formValues.email"
                          :state="
                            errors[0] || fieldErrors.email
                              ? false
                              : valid
                              ? true
                              : null
                          "
                          placeholder="Enter Email"
                          autocomplete="on"
                          type="email"
                        />
                        <b-form-invalid-feedback>
                          {{ errors[0] || fieldErrors.email }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors, valid }"
                      rules="required"
                      name="Password"
                    >
                      <b-form-group class="small" label="Password">
                        <b-form-input
                          v-model="formValues.password"
                          :state="
                            errors[0] || fieldErrors.password
                              ? false
                              : valid
                              ? true
                              : null
                          "
                          placeholder="Enter Password"
                          type="password"
                        />
                        <b-form-invalid-feedback>
                          {{ errors[0] || fieldErrors.password }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                    <div class="float-left">
                      <b-form-checkbox id="checkbox" v-model="remember_me">
                        <small>Remember me</small>
                      </b-form-checkbox>
                    </div>
                    <div
                      class="float-right pb-2 text-info pointer"
                      @click="forgotPassword()"
                    >
                      <small class="pt-4"> Forgot Password?</small>
                    </div>
                    <b-button type="submit" block variant="accent1-500">
                      Sign In
                    </b-button>
                    <div class="mt-4 text-center">
                      <small>
                        Don't have an account?
                        <a class="text-info pointer pt-4" @click="signUp()">
                          Create One
                        </a>
                      </small>
                    </div>
                  </b-form>
                </validation-observer>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-overlay>
  </client-only>
</template>

<script>
import veeValidate from '@/mixins/veeValidate'
export default {
  mixins: [veeValidate],
  layout: 'homepage',
  middleware: 'anonymous',
  data() {
    return {
      formValues: {
        email: '',
        password: ''
      },
      loading: false,
      remember_me: false
    }
  },
  methods: {
    signUp() {
      this.$router.push({ name: 'account-register' })
    },
    forgotPassword() {
      this.$router.push({ name: 'account-password-reset' })
    },
    async login() {
      if (this.loading) return
      if (await this.validateAllFields()) {
        this.loading = true
        this.$auth
          .loginWith(this.$auth.options.defaultStrategy, {
            data: this.formValues
          })
          .then(() => {
            if (this.remember_me) {
              this.$auth.$storage.setCookie(
                `_remember.${this.$auth.options.defaultStrategy}`,
                this.$auth.strategy.token.get(),
                { maxAge: 60 * 60 * process.env.REMEMBER_ME_EXPIRY }
              )
            }
            this.showSnackbar('Successfully Logged In', 'success')
          })
          .catch(error => {
            const errorMessage =
              error.response.data.detail || error.response.data.non_field_errors
            this.showSnackbar(errorMessage, 'danger')
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>
