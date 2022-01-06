<template>
  <div
    class="bg-image"
    style="
      background-image: url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg');
      height: auto;
      background-size: cover;
    "
  >
    <div class="container">
      <b-row class="py-4 justify-content-center">
        <b-col md="5">
          <b-card class="shadow">
            <div class="card-text">
              <validation-observer ref="observer">
                <b-form @submit.prevent="submit">
                  <b-form-input
                    v-model="filter.venue_name"
                    placeholder="Search by Venue Name"
                    type="text"
                    class="my-2"
                  />
                  <auto-complete
                    v-model="filter.treatment_type"
                    :endpoint="endpoint.treatment_type"
                    value-field="id"
                    text-field="title"
                    label="Search by treatment type"
                    class="my-2"
                  />
                  <auto-complete
                    v-model="filter.city"
                    :endpoint="endpoint.city"
                    value-field="id"
                    text-field="name"
                    label="Search by city"
                    class="my-2"
                  />
                  <b-button
                    type="submit"
                    block
                    variant="primary1-700"
                    class="my-2"
                  >
                    Search
                  </b-button>
                </b-form>
              </validation-observer>
            </div>
          </b-card>
        </b-col>
        <b-col md="1"></b-col>
        <b-col md="5" align="center">
          <h1 class="text-white mt-5">Behind Every Appointment</h1>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import AutoComplete from '@/components/common/AutoComplete'
export default {
  components: {
    AutoComplete
  },
  data() {
    return {
      filter: {
        treatment_type: this.$route.query.treatment_type || '',
        venue_name: this.$route.query.venue_name || '',
        city: this.$route.query.city || ''
      },
      endpoint: {
        city: 'api/v1/common/city/',
        treatment_type: 'api/v1/service/treatment-type/'
      }
    }
  },
  methods: {
    submit() {
      this.$router.push({
        name: 'venue',
        query: {
          treatment_type: this.filter.treatment_type,
          venue_name: this.filter.venue_name,
          city: this.filter.city
        }
      })
    }
  }
}
</script>
