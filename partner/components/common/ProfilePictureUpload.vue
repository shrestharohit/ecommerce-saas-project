<template>
  <validation-observer ref="observer">
    <b-form>
      <b-row align-v="center">
        <b-col cols="12" md="12" class="pb-3">
          <div v-if="!attachment">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="Attachment"
            >
              <b-form-group class="small" label="Attachment">
                <b-form-file
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  :state="errors[0] || errorMessage ? false : null"
                  @change="handleImage"
                />
                <b-form-invalid-feedback>
                  {{ errors[0] || errorMessage }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </div>
          <cropper
            v-if="attachment"
            :src="attachment"
            class="cropper mt-2"
            :stencil-props="{
              aspectRatio: 2 / 2
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
          <b-button
            size="md"
            variant="accent3-800"
            :disabled="errorMessage ? true : false"
            @click="saveData()"
          >
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
      image: null,
      fileName: '',
      attachment: null,
      errorMessage: ''
    }
  },
  methods: {
    saveData() {
      this.$emit('create', this.image)
    },
    change({ canvas }) {
      this.image = canvas.toDataURL()
    },
    handleImage(e) {
      const fileObject = e.target.files[0]
      this.validateImage(fileObject)
      if (!this.errorMessage) {
        this.fileName = fileObject.name
        const reader = new FileReader()
        reader.onload = e => {
          this.attachment = e.target.result
        }
        reader.readAsDataURL(fileObject)
      }
    },
    validateImage(file) {
      this.errorMessage = ''
      if (file.size > 2 * 1024 * 1024) {
        this.errorMessage = 'File size cannot be greater than 2MB.'
        return
      }
      const validExtensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG']
      const fileName = file.name.substr(0)
      const extension = fileName.split('.').pop()
      if (!validExtensions.includes(extension)) {
        this.errorMessage = `Invalid Extension. Use ${validExtensions.toString()}`
      }
    },
    clearData() {
      this.attachment = null
      this.image = null
      this.errorMessage = ''
      this.fileName = ''
    }
  }
}
</script>
<style scoped>
.cropper {
  background: #ddd;
}
</style>
