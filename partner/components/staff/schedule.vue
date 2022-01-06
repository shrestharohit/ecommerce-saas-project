<template>
  <div class="overflow-x-hidden">
    <b-row class="px-lg-4 pt-2">
      <b-col md="3" align="left" class="pb-3">
        <b-form-input v-model="search" placeholder="Search"></b-form-input>
      </b-col>
      <b-col md="12" cols="12">
        <small v-if="responseData.length" class="text-secondary">
          Default Venue Time Shift:
        </small>
        <b-table
          :items="responseData"
          responsive
          small
          bordered
          outlined
          table-variant="secondary"
        >
        </b-table>
      </b-col>
      <b-col md="12" cols="12">
        <small class="text-secondary">Employee Time Shift:</small>
        <b-table
          id="my-table"
          :items="fetchedData"
          :fields="tableHeader"
          :per-page="pagination.perPage"
          :busy="loading"
          class="bg-white mb-4"
          bordered
          responsive
          show-empty
        >
          <template #head="data">
            <div class="text-center">
              <span v-text="data.field.label"></span>
            </div>
          </template>
          <template #cell(full_nametitle)="data">
            <b-row>
              <b-col cols="auto">
                <b-avatar
                  variant="accent2-200"
                  :src="data.item.profile_picture || ''"
                  :text="
                    !data.item.profile_picture && data.item.full_name
                      ? data.item.full_name.charAt(0)
                      : ''
                  "
                ></b-avatar>
              </b-col>
              <b-col cols="auto">
                <div class="font-weight-bold small">
                  {{ data.item.full_name }}
                </div>
                <div class="small text-secondary">
                  {{ data.item.title }}
                </div>
              </b-col>
            </b-row>
          </template>
          <template #cell(sunday)="data">
            <div
              class="pointer text-center"
              :class="
                timeShift(data.item, 'Sunday') === 'Off day'
                  ? 'text-danger'
                  : ''
              "
              @click="displayForm(data.item, 'Sunday')"
            >
              {{ timeShift(data.item, 'Sunday') }}
            </div>
          </template>
          <template #cell(monday)="data">
            <div
              class="pointer text-center"
              :class="
                timeShift(data.item, 'Monday') === 'Off day'
                  ? 'text-danger'
                  : ''
              "
              @click="displayForm(data.item, 'Monday')"
            >
              {{ timeShift(data.item, 'Monday') }}
            </div>
          </template>
          <template #cell(tuesday)="data">
            <div
              class="pointer text-center"
              :class="
                timeShift(data.item, 'Tuesday') === 'Off day'
                  ? 'text-danger'
                  : ''
              "
              @click="displayForm(data.item, 'Tuesday')"
            >
              {{ timeShift(data.item, 'Tuesday') }}
            </div>
          </template>
          <template #cell(wednesday)="data">
            <div
              class="pointer text-center"
              :class="
                timeShift(data.item, 'Wednesday') === 'Off day'
                  ? 'text-danger'
                  : ''
              "
              @click="displayForm(data.item, 'Wednesday')"
            >
              {{ timeShift(data.item, 'Wednesday') }}
            </div>
          </template>
          <template #cell(thursday)="data">
            <div
              class="pointer text-center"
              :class="
                timeShift(data.item, 'Thursday') === 'Off day'
                  ? 'text-danger'
                  : ''
              "
              @click="displayForm(data.item, 'Thursday')"
            >
              {{ timeShift(data.item, 'Thursday') }}
            </div>
          </template>
          <template #cell(friday)="data">
            <div
              class="pointer text-center"
              :class="
                timeShift(data.item, 'Friday') === 'Off day'
                  ? 'text-danger'
                  : ''
              "
              @click="displayForm(data.item, 'Friday')"
            >
              {{ timeShift(data.item, 'Friday') }}
            </div>
          </template>
          <template #cell(saturday)="data">
            <div
              class="pointer text-center"
              :class="
                timeShift(data.item, 'Saturday') === 'Off day'
                  ? 'text-danger'
                  : ''
              "
              @click="displayForm(data.item, 'Saturday')"
            >
              {{ timeShift(data.item, 'Saturday') }}
            </div>
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
    <b-row v-if="totalCount > 5" class="footer fixed-bottom g-0 bg-white">
      <b-col cols="12" md="12" class="text-right pr-5 pt-1">
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
      </b-col>
    </b-row>
    <b-modal
      v-if="displayScheduleForm"
      v-model="displayScheduleForm"
      centered
      size="md"
      :title="`Edit Schedule`"
      hide-footer
      no-close-on-backdrop
    >
      <set-routine
        v-if="displayScheduleForm"
        :action-data="userData"
        :type="type"
        @close="displayScheduleForm = false"
        @update="
          displayScheduleForm = false
          fetchData()
        "
      ></set-routine>
    </b-modal>
  </div>
</template>

<script>
import DataTableMixin from '@/mixins/DataTableMixin'
import SetRoutine from '@/components/staff/Forms/SetRoutine'
import NoData from '@/components/common/NoData'
import employeeApi from '@/api/staff'
import { mapGetters } from 'vuex'
export default {
  components: {
    NoData,
    SetRoutine
  },
  mixins: [DataTableMixin],
  data() {
    return {
      title: 'Clients',
      tableHeader: [
        { key: 'full_nametitle', label: 'Staff Name' },
        { key: 'sunday', label: ' Sunday  ' },
        { key: 'monday', label: ' Monday  ' },
        { key: 'tuesday', label: ' Tuesday ' },
        { key: 'wednesday', label: 'Wednesday' },
        { key: 'thursday', label: 'Thursday ' },
        { key: 'friday', label: ' Friday  ' },
        { key: 'saturday', label: 'Saturday ' }
      ],
      responseData: [],
      endpoint: employeeApi.getEmployee(this.$route.params.slug),
      search: '',
      colorMapper: {
        Male: 'text-danger',
        Female: 'text-success'
      },
      displayScheduleForm: false,
      userData: '',
      type: ''
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
  created() {
    this.getDefaultVenueData()
  },
  methods: {
    getDefaultVenueData() {
      this.loading = true
      this.$axios
        .$get(
          `api/v1/control-panel/venue/${this.$route.params.slug}/opening_hours/`
        )
        .then(response => {
          this.responseData = [
            {
              sunday: this.extractData(response, 'Sunday'),
              monday: this.extractData(response, 'Monday'),
              tuesday: this.extractData(response, 'Tuesday'),
              wednesday: this.extractData(response, 'Wednesday'),
              thursday: this.extractData(response, 'Thursday'),
              friday: this.extractData(response, 'Friday'),
              saturday: this.extractData(response, 'Saturday')
            }
          ]
        })
        .finally(() => {
          this.loading = false
        })
    },
    extractData(response, day) {
      const data = response.venue_opening_hours.find(x => x.weekday === day)
      if (data.is_open) {
        return `${data.start_time} - ${data.end_time}`
      }
      return 'OffDay'
    },
    getFirstName() {
      if (this.userData && this.userData.full_name)
        return this.userData.full_name.split(' ')[0]
      return 'User'
    },
    displayForm(data, type) {
      if (
        this.getSwitchedVenue &&
        ['Owner'].includes(this.getSwitchedVenue.role)
      ) {
        this.userData = data
        this.type = type
        this.displayScheduleForm = true
      }
    },
    timeShift(data, day) {
      let value = '-'
      if (data.employee_working_hours.find(x => x.weekday === day)) {
        const startAt = data.employee_working_hours.find(x => x.weekday === day)
          .start_time
        const endAt = data.employee_working_hours.find(x => x.weekday === day)
          .end_time
        const workday = data.employee_working_hours.find(x => x.weekday === day)
          .is_workday
        value = workday ? `${startAt} - ${endAt}` : 'Off day'
      }
      return value
    }
  }
}
</script>
<style scoped>
.footer {
  z-index: 0;
}
</style>
