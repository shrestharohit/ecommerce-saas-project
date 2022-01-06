import veeValidate from '@/mixins/veeValidate'
import { getResourceUrl } from '@/helpers/utils/searchUtils'
export default {
  mixins: [veeValidate],
  data() {
    return {
      response: [],
      fetchedData: [],
      totalCount: 0,
      loading: false,
      pagination: {
        perPage: 5,
        currentPage: 1
      },
      fetchAPI: '',
      endpoint: ''
    }
  },
  watch: {
    DataTableFilter(val) {
      this.fetchAPI = getResourceUrl(this.endpoint, {
        ...val
      })
      this.fetchData()
    }
  },
  created() {
    this.fetchAPI = this.endpoint + `?limit=${this.pagination.perPage}`
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      this.$axios
        .$get(this.fetchAPI)
        .then(response => {
          this.response = response
          this.totalCount = response.count
          this.fetchedData = response.results
          this.fetchSuccess()
        })
        .catch(error => {
          this.getError(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    fetchSuccess() {}
  }
}
