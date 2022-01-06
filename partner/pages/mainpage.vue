<template>
  <div class="vh-100 bg-light">
    <div class="bg-white sticky z-index-1000 border-bottom">
      <b-navbar>
        <b-navbar-brand class="title"> Venue </b-navbar-brand>
        <b-nav class="ml-auto">
          <b-dropdown
            id="dropdown-right"
            right
            text="Right align"
            variant="outline-white"
            no-caret
          >
            <template #button-content>
              <b-avatar
                v-b-tooltip.hover.left
                variant="accent1-600"
                class="pointer"
                :title="loggedInUser ? loggedInUser.full_name : ''"
                :text="loggedInUser ? loggedInUser.full_name[0] : ''"
              ></b-avatar>
            </template>
            <b-dropdown-item @click="logout()"> Logout </b-dropdown-item>
          </b-dropdown>
        </b-nav>
      </b-navbar>
    </div>
    <div class="bg-light">
      <div class="container-fluid pt-3">
        <invitations class="mb-4" refresh-window></invitations>
        <b-row align-h="center" align-v="center">
          <b-col md="11" cols="12" class="pb-2 pb-lg-0">
            <div class="text-secondary small">
              You are associated with following venues. Click on the venue to
              switch active venue.
            </div>
          </b-col>
          <b-col md="11" cols="12" class="pt-4">
            <b-row>
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
    </div>
  </div>
</template>

<script>
import PlusSvg from '@/helpers/icons/plus.svg?inline'
import CreateVenue from '@/components/venue/CreateVenue.vue'
import Invitations from '@/components/venue/Invitations'
import { mapGetters } from 'vuex'

export default {
  components: {
    PlusSvg,
    CreateVenue,
    Invitations
  },
  layout: 'empty',
  middleware: 'auth',
  data() {
    return {
      displayForm: false
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser'
    })
  },
  methods: {
    logout() {
      this.$auth.logout()
      localStorage.clear()
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
.title {
  font-size: 25px;
  font-weight: bolder;
}
</style>
