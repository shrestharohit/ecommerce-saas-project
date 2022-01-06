<template>
  <validation-observer ref="observer">
    <b-form>
      <b-row align-v="center">
        <b-col cols="12" class="pb-2">Day: {{ type }}</b-col>
        <b-col cols="12" md="12" class="pb-3">
          <b-form-checkbox v-model="formValues.is_workday" class="z-index-0">
            <div class="text-secondary">Is a workday?</div>
          </b-form-checkbox>
        </b-col>
        <b-col v-if="formValues.is_workday" cols="12" md="6">
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="Start Shift"
          >
            <b-form-group class="small" label="Start Shift">
              <b-form-input
                v-model="formValues.start_time"
                :state="errors[0] || fieldErrors.start_time ? false : null"
                type="time"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] || fieldErrors.start_time }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col v-if="formValues.is_workday" cols="12" md="6">
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="End Shift"
          >
            <b-form-group class="small" label="End Shift">
              <b-form-input
                v-model="formValues.end_time"
                :state="errors[0] || fieldErrors.end_time ? false : null"
                type="time"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] || fieldErrors.end_time }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right">
          <b-button size="md" variant="light" @click="$emit('close')">
            Cancel
          </b-button>
          <b-button size="md" variant="accent3-800" @click="updateData()">
            Save
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>
<script>
import { updateMixin } from '@/mixins/FormMixins'
import employeeApi from '@/api/staff'
export default {
  mixins: [updateMixin],
  props: {
    actionData: {
      type: [Array, Object],
      default: undefined
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formValues: {
        start_time: '',
        end_time: '',
        is_workday: false
      },
      test: '',
      crudInfo: {
        name: 'Schedule',
        endpoint: {
          update: ''
        }
      }
    }
  },
  created() {
    if (
      this.actionData &&
      this.actionData.employee_working_hours &&
      this.actionData.employee_working_hours.find(x => x.weekday === this.type)
    ) {
      this.crudInfo.endpoint.update = employeeApi.updateEmployeeSchedule(
        this.actionData.id,
        this.actionData.employee_working_hours.find(
          x => x.weekday === this.type
        ).id
      )
      this.populateData()
    }
  },
  methods: {
    populateData() {
      const data = this.actionData.employee_working_hours.find(
        x => x.weekday === this.type
      )
      this.formValues.start_time = data.start_time
      this.formValues.end_time = data.end_time
      this.formValues.is_workday = data.is_workday
    }
  }
}
</script>
