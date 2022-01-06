<template>
  <div v-if="fetchedData" class="container">
    <b-row class="pt-4 pb-2">
      <b-col md="6">
        <h1 class="font-weight-bold text-left">
          {{ fetchedData.name }}
        </h1>
      </b-col>
      <b-col md="6" class="text-right">
        <b-button variant="primary1-700" class="my-2"> Book Now </b-button>
        <b-button variant="light" class="my-2"> Reviews </b-button>
        <b-button variant="light" class="my-2"> About </b-button>
      </b-col>
    </b-row>
    <vue-carousel :action-data="fetchedData.images"></vue-carousel>
    <h6 class="pt-4 font-weight-bold text-secondary">
      {{
        fetchedData.venue_address &&
        fetchedData.venue_address[0] &&
        fetchedData.venue_address[0].full_address
      }}
    </h6>
    <div class="py-4 my-4">
      <h4 class="text-accent3-700 font-weight-bold">Services Section</h4>
      <div v-for="types in treatmentTypes" :key="types.slug">
        <div @click="selectedTreatmentType = types.slug">{{ types.name }}</div>
      </div>
      <div>
        <b-row>
          <b-col md="12">
            <div
              v-for="(items, index) in filteredServices(selectedTreatmentType)"
              :key="index"
            >
              {{ items.title }}
              <div v-for="item in items.service_pricing_options" :key="item.id">
                <b-button
                  v-if="
                    !$store.getters['shoppingCart/isShortlistedService'](
                      item.id
                    )
                  "
                  @click="shortlistServicePackage(item)"
                >
                  Select
                </b-button>
                <b-button v-else @click="removeShortlistedServicePackage(item)">
                  Selected
                </b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="py-4 my-4">
      <h4 class="text-accent3-700 font-weight-bold">Teams Section</h4>
      <b-row class="pt-4">
        <b-col
          v-for="item in fetchedData.venue_employees || []"
          :key="item.id"
          md="4"
        >
          <b-row>
            <b-col md="auto">
              <b-avatar
                variant="accent2-200"
                :src="item.profile_picture || ''"
                :text="
                  !item.profile_picture && item.full_name
                    ? item.full_name.charAt(0)
                    : ''
                "
                size="5em"
              ></b-avatar>
            </b-col>
            <b-col md="7" class="pt-3">
              <div class="font-weight-bold">{{ item.full_name }}</div>
              <div class="text-secondary">{{ item.title || '' }}</div></b-col
            >
          </b-row>
        </b-col>
      </b-row>
    </div>
    <div class="py-2 my-2">
      <h4 class="text-accent3-700 font-weight-bold">About</h4>
      <GmapMap
        ref="mapRef"
        :center="center"
        :zoom="zoom"
        :map-style-id="mapStyle"
        :options="options"
        class="map-width map-height"
      >
        <GmapMarker :position="marker" />
      </GmapMap>
      <b-row class="pt-4">
        <b-col md="9">
          <div class="font-weight-bold text-secondary pb-2">Description</div>
          <div>
            {{ fetchedData.description }}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            architecto quae tempore nisi blanditiis explicabo, sit ducimus
            veritatis accusantium minus, consequatur, fuga consequuntur sunt!
            Alias beatae ab corporis eligendi temporibus? Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Iste voluptatibus magnam magni,
            esse quia nemo, quidem omnis tenetur in enim modi. Dolores cum
            consequatur doloremque dicta culpa earum sit minus? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Et voluptatibus dolorem
            debitis saepe dolores soluta ad laborum, quam esse expedita
            voluptatum odit sunt a ducimus, voluptatem illo asperiores iste!
            Omnis.
          </div>
        </b-col>
        <b-col md="3">
          <div class="font-weight-bold text-secondary pb-2">Opening Hours</div>
          <div
            v-for="(item, index) in fetchedData.venue_opening_hours || []"
            :key="index"
          >
            <b-row>
              <b-col md="4"> {{ item.weekday }}</b-col>
              <b-col md="8" class="text-right"
                >{{ item.start_time }} - {{ item.end_time }}</b-col
              >
            </b-row>
          </div>
        </b-col>
      </b-row>
    </div>
    <div class="py-4 my-4">
      <h4 class="text-accent3-700 font-weight-bold">Similar Venues</h4>
      <div
        class="text-primary text-right pointer"
        @click="redirectToListPage()"
      >
        See More
      </div>
      <b-row>
        <b-col v-for="item in similarVenues" :key="item.slug" md="4">
          <similar-venues-card :action-data="item"></similar-venues-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import VueCarousel from '@/components/common/VueCarousel'
import SimilarVenuesCard from '@/components/venue/SimilarVenuesCard'
export default {
  components: { VueCarousel, SimilarVenuesCard },
  data() {
    return {
      fetchedData: {},
      marker: { lat: 10, lng: 10 },
      center: { lat: 10, lng: 10 },
      zoom: 15,
      mapStyle: 'terrain',
      options: { disableDefaultUI: false },
      similarVenues: [],
      selectedTreatmentType: ''
    }
  },
  computed: {
    treatmentTypes() {
      const data = this.fetchedData.services.map(x => x.treatment_type)
      data.unshift({ slug: '', title: 'All' })
      return data
    },
    filteredServices(type) {
      return this.fetchedData.services.filter(
        x => x.treatment_type.slug === type
      )
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const endpoint = `api/v1/venue/${this.$route.params.slug}`
      this.$axios.get(endpoint).then(response => {
        this.fetchedData = response.data
        const latitude =
          this.fetchedData.venue_address &&
          this.fetchedData.venue_address[0] &&
          this.fetchedData.venue_address[0].latitude
        const longitude =
          this.fetchedData.venue_address &&
          this.fetchedData.venue_address[0] &&
          this.fetchedData.venue_address[0].longitude
        this.marker = { lat: latitude, lng: longitude }
        this.center = { lat: latitude, lng: longitude }
        this.getSimilarVenues()
      })
    },
    getSimilarVenues() {
      this.$axios.get(`api/v1/venue/`).then(response => {
        this.similarVenues = response.data.results
        if (this.similarVenues.length > 2) {
          this.similarVenues = this.similarVenues.splice(0, 2)
        }
      })
    },
    redirectToListPage() {
      this.$router.push({
        name: 'venue'
      })
    },
    shortlistServicePackage(item) {
      this.$store.dispatch('shoppingCart/addToEmployerJobseekerShortlist', item)
    },
    removeShortlistedServicePackage(item) {
      this.$store.dispatch(
        'shoppingCart/removeFromEmployerJobseekerShortlist',
        item
      )
    }
  }
}
</script>
<style scoped>
.map-width {
  width: 100%;
}
.map-height {
  height: 40vh;
}
</style>
