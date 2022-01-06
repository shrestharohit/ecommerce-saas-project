<template>
  <validation-observer ref="observer">
    <b-form>
      <b-row align-v="center">
        <b-col cols="12" md="12">
          <validation-provider v-slot="{ errors }" rules="required" name="Name">
            <b-form-group class="small" label="Name">
              <b-form-input
                v-model="formValues.name"
                placeholder="Enter Name"
                :state="errors[0] || fieldErrors.name ? false : null"
                autocomplete="on"
                type="text"
              />
              <b-form-invalid-feedback>
                {{ errors[0] || fieldErrors.name }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col cols="12" md="12">
          <validation-provider v-slot="{ errors }" rules="" name="Country">
            <b-form-group class="small" label="Country">
              <auto-complete
                v-model="formValues.address.country"
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
          <validation-provider v-slot="{ errors }" rules="" name="Description">
            <b-form-group class="small" label="Description">
              <b-form-input
                v-model="formValues.description"
                placeholder="Enter Description"
                :state="errors[0] || fieldErrors.description ? false : null"
                autocomplete="on"
                type="text"
              />
              <b-form-invalid-feedback>
                {{ errors[0] || fieldErrors.description }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right">
          <b-button size="md" variant="light" @click="clearData()">
            Clear
          </b-button>
          <b-button size="md" variant="accent3-800" @click="addData()">
            Save
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>
<script>
import AutoComplete from '@/components/common/AutoComplete'
import { createMixin } from '@/mixins/FormMixins'
import commonApi from '@/api/common'
import { mapMutations } from 'vuex'
export default {
  components: {
    AutoComplete
  },
  mixins: [createMixin],
  props: {
    refreshWindow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formValues: {
        address: {}
      },
      countryEndpoint: commonApi.getCountry(),
      crudInfo: {
        name: 'Venue',
        endpoint: {
          create: `/api/v1/control-panel/venue/`
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      setSwitchedVenue: 'venue/setSwitchedVenue',
      setSwitchableVenues: 'venue/setSwitchableVenues'
    }),
    clearData() {
      this.resetAllFields()
      this.formValues = {
        address: {}
      }
    },
    createSuccess(data) {
      if (!this.refreshWindow) {
        const endpoint = commonApi.getVenue()
        this.$axios.get(endpoint).then(response => {
          this.setSwitchableVenues(response.data.results)
          const venue = response.data.results.find(x => x.slug === data.slug)
          this.setSwitchedVenue(venue)
          this.$router.push({
            name: 'admin-slug-settings-location-settings',
            params: { slug: data.slug }
          })
        })
      } else {
        this.reload()
      }
    },
    reload() {
      window.location.reload()
    }
  }
}
</script>
