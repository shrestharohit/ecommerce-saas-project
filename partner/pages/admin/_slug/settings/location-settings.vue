<template>
  <client-only>
    <page-wrapper :title="'Location Settings'">
      <b-overlay :show="loading" rounded="sm">
        <div class="overflow-x-hidden pt-4">
          <b-row align-h="center" align-v="center" class="px-2">
            <b-col md="10" cols="12">
              <a
                class="pointer"
                @click="
                  $router.push({
                    name: 'admin-slug-settings',
                    params: { slug: $route.params.slug }
                  })
                "
              >
                Go Back to Previous Page
              </a>
              <validation-observer ref="observer">
                <b-form>
                  <b-row align-h="center" align-v="center" class="pb-3">
                    <b-col md="5" cols="12" class="pb-2 pb-lg-0">
                      <div class="font-weight-bold">
                        <h3>Location Settings</h3>
                      </div>
                      <div class="text-secondary small">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Alias iusto odit perspiciatis recusandae neque
                        mollitia consectetur.
                      </div>
                    </b-col>
                    <b-col md="7" cols="12">
                      <b-card class="shadow">
                        <b-card-text>
                          <b-row>
                            <b-col md="12" cols="12">
                              <validation-provider
                                v-slot="{ errors }"
                                rules=""
                                name="Address"
                              >
                                <b-form-group class="small" label="Address">
                                  <gmap-autocomplete
                                    :key="key.address"
                                    :value="formValues.address"
                                    class="form-control"
                                    placeholder="Enter a Address"
                                    :options="{
                                      types: ['establishment'],
                                      componentRestrictions: {
                                        country: countryAbbrevation
                                      }
                                    }"
                                    @place_changed="
                                      getAddressDataFromAutoComplete
                                    "
                                  >
                                  </gmap-autocomplete>
                                  <b-form-invalid-feedback>
                                    {{ errors[0] || fieldErrors.address }}
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </validation-provider>
                            </b-col>
                            <b-col cols="12" md="12">
                              <validation-provider
                                v-slot="{ errors }"
                                rules=""
                                name="City"
                              >
                                <b-form-group class="small" label="City *">
                                  <auto-complete
                                    :key="key.city"
                                    v-model="formValues.city"
                                    :endpoint="endpoint.city"
                                    :state="
                                      errors[0] || fieldErrors.city
                                        ? false
                                        : null
                                    "
                                    value-field="id"
                                    text-field="name"
                                    @fulldata="getCityData($event)"
                                    @datafromapi="cityList = $event"
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
                                name="Country"
                              >
                                <b-form-group class="small" label="Country *">
                                  <auto-complete
                                    :key="key.country"
                                    v-model="formValues.country"
                                    :endpoint="endpoint.country"
                                    :state="
                                      errors[0] || fieldErrors.country
                                        ? false
                                        : null
                                    "
                                    read-only
                                    value-field="id"
                                    text-field="name"
                                  />
                                  <b-form-invalid-feedback>
                                    {{ errors[0] || fieldErrors.country }}
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </validation-provider>
                            </b-col>
                            <b-col md="12" cols="12">
                              <validation-provider
                                v-slot="{ errors }"
                                rules=""
                                name="PostCode"
                              >
                                <b-form-group class="small" label="Post Code">
                                  <b-form-input
                                    :key="key.postal_code"
                                    v-model="formValues.postal_code"
                                    placeholder="Enter Post Code"
                                    :state="
                                      errors[0] || fieldErrors.postal_code
                                        ? false
                                        : null
                                    "
                                    autocomplete="on"
                                    type="text"
                                  />
                                  <b-form-invalid-feedback>
                                    {{ errors[0] || fieldErrors.postal_code }}
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </validation-provider>
                            </b-col>
                            <b-col>
                              <b-form-group
                                class="small"
                                label="Mark you store in map"
                              >
                                <google-maps-location-picker
                                  :key="key.latLng"
                                  :value="formValues.latLng"
                                  @address="getReverseGeocodedData($event)"
                                ></google-maps-location-picker>
                              </b-form-group>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card>
                    </b-col>
                  </b-row>
                </b-form>
              </validation-observer>
            </b-col>
          </b-row>
          <b-row class="bg-white">
            <b-col cols="12" md="12" class="text-right">
              <div class="p-2">
                <b-button
                  size="lg"
                  variant="light"
                  @click="
                    $router.push({
                      name: 'admin-slug-settings',
                      params: { slug: $route.params.slug }
                    })
                  "
                >
                  Cancel
                </b-button>
                <b-button size="lg" variant="accent3-800" @click="updateData()">
                  Save
                </b-button>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-overlay>
    </page-wrapper>
  </client-only>
</template>

<script>
import PageWrapper from '@/components/common/PageWrapper'
import { retrieveMixin, updateMixin } from '@/mixins/FormMixins'
import AutoComplete from '@/components/common/AutoComplete'
import commonApi from '@/api/common.js'
import GoogleMapsLocationPicker from '@/components/common/GoogleMapsLocationPicker'
import { mapMutations } from 'vuex'

export default {
  components: {
    PageWrapper,
    AutoComplete,
    GoogleMapsLocationPicker
  },
  mixins: [retrieveMixin, updateMixin],
  middleware: 'auth',
  data() {
    return {
      endpoint: {
        country: commonApi.getCountry(),
        city: commonApi.getCity()
      },
      key: {
        country: 0,
        city: 0,
        address: 0,
        postal_code: 0,
        latLng: 0
      },
      formValues: {
        country: '',
        city: '',
        address: '',
        postal_code: '',
        latLng: {}
      },
      wait: false,
      countryAbbrevation: '',
      currentCity: '',
      cityList: [],
      currentCountry: '',
      cityKey: 'locality',
      crudInfo: {
        name: 'Settings',
        results: [],
        endpoint: {
          get: `/api/v1/control-panel/${this.$route.params.slug}/address/`,
          update: ''
        }
      }
    }
  },
  watch: {
    'formValues.country': {
      handler(val) {
        this.endpoint.city = commonApi.getCity() + `?country=${val}`
        this.key.city += 1
        this.key.address += 1
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    ...mapMutations({
      setSwitchedVenue: 'venue/setSwitchedVenue',
      setSwitchableVenues: 'venue/setSwitchableVenues'
    }),
    updateSuccess() {
      this.getData()
      const endpoint = commonApi.getVenue()
      this.$axios.get(endpoint).then(response => {
        this.setSwitchableVenues(response.data.results)
        const venue = response.data.results.find(
          x => x.slug === this.$route.params.slug
        )
        this.setSwitchedVenue(venue)
      })
    },
    getCityData(data) {
      if (this.wait) {
        this.wait = false
        return
      }
      this.currentCity = data.name
      this.formValues.address = ''
      this.formValues.postal_code = ''
      this.key.address += 1
      this.formValues.latLng = {
        lat: data.latitude,
        lng: data.longitude
      }
      this.key.latLng += 1
    },
    getAddressDataFromAutoComplete(data) {
      this.formValues.address = ''
      if (this.checkCity(data)) {
        const routeFromMap =
          data.address_components &&
          data.address_components.find(x => x.types.includes('route'))
        this.formValues.address =
          routeFromMap && routeFromMap.long_name === 'Unnamed Road'
            ? ''
            : routeFromMap && routeFromMap.long_name
        const postCodeFromAddress =
          data.address_components &&
          data.address_components.find(x => x.types.includes('postal_code'))
        this.formValues.postal_code =
          (postCodeFromAddress && postCodeFromAddress.long_name) || ''
        this.formValues.latLng = {
          lat: data.geometry.location.lat(),
          lng: data.geometry.location.lng()
        }
        this.key.latLng += 1
      }
      this.key.address += 1
    },
    checkCity(data) {
      const city = this.cityList.find(x =>
        data.formatted_address.includes(x.name)
      )
      if (city) {
        this.formValues.city = city.id
        this.key.city += 1
        this.wait = true
      } else {
        this.showSnackbar('We do not provide service in this city.', 'danger')
        return false
      }
      return true
    },
    checkCountry(name) {
      if (name !== this.currentCountry) {
        this.showSnackbar(
          'The address you selected does not match the selected country. You have to select the address within the country specified.',
          'danger'
        )
        return false
      }
      return true
    },
    fetchSuccess() {
      const response = this.crudInfo.results.results[0]
      this.crudInfo.endpoint.update = `/api/v1/control-panel/${this.$route.params.slug}/address/${response.id}/`
      this.formValues.country = response.country.id
      this.countryAbbrevation =
        (response.country && response.country.abbreviation) || ''
      this.currentCountry = response.country.name
      this.formValues.city = response.city && response.city.id
      this.currentCity = response.city && response.city.name
      this.formValues.address = response.address
      this.formValues.postal_code = response.postal_code
      this.key.country += 1
      if (response.latitude && response.longitude) {
        this.formValues.latLng = {
          lat: response.latitude,
          lng: response.longitude
        }
        this.key.latLng += 1
      }
    },
    getFormValues() {
      const postData = this.formValues
      postData.latitude = this.formValues.latLng.lat
      postData.longitude = this.formValues.latLng.lng
      return postData
    },
    getReverseGeocodedData(data) {
      const country =
        data.address_components &&
        data.address_components.find(x => x.types.includes('country'))
      if (this.checkCountry(country && country.long_name)) {
        if (this.checkCity(data)) {
          const postCodeFromMap =
            data.address_components &&
            data.address_components.find(x => x.types.includes('postal_code'))
          this.formValues.postal_code =
            (postCodeFromMap && postCodeFromMap.long_name) || ''
          this.formValues.latLng = {
            lat: data.geometry.location.lat,
            lng: data.geometry.location.lng
          }
          const routeFromMap =
            data.address_components &&
            data.address_components.find(x => x.types.includes('route'))
          this.formValues.address =
            routeFromMap && routeFromMap.long_name === 'Unnamed Road'
              ? ''
              : routeFromMap && routeFromMap.long_name
          this.key.address += 1
        }
      }
    }
  }
}
</script>
<style scoped>
.z-index-0 {
  z-index: 0;
}
</style>
