<template>
  <form-wrapper
    :title="formType === 'Update' ? 'Edit Client' : 'New Client'"
    :loading="loading"
    @close="
      $router.push({
        name: 'admin-slug-client',
        params: {
          slug: $route.params.slug
        }
      })
    "
  >
    <validation-observer ref="observer">
      <b-form @submit.prevent="login">
        <b-row align-v="start" align-h="center" class="p-3 pb-4 mb-5 mt-3">
          <b-col cols="12" md="7">
            <b-card border-variant="light" class="shadow">
              <b-row class="pb-4">
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
                    v-slot="{ errors }"
                    rules="phoneNumber|min:7"
                    name="Phone Number"
                  >
                    <b-form-group class="small" label="Phone Number">
                      <b-form-input
                        v-model="formValues.phone_number"
                        :state="
                          errors[0] || fieldErrors.phone_number ? false : null
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
                    v-slot="{ errors }"
                    rules="email"
                    name="Email"
                  >
                    <b-form-group class="small" label="Email">
                      <b-form-input
                        v-model="formValues.email"
                        :state="errors[0] || fieldErrors.email ? false : null"
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
                <b-col cols="12">
                  <validation-provider
                    v-slot="{ errors }"
                    rules=""
                    name="Notification Preference"
                  >
                    <b-form-group class="small" label="Notification Preferences"
                      ><b-form-select
                        v-model="formValues.notification_preferences"
                        :options="notificationPreferenceOptions"
                      ></b-form-select>
                      <b-form-invalid-feedback>
                        {{ errors[0] || fieldErrors.notification_preferences }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col cols="12" md="7" class="pt-3">
            <b-card border-variant="light" class="shadow">
              <b-row class="pb-4">
                <b-col cols="12" md="6">
                  <validation-provider
                    v-slot="{ errors }"
                    rules=""
                    name="Gender"
                  >
                    <b-form-group class="small" label="Gender"
                      ><b-form-select
                        v-model="formValues.gender"
                        :options="genderOptions"
                      ></b-form-select>
                      <b-form-invalid-feedback>
                        {{ errors[0] || fieldErrors.gender }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col cols="12" md="6">
                  <validation-provider
                    v-slot="{ errors }"
                    rules=""
                    name="Referral Source"
                  >
                    <b-form-group class="small" label="Referral Source"
                      ><b-form-select
                        v-model="formValues.referral_source"
                        :options="referralSourceOptions"
                      ></b-form-select>
                      <b-form-invalid-feedback>
                        {{ errors[0] || fieldErrors.referral_source }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col cols="12" md="12">
                  <validation-provider
                    v-slot="{ errors }"
                    rules=""
                    name="Birthday"
                  >
                    <b-form-group class="small" label="Birthday">
                      <b-form-datepicker
                        v-model="formValues.birthday"
                        :state="
                          errors[0] || fieldErrors.birthday ? false : null
                        "
                      ></b-form-datepicker>
                      <b-form-invalid-feedback>
                        {{ errors[0] || fieldErrors.birthday }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col cols="12" md="12">
                  <validation-provider
                    v-slot="{ errors }"
                    rules=""
                    name="Notes"
                  >
                    <b-form-group class="small" label="Client Notes">
                      <b-form-textarea
                        v-model="formValues.notes"
                        placeholder="Enter something..."
                        :state="errors[0] || fieldErrors.notes ? false : null"
                        rows="3"
                      />
                      <b-form-invalid-feedback>
                        {{ errors[0] || fieldErrors.notes }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col cols="12" md="7" class="pt-3">
            <b-card border-variant="light" class="shadow">
              <b-row class="pb-4">
                <b-col cols="12" md="12">
                  <validation-provider
                    v-slot="{ errors }"
                    rules=""
                    name="Country"
                  >
                    <b-form-group class="small" label="Country">
                      <auto-complete
                        v-model="formValues.location.country"
                        :endpoint="countryEndpoint"
                        :state="errors[0] || fieldErrors.country ? false : null"
                        value-field="id"
                        text-field="name"
                      />
                      <b-form-invalid-feedback>
                        {{ errors[0] || fieldErrors.country }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col cols="12" md="12">
                  <validation-provider v-slot="{ errors }" rules="" name="City">
                    <b-form-group class="small" label="City">
                      <auto-complete
                        :key="componentKey"
                        v-model="formValues.location.city"
                        :endpoint="cityEndpoint"
                        :state="errors[0] || fieldErrors.city ? false : null"
                        value-field="id"
                        text-field="name"
                      />
                      <b-form-invalid-feedback>
                        {{ errors[0] || fieldErrors.city }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col cols="12" md="12">
                  <validation-provider
                    v-slot="{ errors }"
                    rules=""
                    name="Address"
                  >
                    <b-form-group class="small" label="Address">
                      <b-form-input
                        v-model="formValues.location.address"
                        placeholder="Enter Address"
                        :state="errors[0] || fieldErrors.address ? false : null"
                        autocomplete="on"
                        type="text"
                      />
                      <b-form-invalid-feedback>
                        {{ errors[0] || fieldErrors.address }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <b-row class="bg-white">
      <b-col class="text-right">
        <b-container class="p-2 px-4">
          <b-button
            size="lg"
            variant="light"
            @click="
              $router.push({
                name: 'admin-slug-client',
                params: {
                  slug: $route.params.slug
                }
              })
            "
          >
            Cancel
          </b-button>
          <b-button size="lg" variant="accent3-800" @click="submit()">
            Save
          </b-button>
        </b-container>
      </b-col>
    </b-row>
  </form-wrapper>
</template>
<script>
import FormWrapper from '@/components/common/FormWrapper.vue'
import AutoComplete from '@/components/common/AutoComplete'
import { retrieveMixin, createMixin, updateMixin } from '@/mixins/FormMixins'
import clientApi from '@/api/client.js'
import commonApi from '@/api/common.js'
export default {
  components: {
    FormWrapper,
    AutoComplete
  },
  mixins: [retrieveMixin, createMixin, updateMixin],
  props: {
    formType: {
      type: String,
      default: 'Create'
    }
  },
  data() {
    return {
      formValues: {
        notification_preferences: 'Email & SMS',
        gender: 'Female',
        referral_source: 'Unknown',
        location: {
          city: '',
          country: '',
          address: ''
        }
      },
      notificationPreferenceOptions: [
        { value: 'Email & SMS', text: 'Email & SMS' },
        { value: 'Email', text: 'Email' },
        { value: 'SMS', text: 'SMS' },
        { value: 'No Notifications', text: 'No Notifications' }
      ],
      genderOptions: [
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' },
        { value: 'All', text: 'All' }
      ],
      referralSourceOptions: [
        { value: 'Select Source', text: 'Select Source', disabled: true },
        { value: 'Unknown', text: 'Unknown' },
        { value: 'Friend', text: 'Friend' },
        { value: 'Social Media', text: 'Social Media' }
      ],
      countryEndpoint: commonApi.getCountry(),
      cityEndpoint: commonApi.getCity(),
      componentKey: 0,
      crudInfo: {
        name: 'Client',
        results: [],
        endpoint: {
          get: clientApi.getClientDetails(
            this.$route.params.id,
            this.$route.params.slug
          ),
          create: clientApi.createClient(this.$route.params.slug),
          update: clientApi.updateClient(
            this.$route.params.id,
            this.$route.params.slug
          )
        }
      }
    }
  },
  watch: {
    'formValues.address.country'(val) {
      this.cityEndpoint = commonApi.getCity() + `?country=${val}`
      this.componentKey += 1
    }
  },
  created() {
    if (this.formType === 'Update') {
      this.getData()
    }
  },
  methods: {
    async submit() {
      if (await this.validateAllFields()) {
        const endpoint = `/api/v1/control-panel/${this.$route.params.slug}/client/check-redundant/`
        const postData = {}
        if (this.formValues.phone_number) {
          postData.phone_number = this.formValues.phone_number
        }
        if (this.formValues.email) {
          postData.email = this.formValues.email
        }
        this.$axios.post(endpoint, postData).then(response => {
          if (response.data.client_exists) {
            this.warningBox(response)
          } else {
            this.formType === 'Update' ? this.updateData() : this.addData()
          }
        })
      }
    },
    warningBox(response) {
      this.$bvModal
        .msgBoxConfirm(
          `The client with provided phone number or email already exists. Do you still want to continue?`,
          {
            title: `Save Client`,
            size: 'md',
            buttonSize: 'md',
            okVariant: 'success',
            okTitle: 'Continue Anyway?',
            cancelTitle: 'Cancel',
            hideHeaderClose: false,
            centered: true
          }
        )
        .then(value => {
          if (value) {
            this.formType === 'Update' ? this.updateData() : this.addData()
          }
        })
    },
    getFormValues() {
      const postData = {
        full_name: this.formValues.first_name + ' ' + this.formValues.last_name,
        email: this.formValues.email,
        phone_number: this.formValues.phone_number,
        gender: this.formValues.gender,
        notification_preferences: this.formValues.notification_preferences,
        referral_source: this.formValues.referral_source,
        birthday: this.formValues.birthday,
        notes: this.formValues.notes,
        location: Object.keys(this.formValues.location).length
          ? this.formValues.location
          : null
      }
      return postData
    },
    fetchSuccess() {
      this.formValues = this.crudInfo.results
      this.formValues.first_name = this.crudInfo.results.full_name.split(' ')[0]
      this.formValues.last_name = this.crudInfo.results.full_name.split(' ')[1]
    },
    createSuccess() {
      this.$router.push({
        name: 'admin-slug-client',
        params: {
          slug: this.$route.params.slug
        }
      })
    },
    updateSuccess() {
      this.$router.push({
        name: 'admin-slug-client',
        params: {
          slug: this.$route.params.slug
        }
      })
    }
  }
}
</script>
