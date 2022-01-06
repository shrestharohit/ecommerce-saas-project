<template>
  <div>
    <b-row align-h="center" align-v="center">
      <b-col md="10">
        <b-row>
          <b-col v-if="mobile" class="pb-3">
            <b-button
              v-if="
                getSwitchedVenue && ['Owner'].includes(getSwitchedVenue.role)
              "
              variant="accent3-800"
              block
              @click="
                $router.push({
                  name: 'admin-slug-staff-add',
                  params: {
                    slug: $route.params.slug
                  }
                })
              "
            >
              Add New Staff
            </b-button>
          </b-col>
          <b-col md="auto" align="left" class="pb-3">
            <b-form-input v-model="search" placeholder="Search"></b-form-input>
          </b-col>
          <b-col v-if="!mobile" align="right" class="pb-3">
            <b-button
              v-if="
                getSwitchedVenue && ['Owner'].includes(getSwitchedVenue.role)
              "
              variant="accent3-800"
              @click="
                $router.push({
                  name: 'admin-slug-staff-add',
                  params: {
                    slug: $route.params.slug
                  }
                })
              "
            >
              Add New Staff
            </b-button>
          </b-col>
        </b-row>
        <b-row v-if="!fetchedData.length && !loading" class="pt-5 mt-5">
          <b-col cols="12" md="12">
            <div class="text-center has-text-weight-bold text-secondary">
              <div v-text="'No Data found. Search Another Staff.'"></div>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="!loading" class="pb-4">
          <b-col
            v-for="(item, index) in fetchedData || []"
            id="my-list"
            :key="index"
            md="12"
            class="py-1 px-3"
          >
            <b-card class="pointer shadow" @click="EditStaff(item)">
              <b-card-text>
                <div class="row text-center text-lg-left">
                  <div class="col-lg-1">
                    <b-avatar
                      variant="accent2-200"
                      :src="item.profile_picture || ''"
                      :text="
                        !item.profile_picture && item.full_name
                          ? item.full_name.charAt(0)
                          : ''
                      "
                      size="3rem"
                      class="shadow-sm"
                    ></b-avatar>
                  </div>
                  <div class="col-lg-4">
                    <h5 class="font-weight-bold">
                      {{ item.full_name }}
                    </h5>
                    <div class="text-secondary">
                      {{ item.title || 'N/A' }}
                    </div>
                  </div>
                  <div class="col-lg-5 text-secondary">
                    <div>
                      {{ item.email || 'N/A' }}
                    </div>
                    <div>
                      {{ item.phone_number || '' }}
                    </div>
                  </div>
                  <div class="col-lg-2 text-secondary">
                    {{ item.access_type }}
                  </div>
                </div>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <b-row v-else class="pt-5 mt-5">
          <b-col cols="12" md="12">
            <div class="text-center has-text-weight-bold text-secondary">
              <img src="/misc/three-dots.svg" class="is-96x96" />
              <div v-text="'Please wait. Loading data ...'"></div>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row
      v-if="totalCount > 5 && !loading"
      class="footer fixed-bottom g-0 bg-white"
    >
      <b-col cols="12" md="12" class="text-right pr-5 pt-1">
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
    </b-row>
  </div>
</template>
<script>
import DataTableMixin from '@/mixins/DataTableMixin'
import employeeApi from '@/api/staff'
import { mapGetters } from 'vuex'
export default {
  mixins: [DataTableMixin],
  data() {
    return {
      search: '',
      mobile: false,
      endpoint: employeeApi.getEmployee(this.$route.params.slug)
    }
  },
  computed: {
    DataTableFilter() {
      return {
        search: this.search,
        limit: this.pagination.perPage,
        offset: (this.pagination.currentPage - 1) * this.pagination.perPage,
        ordering: 'created_at'
      }
    },
    ...mapGetters({
      getSwitchedVenue: 'venue/getSwitchedVenue'
    })
  },
  mounted() {
    window.addEventListener('resize', e => {
      this.setScreenSize(e.target.innerWidth)
    })
    this.setScreenSize(window.innerWidth)
  },
  methods: {
    EditStaff(item) {
      if (
        this.getSwitchedVenue &&
        ['Owner'].includes(this.getSwitchedVenue.role)
      ) {
        this.$router.push({
          name: 'admin-slug-staff-id-edit',
          params: {
            id: item.id,
            slug: this.$route.params.slug
          }
        })
      }
    },
    setScreenSize(size) {
      this.mobile = size < 500
    }
  }
}
</script>
<style scoped>
.footer {
  z-index: 0;
}
</style>
