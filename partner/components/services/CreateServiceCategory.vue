<template>
  <validation-observer ref="observer">
    <b-form>
      <b-row align-v="center">
        <b-col cols="12" md="12">
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="Title"
          >
            <b-form-group class="small" label="Title">
              <b-form-input
                v-model="formValues.title"
                placeholder="Enter Title"
                :state="errors[0] || fieldErrors.title ? false : null"
                autocomplete="on"
                type="text"
              />
              <b-form-invalid-feedback>
                {{ errors[0] || fieldErrors.title }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col cols="12" md="12">
          <validation-provider v-slot="{ errors }" rules="" name="Description">
            <b-form-group class="small" label="Description">
              <b-form-input
                v-model="formValues.description"
                placeholder="Enter Description"
                :state="errors[0] || fieldErrors.description ? false : null"
                autocomplete="on"
                type="text"
              />
              <b-form-invalid-feedback>
                {{ errors[0] || fieldErrors.description }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right">
          <b-button size="md" variant="light" @click="clearData()">
            Clear
          </b-button>
          <b-button
            v-if="Object.keys(actionData).length"
            size="md"
            :disabled="actionData.services.length > 0"
            variant="danger"
            @click="deleteInfo()"
          >
            Delete
          </b-button>
          <b-button
            size="md"
            variant="accent3-800"
            @click="Object.keys(actionData).length ? updateData() : addData()"
          >
            {{ Object.keys(actionData).length ? 'Update' : 'Save' }}
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>
<script>
import { createMixin, updateMixin, deleteMixin } from '@/mixins/FormMixins'
import serviceApi from '@/api/services'
export default {
  mixins: [createMixin, updateMixin, deleteMixin],
  props: {
    actionData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      formValues: {},
      crudInfo: {
        name: 'Service Category',
        endpoint: {
          create: serviceApi.createCategory(this.$route.params.slug),
          update: '',
          delete: ''
        }
      }
    }
  },
  created() {
    if (Object.keys(this.actionData).length) {
      this.formValues = JSON.parse(JSON.stringify(this.actionData))
      this.crudInfo.endpoint.update = serviceApi.updateCategory(
        this.actionData.id,
        this.$route.params.slug
      )
      this.crudInfo.endpoint.delete = serviceApi.deleteCategory(
        this.actionData.id,
        this.$route.params.slug
      )
    }
  },
  methods: {
    clearData() {
      this.resetAllFields()
      this.formValues = {}
    }
  }
}
</script>
