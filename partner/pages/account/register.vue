<template>
  <client-only>
    <b-overlay :show="loading" rounded="sm">
      <b-container style="min-height: 75vh">
        <b-row align-v="center" align-h="center" class="g-0">
          <b-col cols="12" md="8" class="my-4 p-0 m-0">
            <b-card class="shadow">
              <b-card-title
                class="h3 font-weight-bold text-center text-accent1-500"
              >
                Partner Registration
              </b-card-title>
              <b-card-text v-if="showConfirmation" class="pt-2">
                <h6 class="text-center text-secondary pb-4">
                  An email has been successfully sent to your email address for
                  verification.
                </h6>
                <b-button
                  variant="accent1-500"
                  block
                  @click="$router.push({ name: 'account-login' })"
                >
                  Go to Login Page
                </b-button>
              </b-card-text>
              <b-card-text v-else class="pt-2">
                <validation-observer ref="observer">
                  <b-form @submit.prevent="register">
                    <b-row class="pb-4">
                      <b-col cols="12" md="6">
                        <validation-provider
                          v-slot="{ errors, valid }"
                          rules="required"
                          name="Venue Name"
                        >
                          <b-form-group class="small" label="Venue Name">
                            <b-form-input
                              v-model="formValues.venue_name"
                              :state="
                                errors[0] || fieldErrors.venue_name
                                  ? false
                                  : valid
                                  ? true
                                  : null
                              "
                              placeholder="Enter Venue Name"
                              autocomplete="on"
                              type="text"
                            />
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.venue_name }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col cols="12" md="6">
                        <validation-provider
                          v-slot="{ errors, valid }"
                          rules="required"
                          name="Country"
                        >
                          <b-form-group class="small" label="Country">
                            <auto-complete
                              v-model="formValues.location.country"
                              :endpoint="countryEndpoint"
                              :state="
                                errors[0] || fieldErrors.country
                                  ? false
                                  : valid
                                  ? true
                                  : null
                              "
                              value-field="id"
                              text-field="name"
                            />
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.country }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col cols="12" md="6">
                        <validation-provider
                          v-slot="{ errors, valid }"
                          rules="required"
                          name="First Name"
                        >
                          <b-form-group class="small" label="First Name">
                            <b-form-input
                              v-model="formValues.first_name"
                              placeholder="Enter First Name"
                              :state="
                                errors[0] || fieldErrors.first_name
                                  ? false
                                  : valid
                                  ? true
                                  : null
                              "
                              autocomplete="on"
                              type="text"
                            />
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.first_name }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col cols="12" md="6">
                        <validation-provider
                          v-slot="{ errors, valid }"
                          rules="required"
                          name="Last Name"
                        >
                          <b-form-group class="small" label="Last Name">
                            <b-form-input
                              v-model="formValues.last_name"
                              placeholder="Enter Last Name"
                              :state="
                                errors[0] || fieldErrors.last_name
                                  ? false
                                  : valid
                                  ? true
                                  : null
                              "
                              autocomplete="on"
                              type="text"
                            />
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.last_name }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col cols="12" md="6">
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
                      </b-col>
                      <b-col cols="12" md="6">
                        <validation-provider
                          v-slot="{ errors, valid }"
                          rules="required|phoneNumber|min:7"
                          name="Phone Number"
                        >
                          <b-form-group class="small" label="Phone Number">
                            <b-form-input
                              v-model="formValues.phone_number"
                              :state="
                                errors[0] || fieldErrors.phone_number
                                  ? false
                                  : valid
                                  ? true
                                  : null
                              "
                              placeholder="Enter Phone Number"
                              type="text"
                            />
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.phone_number }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col cols="12" md="6">
                        <validation-provider
                          v-slot="{ errors, valid }"
                          rules="required|strongPassword|min:8"
                          vid="password"
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
                      </b-col>
                      <b-col cols="12" md="6">
                        <validation-provider
                          v-slot="{ errors, valid }"
                          rules="required|strongPassword|min:8|confirmed:password"
                          name="Confirm Password"
                        >
                          <b-form-group class="small" label="Confirm Password">
                            <b-form-input
                              v-model="formValues.confirm_password"
                              :state="
                                errors[0] || fieldErrors.confirm_password
                                  ? false
                                  : valid
                                  ? true
                                  : null
                              "
                              placeholder="Enter Password"
                              type="password"
                            />
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.confirm_password }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col cols="12" md="6">
                        <b-form-checkbox id="checkbox" v-model="privacy_terms">
                          <small>Agree to Privacy Terms and Policy</small>
                        </b-form-checkbox>
                      </b-col>
                    </b-row>
                    <b-button variant="accent1-500" block type="submit">
                      Sign Up
                    </b-button>
                    <div class="mt-4 text-center">
                      <small>
                        Already Registered?
                        <a class="text-info pointer pt-4" @click="signIn()">
                          Sign In
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
import accountApi from '@/api/account'
import commonApi from '@/api/common'
import AutoComplete from '@/components/common/AutoComplete'
export default {
  components: { AutoComplete },
  mixins: [veeValidate],
  layout: 'homepage',
  middleware: 'anonymous',
  data() {
    return {
      formValues: {
        venue_name: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        location: {
          country: ''
        },
        password: '',
        confirm_password: ''
      },
      privacy_terms: false,
      loading: false,
      showConfirmation: false,
      locationList: [],
      countryEndpoint: commonApi.getCountry()
    }
  },
  methods: {
    signIn() {
      this.$router.push({ name: 'account-login' })
    },
    createPostData() {
      const postData = {
        venue_name: this.formValues.venue_name,
        location: this.formValues.location,
        full_name: this.formValues.first_name + ' ' + this.formValues.last_name,
        email: this.formValues.email,
        phone_number: this.formValues.phone_number,
        password: this.formValues.password,
        confirm_password: this.formValues.confirm_password
      }
      return postData
    },
    async register() {
      if (this.loading) return
      if (await this.validateAllFields()) {
        if (!this.privacy_terms)
          return this.showSnackbar(
            'Agree to Privacy Terms and Policy to continue.',
            'danger'
          )
        this.loading = true
        const endpoint = accountApi.partnerRegister()
        this.$axios
          .post(endpoint, this.createPostData())
          .then(() => {
            this.showConfirmation = true
          })
          .catch(error => {
            this.getError(error)
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
