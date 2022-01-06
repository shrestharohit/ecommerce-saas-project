<template>
  <page-wrapper :title="'Services'">
    <div class="overflow-x-hidden pt-3">
      <b-row align-h="center" align-v="center">
        <b-col md="10">
          <b-row class="p-2">
            <b-col md="auto" align="left" class="pb-3">
              <b-form-input
                v-model="search"
                placeholder="Search"
              ></b-form-input>
            </b-col>
            <b-col align="right">
              <b-dropdown text="Create New" variant="accent3-800">
                <b-dropdown-item @click="redirectToCategoryCreatePage()">
                  New Category
                </b-dropdown-item>
                <b-dropdown-item @click="redirectToServiceCreatePage()">
                  New Service
                </b-dropdown-item>
              </b-dropdown>
            </b-col>
          </b-row>
          <b-row
            v-if="!loading && fetchedData.length"
            class="pb-4 p-2"
            align-h="center"
            align-v="center"
          >
            <b-col cols="12" md="12">
              <b-list-group v-for="items in fetchedData" :key="items.id">
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center pointer"
                  @click="redirectToCategoryCreatePage(items)"
                >
                  {{ items.title }}
                </b-list-group-item>
                <b-card
                  v-if="items.services.length > 0"
                  no-body
                  class="p-2 bg-accent2-200"
                >
                  <b-list-group
                    v-for="(item, index) in items.services"
                    :key="index"
                  >
                    <b-list-group-item
                      class="d-flex justify-content-between align-items-center pointer"
                      @click="redirectToServiceCreatePage(item)"
                    >
                      {{ item.title }}
                    </b-list-group-item>
                  </b-list-group>
                </b-card>
              </b-list-group>
            </b-col>
          </b-row>
          <b-row
            v-else-if="!loading && fetchedData.length === 0"
            class="pt-5 mt-5"
            align-h="center"
            align-v="center"
          >
            <b-col cols="12" md="12">
              <div class="text-center has-text-weight-bold text-secondary">
                <div v-text="'No data Available.'"></div>
              </div>
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
    </div>
    <template v-if="totalCount > pagination.perPage" #actions>
      <div class="pr-4">
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
      </div>
    </template>
    <b-modal
      v-model="displayForm"
      centered
      :title="
        Object.keys(actionData).length
          ? 'Update Service Category'
          : 'Create New Service Category'
      "
      hide-footer
      no-close-on-backdrop
    >
      <create-service-category
        v-if="displayForm"
        :action-data="actionData"
        @close="displayForm = false"
        @create=";(displayForm = false), fetchData()"
        @update=";(displayForm = false), fetchData()"
        @delete=";(displayForm = false), fetchData()"
      ></create-service-category>
    </b-modal>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/common/PageWrapper'
import DataTableMixin from '@/mixins/DataTableMixin'
import serviceApi from '@/api/services'
import CreateServiceCategory from '@/components/services/CreateServiceCategory'

export default {
  components: {
    PageWrapper,
    CreateServiceCategory
  },
  mixins: [DataTableMixin],
  middleware: 'auth',
  data() {
    return {
      search: '',
      displayForm: false,
      actionData: {},
      pagination: {
        perPage: 10,
        currentPage: 1
      },
      endpoint: serviceApi.getCategory(this.$route.params.slug)
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
    }
  },
  watch: {
    fetchedData(val) {
      val.forEach((x, index) => {
        x.order = index
      })
    }
  },
  methods: {
    redirectToCategoryCreatePage(item) {
      this.displayForm = true
      this.actionData = item || {}
    },
    redirectToServiceCreatePage(item) {
      if (item) {
        return this.$router.push({
          name: 'admin-slug-services-id-edit',
          params: { slug: this.$route.params.slug, id: item.id }
        })
      }
      return this.$router.push({
        name: 'admin-slug-services-add',
        params: { slug: this.$route.params.slug }
      })
    }
  }
}
</script>
