<template>
  <form-wrapper
    :title="formType === 'Update' ? 'Edit Service' : 'New Service'"
    :loading="loading"
    @close="redirectToServicePage()"
  >
    <validation-observer ref="observer">
      <b-form>
        <b-row align-h="center" align-v="center" class="p-2 py-lg-4">
          <b-col md="8" cols="12">
            <b-card class="shadow">
              <div class="card-text">
                <h5 class="font-weight-bold">Basic Info</h5>
                <div class="text-secondary">
                  Add a service name and choose the treatment type.
                </div>
              </div>
              <hr />
              <div class="card-text">
                <b-row class="pt-2">
                  <b-col cols="12" md="8">
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                      name="Service Name"
                    >
                      <b-form-group
                        class="small font-weight-bold"
                        label="Service Name"
                      >
                        <b-form-input
                          v-model="formValues.title"
                          :state="errors[0] || fieldErrors.title ? false : null"
                          placeholder="Enter Service Name"
                          autocomplete="on"
                        />
                        <b-form-invalid-feedback>
                          {{ errors[0] || fieldErrors.title }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col cols="12" md="8">
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                      name="Treatment Type"
                    >
                      <b-form-group
                        class="small font-weight-bold"
                        label="Treatment Type"
                      >
                        <auto-complete
                          :key="treatmentTypeKey"
                          v-model="formValues.treatment_type"
                          endpoint="api/v1/service/treatment-type/"
                          :state="
                            errors[0] || fieldErrors.treatment_type
                              ? false
                              : null
                          "
                          value-field="slug"
                          text-field="title"
                        />
                        <b-form-invalid-feedback>
                          {{ errors[0] || fieldErrors.treatment_type }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col cols="12" md="8">
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                      name="Service Category"
                    >
                      <b-form-group
                        class="small font-weight-bold"
                        label="Service Category"
                      >
                        <auto-complete
                          :key="categoryKey"
                          v-model="formValues.category"
                          :endpoint="`api/v1/service/${$route.params.slug}/category/`"
                          :state="
                            errors[0] || fieldErrors.category ? false : null
                          "
                          value-field="slug"
                          text-field="title"
                        />
                        <b-form-invalid-feedback>
                          {{ errors[0] || fieldErrors.category }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col cols="12" md="8">
                    <validation-provider
                      v-slot="{ errors }"
                      rules=""
                      name="Service Description"
                    >
                      <b-form-group
                        class="small font-weight-bold"
                        label="Service Description"
                      >
                        <b-form-textarea
                          v-model="formValues.description"
                          :state="
                            errors[0] || fieldErrors.description ? false : null
                          "
                          rows="3"
                          placeholder="Enter something ..."
                        />
                        <b-form-invalid-feedback>
                          {{ errors[0] || fieldErrors.description }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col cols="12" md="8">
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                      name="Service Available For"
                    >
                      <b-form-group
                        class="small font-weight-bold"
                        label="Service Available For"
                        ><b-form-select
                          v-model="formValues.gender_preference"
                          :options="genderOptions"
                        ></b-form-select>
                        <b-form-invalid-feedback>
                          {{ errors[0] || fieldErrors.gender_preference }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
              </div>
            </b-card>
            <b-card class="shadow mt-2">
              <div class="card-text">
                <h5 class="font-weight-bold">Online Booking</h5>
                <div class="text-secondary">
                  Enable online bookings, choose who the service is available
                  for and add a short description.
                </div>
              </div>
              <hr />
              <div class="card-text">
                <b-row class="pt-2">
                  <b-col cols="12" md="8">
                    <b-form-checkbox
                      v-model="formValues.online_booking_enabled"
                      name="check-button"
                      switch
                    >
                      Enable Online Bookings
                    </b-form-checkbox>
                  </b-col>
                </b-row>
              </div>
            </b-card>
            <b-card class="shadow mt-2">
              <div class="card-text">
                <h5 class="font-weight-bold">Staff</h5>
                <div class="text-secondary">
                  Assign staff to the service and manage staff commission
                </div>
              </div>
              <hr />
              <div class="card-text">
                <b-row class="pt-2">
                  <b-col cols="12" md="8">
                    <b-form-group v-slot="{ ariaDescribedby }">
                      <b-form-checkbox-group
                        id="checkbox-group-2"
                        v-model="formValues.staff"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-2"
                      >
                        <template v-for="(item, index) in staffList">
                          <b-form-checkbox :key="index" :value="item.id">
                            <div class="text-secondary">
                              <b-avatar
                                variant="accent2-200"
                                :src="item.profile_picture || ''"
                                :text="
                                  !item.profile_picture && item.full_name
                                    ? item.full_name.charAt(0)
                                    : ''
                                "
                                size="3rem"
                              ></b-avatar>
                              <span class="font-weight-bold">
                                {{ item.full_name }}
                              </span>
                            </div>
                          </b-form-checkbox>
                        </template>
                      </b-form-checkbox-group>
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </b-card>
            <b-card class="shadow mt-2">
              <div class="card-text">
                <h5 class="font-weight-bold">Pricing and Duration</h5>
                <div class="text-secondary">
                  Add the pricing options and duration of the service.
                </div>
              </div>
              <hr />
              <div class="card-text">
                <b-row
                  v-for="(item, index) in formValues.pricing_options"
                  :key="index"
                >
                  <b-col cols="12" md="12" class="mb-3">
                    <b-row class="pt-2 bg-accent2-100">
                      <b-col cols="12" md="12" class="text-right mb-2">
                        <div
                          v-if="formValues.pricing_options.length > 1"
                          class="ml-auto"
                        >
                          <img
                            src="@/helpers/icons/close.svg"
                            height="15"
                            @click="formValues.pricing_options.splice(index, 1)"
                          />
                        </div>
                      </b-col>
                      <b-col cols="12" md="3">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          name="Title"
                        >
                          <b-form-group
                            class="small font-weight-bold"
                            label="Title"
                          >
                            <b-form-input
                              v-model="item.title"
                              :state="
                                errors[0] || fieldErrors.title ? false : null
                              "
                              placeholder="Enter Title"
                              autocomplete="on"
                            />
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.title }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col cols="12" md="3">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required|numeric"
                          name="Duration"
                        >
                          <b-form-group
                            class="small font-weight-bold"
                            label="Duration (in hours)"
                          >
                            <b-form-select
                              v-model="item.duration"
                              :options="durationOptions"
                            ></b-form-select>
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.duration }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col cols="12" md="3">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          name="Price"
                        >
                          <b-form-group
                            class="small font-weight-bold"
                            label="Price"
                          >
                            <b-form-input
                              v-model="item.price"
                              :state="
                                errors[0] || fieldErrors.price ? false : null
                              "
                              placeholder="Enter Price"
                              autocomplete="on"
                            />
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.price }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col cols="12" md="3">
                        <validation-provider
                          v-slot="{ errors }"
                          rules=""
                          name="Sale Price"
                        >
                          <b-form-group
                            class="small font-weight-bold"
                            label="Sale Price"
                          >
                            <b-form-input
                              v-model="item.sale_price"
                              :state="
                                errors[0] || fieldErrors.sale_price
                                  ? false
                                  : null
                              "
                              placeholder="Enter Sale Price"
                              autocomplete="on"
                            />
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.sale_price }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <a class="small pointer" @click="addNewField()">Add New</a>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <b-row class="bg-white">
      <b-col class="text-right">
        <b-container class="p-2 px-4">
          <b-button size="lg" variant="light" @click="redirectToServicePage()">
            Cancel
          </b-button>
          <b-button
            v-if="formType === 'Update'"
            size="lg"
            variant="danger"
            @click="deleteInfo()"
          >
            Delete
          </b-button>
          <b-button
            size="lg"
            variant="accent3-800"
            @click="formType === 'Update' ? updateData() : addData()"
          >
            {{ formType === 'Update' ? 'Update' : 'Save' }}
          </b-button>
        </b-container>
      </b-col>
    </b-row>
  </form-wrapper>
</template>
<script>
import FormWrapper from '@/components/common/FormWrapper.vue'
import {
  retrieveMixin,
  createMixin,
  updateMixin,
  deleteMixin
} from '@/mixins/FormMixins'
import serviceApi from '@/api/services'
import AutoComplete from '@/components/common/AutoComplete'
export default {
  components: {
    FormWrapper,
    AutoComplete
  },
  mixins: [retrieveMixin, createMixin, updateMixin, deleteMixin],
  layout: 'empty',
  middleware: 'auth',
  props: {
    formType: {
      type: String,
      default: 'Create'
    }
  },
  data() {
    return {
      formValues: {
        gender_preference: 'All',
        online_booking_enabled: true,
        staff: [],
        title: '',
        description: '',
        pricing_options: [
          { price: '', duration: 1, title: '', sale_price: '' }
        ],
        offered_by: []
      },
      staffList: [],
      treatmentTypeKey: 0,
      categoryKey: 0,
      genderOptions: [
        { value: 'Female', text: 'Female Only' },
        { value: 'Male', text: 'Male Only' },
        { value: 'All', text: 'Everyone' }
      ],
      durationOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      selectAllStaff: false,
      crudInfo: {
        name: 'Service',
        results: [],
        endpoint: {
          get:
            serviceApi.getService(this.$route.params.slug) +
            `${this.$route.params.id}/`,
          create: serviceApi.createService(this.$route.params.slug),
          update: serviceApi.updateService(
            this.$route.params.id,
            this.$route.params.slug
          ),
          delete: serviceApi.updateService(
            this.$route.params.id,
            this.$route.params.slug
          )
        }
      }
    }
  },
  created() {
    if (this.formType === 'Update') {
      this.getData()
    }
    this.getStaff()
  },
  methods: {
    async addNewField() {
      if (await this.validateAllFields()) {
        this.formValues.pricing_options.push({
          price: '',
          duration: 1,
          title: '',
          sale_price: ''
        })
      }
    },
    getStaff() {
      this.$axios
        .get(`api/v1/control-panel/${this.$route.params.slug}/staff/`)
        .then(response => {
          this.staffList = response.data.results
        })
    },
    fetchSuccess() {
      this.formValues.online_booking_enabled = this.crudInfo.results.online_booking_enabled
      this.formValues.gender_preference = this.crudInfo.results.gender_preference
      this.formValues.title = this.crudInfo.results.title
      this.formValues.description = this.crudInfo.results.description
      this.formValues.category =
        this.crudInfo.results.category && this.crudInfo.results.category.slug
      this.formValues.treatment_type =
        this.crudInfo.results.treatment_type &&
        this.crudInfo.results.treatment_type.slug
      this.formValues.staff =
        this.crudInfo.results.offered_by &&
        this.crudInfo.results.offered_by.map(x => x.id)
      this.treatmentTypeKey += 1
      this.categoryKey += 1
      this.formValues.pricing_options = []
      this.crudInfo.results.service_pricing_options.forEach(x => {
        this.formValues.pricing_options.push({
          id: x.id,
          price: x.price,
          duration:
            x.duration.at(0) === '0' ? x.duration.at(1) : 1 + x.duration.at(1),
          title: x.title,
          sale_price: x.sale_price
        })
      })
    },
    getFormValues() {
      const postData = this.formValues
      postData.pricing_options.forEach(x => {
        x.duration = x.duration * 60 * 60
      })
      postData.offered_by = this.formValues.staff
      return postData
    },
    createSuccess() {
      this.redirectToServicePage()
    },
    updateSuccess() {
      this.redirectToServicePage()
    },
    deleteSuccess() {
      this.redirectToServicePage()
    },
    createError() {
      if (this.fieldErrors.detail) {
        this.showSnackbar(this.fieldErrors.detail, 'danger')
      }
    },
    updateError() {
      if (this.fieldErrors.detail) {
        this.showSnackbar(this.fieldErrors.detail, 'danger')
      }
    },
    redirectToServicePage() {
      this.$router.push({
        name: 'admin-slug-services',
        params: {
          slug: this.$route.params.slug
        }
      })
    }
  }
}
</script>
