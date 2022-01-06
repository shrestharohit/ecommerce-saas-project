<template>
  <div class="vh-100 bg-light">
    <div
      class="bg-white sticky z-index-1000"
      :class="noBorderBottom ? '' : 'border-bottom'"
    >
      <b-navbar toggleable="lg">
        <b-navbar-brand class="title">
          {{ title }}
        </b-navbar-brand>
        <b-navbar-toggle
          target="nav-collapse"
          @click="triggerSidebarInSmallScreen()"
        ></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-nav class="ml-auto">
            <b-dropdown
              :text="getSwitchedVenue && getSwitchedVenue.name"
              variant="outline-accent3-800"
              class="m-2"
            >
              <template v-for="(item, index) in getSwitchableVenues">
                <b-dropdown-item :key="index" @click="selectVenue(item)">
                  <div>{{ item.name }}</div>
                  <div class="text-secondary">
                    <small>
                      {{
                        (item.address &&
                          item.address.city &&
                          item.address.city.name) ||
                        'N/A'
                      }}
                    </small>
                  </div>
                </b-dropdown-item>
              </template>
              <b-dropdown-item @click="displayForm = true">
                Add New Venue
              </b-dropdown-item>
            </b-dropdown>
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
        </b-collapse>
      </b-navbar>
      <slot name="tabs"></slot>
    </div>
    <div class="bg-light">
      <slot></slot>
    </div>
    <b-row class="footer fixed-bottom g-0 bg-white">
      <b-col cols="12" md="12" class="text-right">
        <slot name="actions"></slot>
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
</template>
<script>
import CreateVenue from '@/components/venue/CreateVenue.vue'
import veeValidate from '@/mixins/veeValidate'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { CreateVenue },
  mixins: [veeValidate],
  props: {
    title: {
      type: String,
      required: true
    },
    noBorderBottom: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      displayForm: false,
      trigger: true
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      getSwitchedVenue: 'venue/getSwitchedVenue',
      getSwitchableVenues: 'venue/getSwitchableVenues'
    })
  },
  methods: {
    triggerSidebarInSmallScreen() {
      this.trigger = !this.trigger
      this.setKey(this.trigger)
    },
    ...mapMutations({
      setKey: 'common/setKey',
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
    },
    logout() {
      this.$auth.logout()
      localStorage.clear()
    }
  }
}
</script>
<style scoped>
.title {
  font-size: 25px;
  font-weight: bolder;
}
.footer {
  z-index: 0;
}
</style>
