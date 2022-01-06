<template>
  <div>
    <search-section></search-section>
    <div v-if="fetchedData && fetchedData.length" class="container">
      <b-row class="justify-content-center pb-2">
        <b-col md="11" align="right" class="mt-2">
          <b-row>
            <b-col>
              <b-form-checkbox
                v-model="showMap"
                name="check-button"
                class="text-secondary pt-1"
                switch
              >
                Show Map
              </b-form-checkbox>
            </b-col>
            <b-col md="auto">
              <b-dropdown
                id="dropdown-text"
                right
                text="Filter and Sort"
                variant="outline-primary"
                size="sm"
                style="z-index: 10"
              >
                <div style="width: 350px" class="px-2">
                  <div class="scroll px-1">
                    <div v-if="amenitiesList" class="text-accent3-900 pb-2">
                      Amenities
                    </div>
                    <b-form-checkbox-group v-model="filter.amenities" stacked>
                      <template v-for="item in amenitiesList">
                        <b-form-checkbox
                          :key="item.id"
                          :value="item.id"
                          class="py-1"
                        >
                          <div class="text-secondary small">
                            {{ item.name }}
                          </div>
                        </b-form-checkbox>
                      </template>
                    </b-form-checkbox-group>
                  </div>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-row>
                    <b-col align="right">
                      <b-button
                        variant="light"
                        size="sm"
                        @click="clearFilters()"
                      >
                        Clear All
                      </b-button>
                    </b-col>
                    <!-- <b-col align="right">
                      <b-button variant="primary" size="sm">
                        Show Results
                      </b-button>
                    </b-col> -->
                  </b-row>
                </div>
              </b-dropdown>
            </b-col>
          </b-row>
        </b-col>
        <b-col :md="showMap ? '5' : '11'">
          <template v-for="item in fetchedData">
            <venue-list
              :key="item.id"
              :map-view="showMap"
              :action-data="item"
              class="my-2 pointer"
              @open="redirectToVenueDetailPage($event)"
            ></venue-list>
          </template>
          <b-pagination
            v-model="pagination.currentPage"
            :current-page="pagination.currentPage"
            :per-page="pagination.perPage"
            :total-rows="totalCount"
            aria-controls="my-list"
            align="right"
            pills
            size="sm"
          ></b-pagination>
        </b-col>
        <b-col v-if="showMap" md="6">
          <map-component
            :value="fetchedData"
            class="my-2"
            @open="redirectToVenueDetailPage($event)"
          ></map-component>
        </b-col>
      </b-row>
    </div>
    <div v-else class="container">
      <no-data
        :loading="loading"
        height="200px"
        text="No Data Found"
        svg
      ></no-data>
    </div>
  </div>
</template>
<script>
import SearchSection from '@/components/venue/SearchComponent'
import VenueList from '@/components/venue/List'
import DataTableMixin from '@/mixins/DataTableMixin'
import MapComponent from '@/components/common/GoogleMapsComponent'
import NoData from '@/components/common/NoData'
export default {
  components: {
    SearchSection,
    VenueList,
    MapComponent,
    NoData
  },
  mixins: [DataTableMixin],
  middleware: 'anonymous',
  data() {
    return {
      showMap: true,
      filter: {
        amenites: []
      },
      amenitiesList: [],
      pagination: {
        perPage: 10,
        currentPage: 1
      },
      endpoint: '/api/v1/venue/'
    }
  },
  computed: {
    DataTableFilter() {
      return {
        amenites: this.filter.amenities,
        treatment_type: this.$route.query.treatment_type || '',
        search: this.$route.query.venue_name || '',
        city: this.$route.query.city || '',
        limit: this.pagination.perPage,
        offset: (this.pagination.currentPage - 1) * this.pagination.perPage,
        ordering: 'created_at'
      }
    }
  },
  created() {
    this.getAmenities()
  },
  methods: {
    redirectToVenueDetailPage(item) {
      this.$router.push({ name: 'venue-slug', params: { slug: item } })
    },
    getAmenities() {
      this.$axios.get('api/v1/venue/amenity/').then(response => {
        this.amenitiesList = response.results
      })
    },
    clearFilters() {
      this.filter = {
        amenities: []
      }
    }
  }
}
</script>
<style scoped>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.scroll {
  max-height: 50vh;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
</style>
