<template>
  <page-wrapper :title="title">
    <div class="overflow-hidden">
      <b-row class="p-4 overflow-hidden">
        <b-col v-if="mobile" class="pb-3">
          <b-button
            v-if="
              getSwitchedVenue && advancedUsers.includes(getSwitchedVenue.role)
            "
            variant="accent3-800"
            block
            @click="
              $router.push({
                name: 'admin-slug-client-add',
                params: { slug: $route.params.slug }
              })
            "
          >
            New Client
          </b-button>
        </b-col>
        <b-col md="3" align="left" class="pb-3">
          <b-form-input
            v-model="search"
            placeholder="Search by Name, Email or Phone"
          ></b-form-input>
        </b-col>
        <b-col v-if="!mobile" align="right" class="pb-3">
          <b-button
            v-if="
              getSwitchedVenue && advancedUsers.includes(getSwitchedVenue.role)
            "
            variant="accent3-800"
            @click="
              $router.push({
                name: 'admin-slug-client-add',
                params: { slug: $route.params.slug }
              })
            "
          >
            New Client
          </b-button>
        </b-col>
        <b-col md="12" cols="12">
          <b-table
            id="my-table"
            :items="fetchedData"
            :fields="tableHeader"
            :per-page="pagination.perPage"
            :busy="loading"
            class="bg-white"
            outlined
            responsive
            show-empty
          >
            <template #head="data">
              <span v-text="data.field.label"></span>
            </template>
            <template #cell(full_nameid)="data">
              <div
                class="pointer"
                @click="
                  $router.push({
                    name: 'admin-slug-client-id-view',
                    params: { id: data.item.id, slug: $route.params.slug }
                  })
                "
              >
                <a class="font-weight-bold">
                  {{ data.item.full_name }}
                </a>
              </div>
            </template>
            <template #cell(phone_number)="data">
              <div>
                {{ data.value || 'N/A' }}
              </div>
            </template>
            <template #cell(gender)="data">
              <div>
                {{ data.value }}
              </div>
            </template>
            <template #cell(is_blocked)="data">
              <b-badge
                pill
                :variant="colorMapper[`${data.value ? 'Blocked' : 'Active'}`]"
              >
                {{ data.value ? 'Blocked' : 'Active' }}
              </b-badge>
            </template>
            <template #cell(email)="data">
              <div>
                {{ data.value || 'N/A' }}
              </div>
            </template>
            <template v-if="totalCount > pagination.perPage" #table-caption>
              <b-pagination
                v-model="pagination.currentPage"
                :current-page="pagination.currentPage"
                :per-page="pagination.perPage"
                :total-rows="totalCount"
                aria-controls="my-table"
                align="right"
                pills
                size="sm"
              ></b-pagination>
            </template>
            <template #empty>
              <no-data></no-data>
            </template>
            <template #table-busy>
              <no-data loading></no-data>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/common/PageWrapper'
import DataTableMixin from '@/mixins/DataTableMixin'
import NoData from '@/components/common/NoData'
import clientApi from '@/api/client'
import { mapGetters } from 'vuex'
export default {
  components: {
    PageWrapper,
    NoData
  },
  mixins: [DataTableMixin],
  middleware: 'auth',
  data() {
    return {
      title: 'Clients',
      advancedUsers: ['Reception', 'Owner'],
      tableHeader: [
        { key: 'full_nameid', label: 'Name' },
        { key: 'phone_number', label: 'Mobile Number' },
        { key: 'gender', label: 'Gender' },
        { key: 'is_blocked', label: 'Status' },
        { key: 'email', label: 'Email' }
      ],
      endpoint: clientApi.getClient(this.$route.params.slug),
      search: '',
      mobile: false,
      colorMapper: {
        Blocked: 'danger',
        Active: 'success'
      }
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
    setScreenSize(size) {
      this.mobile = size < 500
    }
  }
}
</script>
