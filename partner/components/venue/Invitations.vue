<template>
  <b-row align-h="center" align-v="center">
    <b-col md="11" cols="12" class="pb-2 pb-lg-0">
      <div class="font-weight-bold">
        <h3>Associated Venues and Invitations</h3>
      </div>
      <div class="text-secondary small">
        Following venues have requested to add you to their staff list. Accept
        to join the venue.
      </div>
    </b-col>
    <b-col md="11" cols="12" class="py-2 pb-lg-0">
      <div v-if="crudInfo.results.length > 0">
        <b-list-group v-for="(item, index) in crudInfo.results" :key="index">
          <b-list-group-item
            class="d-flex justify-content-between pointer align-items-center"
          >
            <div>{{ item.venue__name }}</div>
            <div class="text-right">
              <b-button
                size="md"
                variant="success"
                @click="acceptData(item.id)"
              >
                Accept
              </b-button>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
      <b-list-group-item v-else>
        You do not have any pending invitations.
      </b-list-group-item>
    </b-col>
  </b-row>
</template>
<script>
import { retrieveMixin, createMixin } from '@/mixins/FormMixins'
export default {
  mixins: [retrieveMixin, createMixin],
  middleware: 'auth',
  props: {
    refreshWindow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      crudInfo: {
        autoFetch: true,
        offValidation: true,
        results: [],
        endpoint: {
          get: `api/v1/control-panel/invitations/`,
          create: 'api/v1/control-panel/accept/'
        }
      }
    }
  },
  methods: {
    acceptData(id) {
      this.formValues.id = id
      this.addData()
    },
    createSuccess() {
      this.getData()
      if (this.refreshWindow) {
        this.reload()
      }
    },
    reload() {
      window.location.reload()
    }
  }
}
</script>
