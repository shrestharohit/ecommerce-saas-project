<template>
  <page-wrapper :title="'Venue'">
    <div class="container-fluid pt-3">
      <invitations class="mb-4"></invitations>
      <b-row align-h="center" align-v="center">
        <b-col md="11" cols="12" class="pb-2 pb-lg-0">
          <div class="text-secondary small">
            You are associated with following venues. Click on the venue to
            switch active venue.
          </div>
        </b-col>
        <b-col md="11" cols="12" class="pt-4">
          <b-row>
            <b-col
              v-for="(item, index) in crudInfo.results.results || []"
              :key="index"
              md="12"
              class="pb-3"
            >
              <b-card
                :class="item.slug === selectedVenueSlug ? 'border-info' : ''"
                class="pointer shadow"
                no-body
              >
                <b-row class="p-2">
                  <b-col md="2" cols="12">
                    <img
                      :src="item.display_picture || '/default.png'"
                      alt="card_image"
                      width="100%"
                      height="100%"
                    />
                  </b-col>
                  <b-col
                    md="10"
                    cols="12"
                    class="pt-1"
                    @click="
                      item.slug !== selectedVenueSlug ? selectVenue(item) : ''
                    "
                  >
                    <div class="font-weight-bold">
                      <h3>{{ item.name }}</h3>
                    </div>
                    <div class="text-secondary">
                      {{ (item.address && item.address.address) || 'N/A' }}
                    </div>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
            <b-col md="12" class="pb-3">
              <b-card
                class="text-center pointer shadow px-3"
                @click="displayForm = true"
              >
                <div class="p-0 card-text">
                  <div class="font-weight-bold text-secondary">
                    Add New Venue
                  </div>
                  <plus-svg class="svg"></plus-svg>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-modal
        v-model="displayForm"
        centered
        :title="`Add New Venue`"
        hide-footer
        no-close-on-backdrop
      >
        <create-venue
          v-if="displayForm"
          @close="displayForm = false"
        ></create-venue>
      </b-modal>
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/common/PageWrapper'
import PlusSvg from '@/helpers/icons/plus.svg?inline'
import CreateVenue from '@/components/venue/CreateVenue.vue'
import { retrieveMixin, deleteMixin } from '@/mixins/FormMixins.js'
import commonApi from '@/api/common.js'
import { mapMutations } from 'vuex'
import Invitations from '@/components/venue/Invitations'

export default {
  components: {
    PageWrapper,
    PlusSvg,
    CreateVenue,
    Invitations
  },
  mixins: [retrieveMixin, deleteMixin],
  middleware: 'auth',
  data() {
    return {
      displayForm: false,
      selectedVenueSlug: this.$route.params.slug,
      crudInfo: {
        name: 'Venue',
        endpoint: {
          get: commonApi.getVenue()
        },
        results: [],
        autoFetch: true
      }
    }
  },
  methods: {
    ...mapMutations({
      setSwitchedVenue: 'venue/setSwitchedVenue'
    }),
    selectVenue(venue) {
      this.$bvModal
        .msgBoxConfirm(`Are you sure that you want to switch to this venue?`, {
          title: `Switch Venue`,
          size: 'md',
          buttonSize: 'md',
          okVariant: 'success',
          okTitle: 'Switch Venue',
          cancelTitle: 'Cancel',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.setSwitchedVenue(venue)
            this.showSnackbar('Successfully Switched Venue', 'success')
            this.$router.push({
              name: 'admin-slug-dashboard',
              params: { slug: venue.slug }
            })
          }
        })
    }
  }
}
</script>
<style scoped>
.svg {
  height: 16px;
  width: 16px;
  fill: rgb(80, 94, 128);
}
</style>
