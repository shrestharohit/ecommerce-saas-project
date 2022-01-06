<template>
  <client-only>
    <div class="overflow-hidden">
      <b-row class="p-3">
        <b-col cols="12" md="4">
          <b-card class="height-35">
            <b-card-text class="text-center pt-3">
              <b-row>
                <b-col cols="12" class="pb-4">
                  <b-avatar
                    variant="light"
                    :text="
                      actionData.full_name ? actionData.full_name.charAt(0) : ''
                    "
                    size="8rem"
                  ></b-avatar>
                </b-col>
                <b-col cols="12">
                  <h2>
                    <strong>{{ actionData.full_name }}</strong>
                  </h2>
                </b-col>
                <b-col cols="12" class="pb-4">
                  <b-badge v-if="actionData.is_blocked" pill variant="danger">
                    Blocked
                  </b-badge>
                  <b-badge
                    v-if="!actionData.has_been_before && !actionData.is_blocked"
                    pill
                    variant="info"
                  >
                    New Client
                  </b-badge>
                </b-col>
                <b-col
                  v-if="
                    getSwitchedVenue &&
                    advancedUsers.includes(getSwitchedVenue.role)
                  "
                  cols="3"
                  class="pb-2 pr-1"
                >
                  <b-dropdown variant="outline-secondary" block>
                    <b-dropdown-item
                      @click="
                        $router.push({
                          name: 'admin-slug-client-id-edit',
                          params: {
                            id: $route.params.id,
                            slug: $route.params.slug
                          }
                        })
                      "
                    >
                      Edit
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="!actionData.is_blocked"
                      @click="showConfirmDialog('Block')"
                    >
                      Block
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="actionData.is_blocked"
                      @click="showConfirmDialog('Unblock')"
                    >
                      Unblock
                    </b-dropdown-item>
                    <b-dropdown-item @click="showConfirmDialog('Delete')">
                      Delete
                    </b-dropdown-item>
                  </b-dropdown>
                </b-col>
                <b-col
                  :cols="
                    getSwitchedVenue &&
                    advancedUsers.includes(getSwitchedVenue.role)
                      ? '9'
                      : '12'
                  "
                  class="pb-2 pl-1"
                >
                  <b-button
                    v-if="
                      getSwitchedVenue &&
                      ['Individual', 'Reception', 'Owner'].includes(
                        getSwitchedVenue.role
                      )
                    "
                    block
                    variant="accent3-800"
                  >
                    New Appointment
                  </b-button>
                </b-col>
              </b-row>
            </b-card-text>
            <b-card-footer class="scroll">
              <b-row
                v-for="(item, index) in clientInfo"
                :key="index"
                class="pb-3"
              >
                <b-col cols="12">
                  <div class="text-muted">{{ item.title }}</div>
                </b-col>
                <b-col cols="12">
                  <div>{{ item.value || 'N/A' }}</div>
                </b-col>
              </b-row>
            </b-card-footer>
          </b-card>
        </b-col>
        <b-col cols="12" md="8">
          <b-row>
            <b-col cols="12" md="12" class="pb-3 pt-3 pt-lg-0">
              <b-card class="text-center height-12">
                <b-row>
                  <b-col md="6" cols="6">
                    <b-row>
                      <b-col cols="12">
                        <h4><strong>$0</strong></h4>
                      </b-col>
                      <b-col cols="12">
                        <div class="text-muted">Total Sales</div>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col md="6" cols="6">
                    <b-row>
                      <b-col cols="12">
                        <h4><strong>$0</strong></h4>
                      </b-col>
                      <b-col cols="12">
                        <div class="text-muted">Outstanding</div>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <hr />
                <b-row>
                  <b-col
                    v-for="(item, index) in [
                      'All bookings',
                      'Completed',
                      'Cancelled',
                      'No Shows'
                    ]"
                    :key="index"
                    md="3"
                    cols="6"
                  >
                    <b-row class="pb-3">
                      <b-col cols="12">
                        <h4><strong>0</strong></h4>
                      </b-col>
                      <b-col cols="12">
                        <div class="text-muted">{{ item }}</div>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="12">
              <b-card no-body class="overflow-auto height-22">
                <b-tabs
                  content-class="pt-3"
                  card
                  lazy
                  nav-wrapper-class="sticky-top pt-2 bg-white pt-0"
                  active-nav-item-class="font-weight-bold text-accent3-600"
                >
                  <b-tab title="Appointments" title-link-class="tab">
                    <no-data
                      height="200px"
                      text="No Appointments"
                      svg
                    ></no-data>
                  </b-tab>
                  <b-tab title="Consultation forms" title-link-class="tab">
                    <no-data
                      height="200px"
                      text="No Consulations"
                      svg
                    ></no-data>
                  </b-tab>
                  <b-tab title="Products" title-link-class="tab">
                    <no-data height="200px" text="No Products" svg></no-data>
                  </b-tab>
                  <b-tab title="Invoices" title-link-class="tab">
                    <no-data height="200px" text="No Invoices" svg></no-data>
                  </b-tab>
                </b-tabs>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </client-only>
</template>
<script>
import NoData from '@/components/common/NoData'
import { retrieveMixin, deleteMixin, updateMixin } from '@/mixins/FormMixins'
import clientApi from '@/api/client.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    NoData
  },
  mixins: [retrieveMixin, deleteMixin, updateMixin],
  data() {
    return {
      clientInfo: [],
      actionData: {},
      advancedUsers: ['Reception', 'Owner'],
      crudInfo: {
        name: 'Client',
        offValidation: true,
        endpoint: {
          get: clientApi.getClientDetails(
            this.$route.params.id,
            this.$route.params.slug
          ),
          delete: clientApi.deleteClient(
            this.$route.params.id,
            this.$route.params.slug
          ),
          update: ''
        },
        results: [],
        autoFetch: true
      }
    }
  },
  computed: {
    ...mapGetters({
      getSwitchedVenue: 'venue/getSwitchedVenue'
    })
  },
  methods: {
    fetchSuccess() {
      this.actionData = this.crudInfo.results
      this.clientInfo = [
        {
          title: 'Phone Number',
          value: this.actionData.phone_number
        },
        { title: 'Email', value: this.actionData.email },
        {
          title: 'Notification Preference',
          value: this.actionData.notification_preferences
        },
        {
          title: 'Gender',
          value: this.actionData.gender
        },
        {
          title: 'Birthday',
          value:
            this.actionData.birthday &&
            this.actionData.birthday.substring(0, 10)
        },
        {
          title: 'Referral Source',
          value: this.actionData.referral_source
        },
        {
          title: 'Notes',
          value: this.actionData.notes
        }
      ]
    },
    deleteSuccess() {
      this.$router.push({
        name: 'admin-slug-client',
        params: {
          slug: this.$route.params.slug
        }
      })
    },
    updateSuccess() {
      this.getData()
    },
    showConfirmDialog(type) {
      this.$bvModal
        .msgBoxConfirm(
          `Please confirm that you want to ${type.toLowerCase()} this client?`,
          {
            title: `Confirm ${type}`,
            size: 'md',
            buttonSize: 'md',
            okVariant: 'danger',
            okTitle: type,
            cancelTitle: 'Cancel',
            hideHeaderClose: false,
            centered: true
          }
        )
        .then(value => {
          if (value) {
            if (type === 'Delete') return this.deleteInfo()
            if (type === 'Block') {
              this.crudInfo.endpoint.update = clientApi.blockClient(
                this.$route.params.id,
                this.$route.params.slug
              )
              this.updateData()
            }
            if (type === 'Unblock') {
              this.crudInfo.endpoint.update = clientApi.unblockClient(
                this.$route.params.id,
                this.$route.params.slug
              )
              this.updateData()
            }
          }
        })
    }
  }
}
</script>
<style scoped>
.scroll {
  max-height: 13rem;
  overflow-y: auto;
}

.tab {
  color: rgb(95, 95, 95);
}
::-webkit-scrollbar {
  width: 4px;
  background: rgb(214, 213, 216);
}
@media only screen and (min-width: 992px) {
  .height-35 {
    height: 35rem;
  }
  .height-12 {
    height: 12rem;
  }
  .height-22 {
    height: 22rem;
  }
}
</style>
