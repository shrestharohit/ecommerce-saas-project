<template>
  <client-only>
    <page-wrapper :title="'General Settings'">
      <b-overlay :show="loading" rounded="sm">
        <div class="overflow-x-hidden pt-4">
          <b-row align-h="center" align-v="center" class="px-2">
            <b-col md="10" cols="12">
              <a
                class="pointer"
                @click="
                  $router.push({
                    name: 'admin-slug-settings',
                    params: { slug: $route.params.slug }
                  })
                "
              >
                Go Back to Previous Page
              </a>
              <validation-observer ref="observer">
                <b-form>
                  <!-- Venue settings start -->
                  <b-row align-h="center" align-v="center" class="pb-5">
                    <b-col md="5" cols="12" class="pb-2 pb-lg-0">
                      <div class="font-weight-bold">
                        <h3>Venue Information</h3>
                      </div>
                      <div class="text-secondary small">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Alias iusto odit perspiciatis recusandae neque
                        mollitia consectetur.
                      </div>
                    </b-col>
                    <b-col md="7" cols="12">
                      <b-card class="shadow">
                        <b-card-text>
                          <b-row>
                            <b-col cols="12" md="12">
                              <validation-provider
                                v-slot="{ errors }"
                                rules="required"
                                name="Venue Name"
                              >
                                <input-with-language-switch
                                  v-model="formValues.name"
                                  :arabic.sync="formValues.name_ar"
                                  :state="errors[0] || fieldErrors.name"
                                  label="Venue Name"
                                />
                              </validation-provider>
                            </b-col>
                            <b-col cols="12" md="12">
                              <validation-provider
                                v-slot="{ errors }"
                                rules="required"
                                name="Primary Category"
                              >
                                <b-form-group
                                  class="small font-weight-bold"
                                  label="Primary Category"
                                >
                                  <auto-complete
                                    :key="mainCategoryKey"
                                    v-model="formValues.main_category"
                                    :endpoint="categoryEndpoint"
                                    :state="
                                      errors[0] || fieldErrors.main_category
                                        ? false
                                        : null
                                    "
                                    value-field="slug"
                                    text-field="title"
                                  />
                                  <b-form-invalid-feedback>
                                    {{ errors[0] || fieldErrors.main_category }}
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </validation-provider>
                            </b-col>
                            <b-col cols="12" md="12">
                              <b-form-group
                                class="small font-weight-bold"
                                label="Additional Categories"
                              >
                                <auto-complete-multiple
                                  :key="categoriesKey"
                                  v-model="formValues.categories"
                                  :endpoint="categoryEndpoint"
                                  value-field="slug"
                                  text-field="title"
                                ></auto-complete-multiple>
                              </b-form-group>
                            </b-col>
                            <b-col cols="12" md="12">
                              <validation-provider
                                v-slot="{ errors }"
                                rules=""
                                name="Description"
                              >
                                <input-area-with-language-switch
                                  v-model="formValues.description"
                                  :arabic.sync="formValues.description_ar"
                                  :state="errors[0] || fieldErrors.description"
                                  label="Description"
                                />
                              </validation-provider>
                            </b-col>
                            <b-col cols="12">
                              <b-form-checkbox
                                v-model="formValues.is_active"
                                class="z-index-0"
                              >
                                <div class="text-secondary">
                                  Make venue profile as public
                                </div>
                              </b-form-checkbox>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card>
                    </b-col>
                  </b-row>
                  <!-- Venue settings end -->
                  <!-- Contact settings start -->
                  <b-row align-h="center" align-v="center" class="pb-5">
                    <b-col md="5" cols="12" class="pb-2 pb-lg-0">
                      <div class="font-weight-bold">
                        <h3>Contact Details</h3>
                      </div>
                      <div class="text-secondary small">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Alias iusto odit perspiciatis recusandae neque
                        mollitia consectetur.
                      </div>
                    </b-col>
                    <b-col md="7" cols="12">
                      <b-card class="shadow">
                        <b-card-text>
                          <b-row>
                            <b-col cols="12" md="12">
                              <validation-provider
                                v-slot="{ errors }"
                                rules="required|email"
                                name="Email"
                              >
                                <b-form-group
                                  class="small font-weight-bold"
                                  label="Email"
                                >
                                  <b-form-input
                                    v-model="formValues.email"
                                    :state="
                                      errors[0] || fieldErrors.email
                                        ? false
                                        : null
                                    "
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
                            <b-col cols="12" md="12">
                              <validation-provider
                                v-slot="{ errors }"
                                rules="required|phoneNumber|min:7"
                                name="Phone Number"
                              >
                                <b-form-group
                                  class="small font-weight-bold"
                                  label="Phone Number"
                                >
                                  <b-form-input
                                    v-model="formValues.phone_number"
                                    :state="
                                      errors[0] || fieldErrors.phone_number
                                        ? false
                                        : null
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
                            <b-col cols="12" md="12">
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
                                        errors[0] || fieldErrors.website
                                          ? false
                                          : null
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
                            <b-col cols="12" md="12">
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
                                        errors[0] || fieldErrors.facebook
                                          ? false
                                          : null
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
                            <b-col cols="12" md="12">
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
                                        errors[0] || fieldErrors.instagram
                                          ? false
                                          : null
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
                        </b-card-text>
                      </b-card>
                    </b-col>
                  </b-row>
                  <!-- Contact settings end -->
                  <!-- Preference start -->
                  <b-row align-h="center" align-v="center" class="pb-5">
                    <b-col md="5" cols="12" class="pb-2 pb-lg-0">
                      <div class="font-weight-bold"><h3>Business Info</h3></div>
                      <div class="text-secondary small">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Alias iusto odit perspiciatis recusandae neque
                        mollitia consectetur.
                      </div>
                    </b-col>
                    <b-col md="7" cols="12">
                      <b-card class="shadow">
                        <b-card-text>
                          <b-row>
                            <b-col cols="12" md="12">
                              <validation-provider
                                v-slot="{ errors }"
                                rules="required"
                                name="Gender"
                              >
                                <b-form-group
                                  class="small font-weight-bold"
                                  label="Gender"
                                  ><b-form-select
                                    v-model="formValues.gender_preference"
                                    :options="genderOptions"
                                  ></b-form-select>
                                  <b-form-invalid-feedback>
                                    {{
                                      errors[0] || fieldErrors.gender_preference
                                    }}
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </validation-provider>
                            </b-col>
                            <b-col cols="12" md="12">
                              <validation-provider
                                v-slot="{ errors }"
                                rules="required"
                                name="Age"
                              >
                                <b-form-group
                                  class="small font-weight-bold"
                                  label="Age"
                                >
                                  <b-form-select
                                    v-model="formValues.age_preference"
                                    :options="ageOptions"
                                  ></b-form-select>
                                  <b-form-invalid-feedback>
                                    {{
                                      errors[0] || fieldErrors.age_preference
                                    }}
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </validation-provider>
                            </b-col>
                            <b-col md="12" cols="12">
                              <b-form-group
                                class="small font-weight-bold"
                                label="Amenities"
                              >
                                <auto-complete-multiple
                                  :key="amenitiesKey"
                                  v-model="formValues.amenities"
                                  :endpoint="amenitiesEndpoint"
                                  value-field="slug"
                                  text-field="title"
                                ></auto-complete-multiple>
                              </b-form-group>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card>
                    </b-col>
                  </b-row>
                  <!-- Preference end -->
                  <!-- Timeshift Settings start -->
                  <b-row align-h="center" align-v="center" class="pb-5">
                    <b-col md="5" cols="12" class="pb-2 pb-lg-0">
                      <div class="font-weight-bold">
                        <h3>Opening Hours</h3>
                      </div>
                      <div class="text-secondary small">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Alias iusto odit perspiciatis recusandae neque
                        mollitia consectetur.
                      </div>
                    </b-col>
                    <b-col md="7" cols="12">
                      <b-card class="shadow">
                        <b-card-text>
                          <b-row class="small font-weight-bold pb-3">
                            <b-col md="4"> Venue Opening Days </b-col>
                          </b-row>
                          <b-row
                            v-for="(
                              item, index
                            ) in formValues.venue_opening_hours"
                            :key="index"
                            align-v="start"
                          >
                            <b-col md="4" cols="12" class="pb-2">
                              <b-form-checkbox
                                v-model="item.is_open"
                                class="z-index-0"
                              >
                                <div class="text-secondary">
                                  {{ item.weekday }}
                                </div>
                              </b-form-checkbox>
                            </b-col>
                            <b-col cols="12" md="4">
                              <validation-provider
                                v-slot="{ errors }"
                                :rules="item.is_open ? 'required' : ''"
                                :name="`start${index}`"
                              >
                                <b-form-group>
                                  <b-form-input
                                    v-model="item.start_time"
                                    :state="
                                      errors[0] ||
                                      (fieldErrors[
                                        `venue_opening_hours-${index}`
                                      ] &&
                                        fieldErrors[
                                          `venue_opening_hours-${index}`
                                        ].start_time)
                                        ? false
                                        : null
                                    "
                                    type="time"
                                    step="60"
                                  ></b-form-input>
                                  <b-form-invalid-feedback>
                                    {{
                                      errors[0] ||
                                      (fieldErrors[
                                        `venue_opening_hours-${index}`
                                      ] &&
                                        fieldErrors[
                                          `venue_opening_hours-${index}`
                                        ].start_time &&
                                        fieldErrors[
                                          `venue_opening_hours-${index}`
                                        ].start_time[0])
                                    }}
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </validation-provider>
                            </b-col>
                            <b-col cols="12" md="4">
                              <validation-provider
                                v-slot="{ errors }"
                                :rules="item.is_open ? 'required' : ''"
                                :name="`end${index}`"
                              >
                                <b-form-group>
                                  <b-form-input
                                    v-model="item.end_time"
                                    :state="
                                      errors[0] ||
                                      (fieldErrors[
                                        `venue_opening_hours-${index}`
                                      ] &&
                                        fieldErrors[
                                          `venue_opening_hours-${index}`
                                        ].end_time)
                                        ? false
                                        : null
                                    "
                                    type="time"
                                    step="60"
                                  ></b-form-input>
                                  <b-form-invalid-feedback>
                                    {{
                                      errors[0] ||
                                      (fieldErrors[
                                        `venue_opening_hours-${index}`
                                      ] &&
                                        fieldErrors[
                                          `venue_opening_hours-${index}`
                                        ].end_time &&
                                        fieldErrors[
                                          `venue_opening_hours-${index}`
                                        ].end_time[0])
                                    }}
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </validation-provider>
                            </b-col>
                            <div class="h-divider" />
                          </b-row>
                        </b-card-text>
                      </b-card>
                    </b-col>
                  </b-row>
                  <!-- Timeshift Settings end -->
                  <!-- Primary Picture start -->
                  <b-row align-h="center" align-v="center" class="pb-5">
                    <b-col md="5" cols="12" class="pb-2 pb-lg-0">
                      <div class="font-weight-bold">
                        <h3>Display Picture</h3>
                      </div>
                      <div class="text-secondary small">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Alias iusto odit perspiciatis recusandae neque
                        mollitia consectetur.
                      </div>
                    </b-col>
                    <b-col md="7" cols="12">
                      <b-card class="shadow">
                        <b-row>
                          <b-col v-if="formValues.display_picture" cols="12">
                            <div class="container">
                              <img
                                :src="formValues.display_picture"
                                alt="card_image"
                                width="100%"
                                class="mt-2"
                              />
                              <div
                                class="overlay mt-2"
                                @click="showConfirmDialog()"
                              >
                                Remove Photo
                              </div>
                            </div>
                          </b-col>
                          <b-col v-if="!formValues.display_picture" cols="12">
                            <b-card
                              class="text-center pointer px-3"
                              @click="displayForm = true"
                            >
                              <div class="font-weight-bold text-secondary">
                                Add New Image
                              </div>
                              <plus-svg class="svg-icons"></plus-svg>
                            </b-card>
                          </b-col>
                        </b-row>
                      </b-card>
                    </b-col>
                  </b-row>
                  <!-- Primary Picture end -->
                  <b-row align-h="center" align-v="center" class="pb-3">
                    <b-col md="12" cols="12">
                      <div class="text-secondary">
                        If you want to delete this venue, please contact
                        administrator email with valid reasons on why you want
                        to delete the venue.
                      </div>
                      <div>administrator email: info@nawarti.com</div>
                    </b-col>
                  </b-row>
                </b-form>
              </validation-observer>
            </b-col>
          </b-row>
          <b-row class="bg-white">
            <b-col cols="12" md="12" class="text-right">
              <div class="p-2">
                <b-button
                  size="lg"
                  variant="light"
                  @click="
                    $router.push({
                      name: 'admin-slug-settings',
                      params: { slug: $route.params.slug }
                    })
                  "
                >
                  Cancel
                </b-button>
                <b-button size="lg" variant="accent3-800" @click="updateData()">
                  Save
                </b-button>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-overlay>
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
            formValues.display_picture = $event
            displayForm = false
          "
        ></image-upload>
      </b-modal>
    </page-wrapper>
  </client-only>
</template>

<script>
import ImageUpload from '@/components/common/ImageUploadWithoutApi'
import PageWrapper from '@/components/common/PageWrapper'
import { retrieveMixin, updateMixin } from '@/mixins/FormMixins'
import settingsApi from '@/api/settings'
import AutoComplete from '@/components/common/AutoComplete'
import AutoCompleteMultiple from '@/components/common/AutoCompleteMultiple'
import Instagram from '@/helpers/icons/instagram.svg?inline'
import Facebook from '@/helpers/icons/facebook.svg?inline'
import Website from '@/helpers/icons/website.svg?inline'
import PlusSvg from '@/helpers/icons/plus.svg?inline'
import InputWithLanguageSwitch from '@/components/common/LanguageSwitchInput'
import InputAreaWithLanguageSwitch from '@/components/common/LanguageSwitchInputArea'
import VeeValidate from '@/mixins/veeValidate'

export default {
  components: {
    PageWrapper,
    ImageUpload,
    AutoComplete,
    AutoCompleteMultiple,
    Website,
    Facebook,
    Instagram,
    PlusSvg,
    InputWithLanguageSwitch,
    InputAreaWithLanguageSwitch
  },
  mixins: [retrieveMixin, updateMixin, VeeValidate],
  middleware: 'auth',
  data() {
    return {
      formValues: {
        name: '',
        main_category: '',
        categories: [],
        description: '',
        email: '',
        phone_number: '',
        website: '',
        facebook: '',
        instagram: '',
        gender_preference: 'all',
        age_preference: 'all',
        amenities: [],
        is_active: false,
        display_picture: null,
        venue_opening_hours: []
      },
      mainCategoryKey: 0,
      categoriesKey: 0,
      amenitiesKey: 0,
      displayForm: false,
      categoryEndpoint: '/api/v1/venue/category/',
      amenitiesEndpoint: '/api/v1/venue/amenity/',
      genderOptions: [
        { value: 'Female', text: 'Female Only' },
        { value: 'Male', text: 'Male Only' },
        { value: 'All', text: 'Both' }
      ],
      ageOptions: [
        { value: 'Kids', text: 'Kids Only' },
        { value: 'Adult', text: 'Adults Only' },
        { value: 'All', text: 'All' }
      ],
      crudInfo: {
        name: 'Settings',
        results: [],
        endpoint: {
          get: settingsApi.getVenueDetails(this.$route.params.slug),
          update: settingsApi.updateVenueDetails(this.$route.params.slug)
        }
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getFormValues() {
      const postData = this.formValues
      postData.categories = this.formValues.categories.map(x => x.slug)
      postData.amenities = this.formValues.amenities.map(x => x.slug)
      if (!this.isNewImage(postData.display_picture)) {
        delete postData.display_picture
      }
      if (postData.website === '') {
        postData.website = null
      }
      return this.formValues
    },
    isNewImage(s) {
      if (s) {
        return !!s.match(';base64')
      }
      return true
    },
    fetchSuccess() {
      this.formValues = this.crudInfo.results
      this.formValues.main_category =
        this.crudInfo.results.main_category &&
        this.crudInfo.results.main_category.slug
      this.mainCategoryKey = 1
      this.categoriesKey = 1
      this.amenitiesKey = 1
    },
    updateSuccess() {
      this.getData()
      this.resetAllFields()
      this.fieldErrors = {}
    },
    showConfirmDialog(id) {
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
            this.formValues.display_picture = null
          }
        })
    }
  }
}
</script>
<style scoped>
.z-index-0 {
  z-index: 0;
}
.svg-icons {
  height: 20px;
  width: 20px;
}
@media only screen and (max-width: 400px) {
  .h-divider {
    margin-top: 5px;
    margin-bottom: 10px;
    height: 1px;
    width: 100%;
    border-top: 1px solid rgb(201, 190, 190);
  }
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
  background: rgba(0, 0, 0, 0.5); /* Black see-through */
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
</style>
