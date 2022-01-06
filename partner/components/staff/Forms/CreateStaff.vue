<template>
  <form-wrapper
    :title="formType === 'Update' ? 'Edit Staff' : 'New Staff'"
    :loading="loading"
    @close="redirectToStaffPage()"
  >
    <validation-observer ref="observer">
      <b-form>
        <b-row align-h="center" align-v="center" class="p-2 py-lg-4">
          <b-col md="8" cols="12">
            <b-card class="shadow">
              <div class="card-text">
                <h5 class="font-weight-bold">Basic Info</h5>
                <b-row class="pt-3" align-v="center" aligh-h="center">
                  <b-col md="3" class="pb-2">
                    <b-row>
                      <b-col v-if="formValues.profile_picture" cols="auto">
                        <div class="container pl-3">
                          <b-avatar
                            :src="formValues.profile_picture"
                            size="9rem"
                          ></b-avatar>
                          <div class="overlay" @click="showConfirmDialog()">
                            Remove Photo
                          </div>
                        </div>
                      </b-col>
                      <b-col
                        v-if="!formValues.profile_picture"
                        cols="12"
                        class="ml-3"
                      >
                        <b-card
                          class="text-center pointer circle pt-3"
                          @click="displayForm = true"
                        >
                          <div class="font-weight-bold text-secondary pt-1">
                            Add Profile Picture
                          </div>
                          <plus-svg class="svg-icons"></plus-svg>
                        </b-card>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col md="9">
                    <b-row>
                      <b-col cols="12" md="6">
                        <validation-provider
                          v-slot="{ errors, valid }"
                          rules="required"
                          name="First Name"
                        >
                          <b-form-group class="small" label="First Name">
                            <b-form-input
                              v-model="formValues.first_name"
                              placeholder="Enter First Name"
                              :state="
                                errors[0] || fieldErrors.first_name
                                  ? false
                                  : valid
                                  ? true
                                  : null
                              "
                              autocomplete="on"
                              type="text"
                            />
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.first_name }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col cols="12" md="6">
                        <validation-provider
                          v-slot="{ errors, valid }"
                          rules="required"
                          name="Last Name"
                        >
                          <b-form-group class="small" label="Last Name">
                            <b-form-input
                              v-model="formValues.last_name"
                              placeholder="Enter Last Name"
                              :state="
                                errors[0] || fieldErrors.last_name
                                  ? false
                                  : valid
                                  ? true
                                  : null
                              "
                              autocomplete="on"
                              type="text"
                            />
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.last_name }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col cols="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          rules=""
                          name="Title"
                        >
                          <b-form-group class="small" label="Staff Title">
                            <b-form-input
                              v-model="formValues.title"
                              :state="
                                errors[0] || fieldErrors.title ? false : null
                              "
                              placeholder="Enter Title"
                              autocomplete="on"
                              type="text"
                            />
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.title }}
                            </b-form-invalid-feedback>
                            <b-form-text>
                              This title will be visible to clients.
                            </b-form-text>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col cols="12" md="6">
                        <validation-provider
                          v-slot="{ errors }"
                          rules=""
                          name="Gender"
                        >
                          <b-form-group class="small" label="Gender"
                            ><b-form-select
                              v-model="formValues.gender"
                              :options="genderOptions"
                            ></b-form-select>
                            <b-form-invalid-feedback>
                              {{ errors[0] || fieldErrors.gender }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="12" md="12">
                    <validation-provider
                      v-slot="{ errors }"
                      rules=""
                      name="Bio"
                    >
                      <b-form-group class="small" label="Bio">
                        <b-form-textarea
                          v-model="formValues.bio"
                          placeholder="Enter something..."
                          :state="errors[0] || fieldErrors.bio ? false : null"
                        />
                        <b-form-invalid-feedback>
                          {{ errors[0] || fieldErrors.bio }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col cols="12" md="12">
                    <validation-provider
                      v-slot="{ errors }"
                      rules=""
                      name="Notes"
                    >
                      <b-form-group class="small" label="Notes (Optional)">
                        <b-form-textarea
                          v-model="formValues.notes"
                          placeholder="Enter something..."
                          :state="errors[0] || fieldErrors.notes ? false : null"
                          rows="3"
                        />
                        <b-form-invalid-feedback>
                          {{ errors[0] || fieldErrors.notes }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
              </div>
            </b-card>
            <b-card class="shadow mt-2">
              <div class="card-text">
                <h5 class="font-weight-bold">Contact</h5>
                <div class="text-secondary">
                  Staff contacts are confidential and won't be shared with your
                  clients.
                </div>
                <b-row class="pt-2">
                  <b-col cols="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      rules="email"
                      name="Email"
                    >
                      <b-form-group class="small" label="Email">
                        <b-form-input
                          v-model="formValues.email"
                          :state="errors[0] || fieldErrors.email ? false : null"
                          placeholder="Enter Email"
                          autocomplete="on"
                          type="email"
                        />
                        <b-form-invalid-feedback>
                          {{ errors[0] || fieldErrors.email }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col cols="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      rules="phoneNumber|min:7"
                      name="Phone Number"
                    >
                      <b-form-group class="small" label="Phone Number">
                        <b-form-input
                          v-model="formValues.phone_number"
                          :state="
                            errors[0] || fieldErrors.phone_number ? false : null
                          "
                          placeholder="Enter Phone Number"
                          type="text"
                        />
                        <b-form-invalid-feedback>
                          {{ errors[0] || fieldErrors.phone_number }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <hr />
                <h5 class="font-weight-bold">Online Links</h5>
                <b-row class="pt-2">
                  <b-col cols="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      rules=""
                      name="Website"
                    >
                      <b-form-group
                        class="small font-weight-bold"
                        label="Website"
                      >
                        <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                          <b-input-group-prepend is-text>
                            <website class="svg-icons"></website>
                          </b-input-group-prepend>
                          <b-form-input
                            v-model="formValues.website"
                            placeholder="Enter Website"
                            :state="
                              errors[0] || fieldErrors.website ? false : null
                            "
                            autocomplete="on"
                            type="text"
                          />
                          <b-form-invalid-feedback>
                            {{ errors[0] || fieldErrors.website }}
                          </b-form-invalid-feedback>
                        </b-input-group>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col cols="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      rules=""
                      name="Facebook"
                    >
                      <b-form-group
                        class="small font-weight-bold"
                        label="Facebook"
                      >
                        <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                          <b-input-group-prepend is-text>
                            <facebook class="svg-icons"></facebook>
                          </b-input-group-prepend>
                          <b-form-input
                            v-model="formValues.facebook"
                            placeholder="Enter Facebook Address"
                            :state="
                              errors[0] || fieldErrors.facebook ? false : null
                            "
                            autocomplete="on"
                            type="text"
                          />
                          <b-form-invalid-feedback>
                            {{ errors[0] || fieldErrors.facebook }}
                          </b-form-invalid-feedback>
                        </b-input-group>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col cols="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      rules=""
                      name="Instagram"
                    >
                      <b-form-group
                        class="small font-weight-bold"
                        label="Instagram"
                      >
                        <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                          <b-input-group-prepend is-text>
                            <instagram class="svg-icons"></instagram>
                          </b-input-group-prepend>
                          <b-form-input
                            v-model="formValues.instagram"
                            placeholder="Enter Instagram Address"
                            :state="
                              errors[0] || fieldErrors.instagram ? false : null
                            "
                            autocomplete="on"
                            type="text"
                          />
                          <b-form-invalid-feedback>
                            {{ errors[0] || fieldErrors.instagram }}
                          </b-form-invalid-feedback>
                        </b-input-group>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
              </div>
            </b-card>
            <b-card class="shadow mt-2">
              <div class="card-text">
                <h5 class="font-weight-bold">Employment</h5>
                <b-row class="pt-2">
                  <b-col md="6" cols="12">
                    <validation-provider
                      v-slot="{ errors }"
                      rules=""
                      name="Employment Status"
                    >
                      <b-form-group class="small" label="Employment Status"
                        ><b-form-select
                          v-model="formValues.employment_status"
                          :options="employmentStatusOptions"
                        ></b-form-select>
                        <b-form-invalid-feedback>
                          {{ errors[0] || fieldErrors.employment_status }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col v-if="!showDateField" cols="12" md="6">
                    <b-form-checkbox v-model="showDateField">
                      <div class="text-secondary">Add Start and End Date</div>
                    </b-form-checkbox>
                  </b-col>
                  <b-col v-if="showDateField" cols="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      rules=""
                      name="Start Date"
                    >
                      <b-form-group class="small" label="Start Date">
                        <b-form-datepicker
                          v-model="formValues.start_date"
                          :state="
                            errors[0] || fieldErrors.start_date ? false : null
                          "
                        ></b-form-datepicker>
                        <b-form-invalid-feedback>
                          {{ errors[0] || fieldErrors.start_date }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col v-if="showDateField" cols="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      rules=""
                      name="End Date"
                    >
                      <b-form-group class="small" label="End Date">
                        <b-form-datepicker
                          v-model="formValues.end_date"
                          :state="
                            errors[0] || fieldErrors.end_date ? false : null
                          "
                        ></b-form-datepicker>
                        <b-form-invalid-feedback>
                          {{ errors[0] || fieldErrors.end_date }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
              </div>
            </b-card>
            <b-card class="shadow mt-2">
              <div class="card-text">
                <h5 class="font-weight-bold pb-3">Access Type</h5>
                <b-row
                  v-for="(item, index) in accessTypeOptions"
                  :key="index"
                  align-v="start"
                >
                  <b-col md="12" cols="12" class="pb-2">
                    <b-form-radio
                      v-model="formValues.access_type"
                      :value="item.value"
                      class="pb-1"
                    >
                      <div>{{ item.text }}</div>
                      <div
                        class="text-secondary font-weight-bold"
                        style="font-size: 12px"
                      >
                        <tick-svg
                          v-if="item.subDetails[0].value"
                          style="height: 12px; fill: green"
                        ></tick-svg>
                        <cross-svg
                          v-else
                          style="height: 12px; fill: grey"
                        ></cross-svg>
                        <span class="pr-2">{{ item.subDetails[0].text }}</span>
                        <tick-svg
                          v-if="item.subDetails[1].value"
                          style="height: 12px; fill: green"
                        ></tick-svg>
                        <cross-svg
                          v-else
                          style="height: 12px; fill: grey"
                        ></cross-svg>
                        <span class="pr-2">{{ item.subDetails[1].text }}</span>
                        <tick-svg
                          v-if="item.subDetails[2].value"
                          style="height: 12px; fill: green"
                        ></tick-svg>
                        <cross-svg
                          v-else
                          style="height: 12px; fill: grey"
                        ></cross-svg>
                        <span class="pr-2">{{ item.subDetails[2].text }}</span>
                      </div>
                    </b-form-radio>
                  </b-col>
                </b-row>
              </div>
            </b-card>
            <b-card class="shadow mt-2">
              <div class="card-text">
                <h5 class="font-weight-bold">Services They Can Offer</h5>
                <b-row class="pt-2">
                  <b-col cols="12" md="6">
                    <b-form-group class="small" label="Services">
                      <auto-complete-multiple
                        :key="serviceKey"
                        v-model="formValues.employee_services"
                        :endpoint="serviceEndpoint"
                        value-field="id"
                        text-field="title"
                      ></auto-complete-multiple>
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </b-card>
            <b-card class="shadow mt-2">
              <div class="card-text">
                <h5 class="font-weight-bold">Calendar</h5>
                <b-row class="pt-2">
                  <b-col
                    v-for="(item, index) in colorPickerList || []"
                    :key="index"
                    md="1"
                    cols="auto"
                  >
                    <b-button
                      variant="outline-light"
                      pill
                      @click="formValues.calendar_color = item"
                    >
                      <b-avatar :variant="item" text=" ">
                        <tick-svg
                          v-if="item === formValues.calendar_color"
                          class="svg"
                        ></tick-svg>
                      </b-avatar>
                    </b-button>
                  </b-col>
                </b-row>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <b-row class="bg-white">
      <b-col class="text-right">
        <b-container class="p-2 px-4">
          <b-button size="lg" variant="light" @click="redirectToStaffPage()">
            Cancel
          </b-button>
          <b-button
            size="lg"
            variant="accent3-800"
            @click="formType === 'Update' ? updateData() : addData()"
          >
            Save
          </b-button>
        </b-container>
      </b-col>
    </b-row>
    <b-modal
      v-model="displayForm"
      centered
      :title="`Add New Image`"
      hide-footer
      no-close-on-backdrop
    >
      <image-upload
        v-if="displayForm"
        @close="displayForm = false"
        @create="
          formValues.profile_picture = $event
          displayForm = false
        "
      ></image-upload>
    </b-modal>
  </form-wrapper>
</template>
<script>
import ImageUpload from '@/components/common/ProfilePictureUpload'
import FormWrapper from '@/components/common/FormWrapper.vue'
import { retrieveMixin, createMixin, updateMixin } from '@/mixins/FormMixins'
import TickSvg from '@/helpers/icons/tick.svg?inline'
import CrossSvg from '@/helpers/icons/close.svg?inline'
import staffApi from '@/api/staff'
import PlusSvg from '@/helpers/icons/plus.svg?inline'
import Instagram from '@/helpers/icons/instagram.svg?inline'
import Facebook from '@/helpers/icons/facebook.svg?inline'
import Website from '@/helpers/icons/website.svg?inline'
import AutoCompleteMultiple from '@/components/common/AutoCompleteMultiple'
export default {
  components: {
    FormWrapper,
    TickSvg,
    CrossSvg,
    PlusSvg,
    ImageUpload,
    Website,
    Facebook,
    Instagram,
    AutoCompleteMultiple
  },
  mixins: [retrieveMixin, createMixin, updateMixin],
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
        gender: 'Female',
        employment_status: 'Employed',
        access_type: 'Basic',
        calendar_color: 'accent1-900',
        profile_picture: null,
        employee_services: []
      },
      displayForm: false,
      showDateField: false,
      serviceKey: 0,
      serviceEndpoint: `/api/v1/service/${this.$route.params.slug}/`,
      employmentStatusOptions: [
        { value: 'Employed', text: 'Employed' },
        { value: 'Self-employed', text: 'Self Employed' }
      ],
      accessTypeOptions: [
        {
          value: 'No Permission',
          text: 'No Permission',
          subDetails: [
            { text: 'View Own Calendar', value: false },
            { text: 'Client Details', value: false },
            { text: 'Finance And Invoices', value: false }
          ]
        },
        {
          value: 'Basic',
          text: 'Basic access',
          subDetails: [
            { text: 'View Own Calendar', value: true },
            { text: 'Client Details', value: false },
            { text: 'Finance And Invoices', value: false }
          ]
        },
        {
          value: 'Individual',
          text: 'Individual access',
          subDetails: [
            { text: 'Manage Own Calendar', value: true },
            { text: 'Client Details', value: false },
            { text: 'Finance And Invoices', value: false }
          ]
        },
        {
          value: 'Reception',
          text: 'Reception access',
          subDetails: [
            { text: 'Manage All Calendars', value: true },
            { text: 'Client Details', value: true },
            { text: 'Finance And Invoices', value: false }
          ]
        },
        {
          value: 'Owner',
          text: 'Owner access',
          subDetails: [
            { text: 'Manage All Calendars', value: true },
            { text: 'Client Details', value: true },
            { text: 'Finance And Invoices', value: true }
          ]
        }
      ],
      genderOptions: [
        { value: 'Female', text: 'Female' },
        { value: 'Male', text: 'Male' },
        { value: 'Other', text: 'Other' }
      ],
      crudInfo: {
        name: 'Staff',
        results: [],
        endpoint: {
          get: staffApi.getEmployeeDetails(
            this.$route.params.id,
            this.$route.params.slug
          ),
          create: staffApi.postEmployee(this.$route.params.slug),
          update: staffApi.updateEmployee(
            this.$route.params.id,
            this.$route.params.slug
          )
        }
      },
      colorPickerList: [
        'accent1-900',
        'primary1-800',
        'neutral-700',
        'accent2-900',
        'primary2-800',
        'accent2-200',
        'accent3-900',
        'primary3-800',
        'accent1-200'
      ]
    }
  },
  created() {
    if (this.formType === 'Update') {
      this.getData()
    }
  },
  methods: {
    fetchSuccess() {
      this.formValues = this.crudInfo.results
      this.formValues.first_name = this.crudInfo.results.full_name.split(' ')[0]
      this.formValues.last_name = this.crudInfo.results.full_name.split(' ')[1]
      this.serviceKey = 1
    },
    getFormValues() {
      const postData = this.formValues
      postData.full_name = `${this.formValues.first_name} ${this.formValues.last_name}`
      postData.employee_services = this.formValues.employee_services.map(
        x => x.id
      )
      if (!this.isNewImage(postData.profile_picture)) {
        delete postData.profile_picture
      }
      return postData
    },
    createSuccess() {
      this.redirectToStaffPage()
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
    updateSuccess() {
      this.redirectToStaffPage()
    },
    isNewImage(s) {
      if (s) {
        return !!s.match(';base64')
      }
      return true
    },
    redirectToStaffPage() {
      this.$router.push({
        name: 'admin-slug-staff',
        params: {
          slug: this.$route.params.slug
        }
      })
    },
    showConfirmDialog() {
      this.$bvModal
        .msgBoxConfirm(`Are you sure you want to delete this photo?`, {
          title: `Confirm Delete`,
          size: 'md',
          buttonSize: 'md',
          okVariant: 'danger',
          okTitle: 'Delete',
          cancelTitle: 'Cancel',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.formValues.profile_picture = null
          }
        })
    }
  }
}
</script>
<style scoped>
.svg {
  filter: invert(1);
  height: 18px;
  width: 18px;
}

.svg-icons {
  height: 20px;
  width: 20px;
}

.container {
  position: relative;
  width: 100%;
  padding: 0;
}

.overlay {
  position: absolute;
  bottom: 0;
  top: 0;
  padding-top: 35%;
  padding-right: 12%;
  color: #f1f1f1;
  width: 100%;
  transition: 0.5s ease;
  opacity: 0;
  text-align: center;
  cursor: pointer;
}

.container:hover .overlay {
  opacity: 1;
}

.circle {
  height: 9rem;
  width: 9rem;
  border-radius: 50%;
}
</style>
