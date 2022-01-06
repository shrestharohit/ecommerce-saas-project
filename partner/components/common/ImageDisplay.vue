<template>
  <div>
    <b-card class="shadow">
      <b-row v-if="actionData && actionData.length">
        <b-col
          v-for="(item, index) in actionData"
          :key="index"
          md="4"
          cols="12"
          class="pb-3"
        >
          <div class="container">
            <img :src="item.image" alt="card_image" width="100%" />
            <div class="overlay" @click="showConfirmDialog(item.id)">
              Remove Photo
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="4">
          <b-card
            class="text-center pointer shadow py-2"
            @click="addNewPhoto()"
          >
            <div class="p-0 card-text">
              <div class="font-weight-bold text-secondary">Add New</div>
              <plus-svg class="svg"></plus-svg>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col cols="12" md="12">
          <b-card class="text-center pointer px-3" @click="addNewPhoto()">
            <div class="font-weight-bold text-secondary">Add New Image</div>
            <plus-svg class="svg"></plus-svg>
          </b-card>
        </b-col>
      </b-row>
    </b-card>
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
          displayForm = false
          $emit('create')
        "
      ></image-upload>
    </b-modal>
  </div>
</template>
<script>
import ImageUpload from '@/components/common/ImageUpload'
import PlusSvg from '@/helpers/icons/plus.svg?inline'
import veeValidate from '@/mixins/veeValidate'

export default {
  components: {
    ImageUpload,
    PlusSvg
  },
  mixins: [veeValidate],
  props: {
    actionData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      displayForm: false
    }
  },
  methods: {
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
            this.removePhoto(id)
          }
        })
    },
    removePhoto(id) {
      const endpoint = `api/v1/control-panel/${this.$route.params.slug}/image/${id}/`
      this.$axios
        .$delete(endpoint)
        .then(() => {
          this.showSnackbar(`Successfully Deleted image`, 'success')
          this.$emit('create')
        })
        .catch(error => {
          this.getError(error)
        })
    },
    addNewPhoto() {
      this.displayForm = true
    }
  }
}
</script>
<style scoped>
.svg {
  height: 16px;
  width: 16px;
  fill: rgb(80, 94, 128);
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
  padding-top: 30%;
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
