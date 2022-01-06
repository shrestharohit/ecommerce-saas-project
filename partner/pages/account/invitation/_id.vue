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
                  Set Password
                </b-card-title>
                <b-card-text>
                  <div v-if="success">
                    <h6 class="text-center text-secondary pb-4">
                      Your account has successfully been registered.
                    </h6>
                    <b-button
                      variant="accent1-500"
                      block
                      @click="$router.push({ name: 'account-login' })"
                    >
                      Go to Login Page
                    </b-button>
                  </div>
                  <div v-else>
                    <validation-observer ref="observer">
                      <b-form @submit.prevent="changePassword">
                        <b-row class="pb-4">
                          <b-col cols="12" md="12">
                            <validation-provider
                              v-slot="{ errors, valid }"
                              rules="required|strongPassword|min:8"
                              name="Password"
                              vid="password"
                            >
                              <b-form-group class="small" label="Password">
                                <b-form-input
                                  v-model="formValues.password1"
                                  :state="
                                    errors[0] || fieldErrors.password1
                                      ? false
                                      : valid
                                      ? true
                                      : null
                                  "
                                  placeholder="Enter Password"
                                  type="password"
                                />
                                <b-form-invalid-feedback>
                                  {{ errors[0] || fieldErrors.password1 }}
                                </b-form-invalid-feedback>
                              </b-form-group>
                            </validation-provider>
                          </b-col>
                          <b-col cols="12" md="12">
                            <validation-provider
                              v-slot="{ errors, valid }"
                              rules="required|strongPassword|min:8|confirmed:password"
                              name="Repeat Password"
                            >
                              <b-form-group
                                class="small"
                                label="Repeat Password"
                              >
                                <b-form-input
                                  v-model="formValues.password2"
                                  :state="
                                    errors[0] || fieldErrors.password2
                                      ? false
                                      : valid
                                      ? true
                                      : null
                                  "
                                  placeholder="Enter Repeat Password"
                                  type="password"
                                />
                                <b-form-invalid-feedback>
                                  {{ errors[0] || fieldErrors.password2 }}
                                </b-form-invalid-feedback>
                              </b-form-group>
                            </validation-provider>
                          </b-col>
                        </b-row>
                        <b-button block variant="accent1-500" type="submit">
                          Set Password
                        </b-button>
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
export default {
  mixins: [veeValidate],
  layout: 'homepage',
  middleware: 'anonymous',
  data() {
    return {
      formValues: {},
      loading: false,
      success: false
    }
  },
  mounted() {
    this.checkLinkValidity()
  },
  methods: {
    checkLinkValidity() {
      this.loading = true
      const endpoint = `api/v1/control-panel/register/${this.$route.params.id}`
      this.$axios
        .$get(endpoint)
        .then(response => {
          if (response.status === 200) {
            this.loading = false
          }
        })
        .catch(error => {
          const errorMessage = error.response.data.detail
          this.showSnackbar(errorMessage, 'danger')
          setTimeout(() => {
            this.$router.push({ name: 'index' })
          }, 2000)
        })
    },
    async changePassword() {
      if (this.loading) return
      if (await this.validateAllFields()) {
        this.loading = true
        const endpoint = `api/v1/control-panel/register/${this.$route.params.id}`
        this.$axios
          .post(endpoint, this.formValues)
          .then(() => {
            this.showSnackbar('Password Set Successfully', 'success')
            this.success = true
          })
          .catch(error => {
            this.showSnackbar(error.response.data.non_field_errors[0], 'danger')
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>
