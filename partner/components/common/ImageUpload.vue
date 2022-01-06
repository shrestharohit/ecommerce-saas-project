<template>
  <validation-observer ref="observer">
    <b-form>
      <b-row align-v="center">
        <b-col cols="12" md="12" class="pb-3">
          <div v-if="!attachment">
            <validation-provider
              v-slot="{ errors, valid }"
              rules="required"
              name="Attachment"
            >
              <b-form-group class="small" label="Attachment">
                <b-form-file
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  :state="
                    errors[0] || fieldErrors.image ? false : valid ? true : null
                  "
                  @change="handleImage"
                />
                <b-form-invalid-feedback>
                  {{ errors[0] || fieldErrors.image }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </div>
          <cropper
            v-if="attachment"
            :src="attachment"
            class="cropper mt-2"
            :stencil-props="{
              aspectRatio: 4 / 3
            }"
            @change="change"
          ></cropper>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right">
          <b-button size="md" variant="light" @click="clearData()">
            Reset
          </b-button>
          <b-button size="md" variant="accent3-800" @click="addData()">
            Save
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>
<script>
import { createMixin } from '@/mixins/FormMixins'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
export default {
  components: {
    Cropper
  },
  mixins: [createMixin],
  data() {
    return {
      formValues: {
        image: null
      },
      fileName: '',
      attachment: null,
      crudInfo: {
        name: 'Venue',
        endpoint: {
          create: `/api/v1/control-panel/${this.$route.params.slug}/image/`
        }
      }
    }
  },
  methods: {
    change({ canvas }) {
      this.formValues.image = canvas.toDataURL()
    },
    handleImage(e) {
      const fileObject = e.target.files[0]
      this.fileName = fileObject.name
      const reader = new FileReader()
      reader.onload = e => {
        this.attachment = e.target.result
      }
      reader.readAsDataURL(fileObject)
    },
    clearData() {
      this.attachment = null
      this.formValues.image = null
    }
  }
}
</script>
<style scoped>
.cropper {
  background: #ddd;
}
</style>
