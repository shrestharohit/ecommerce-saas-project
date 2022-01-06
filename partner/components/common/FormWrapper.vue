<template>
  <b-overlay :show="loading" rounded="sm">
    <div class="vh-100 bg-light overflow-x-hidden">
      <div class="bg-white sticky z-index-1000 border-bottom">
        <b-navbar class="container">
          <div class="navbar-collapse w-100"></div>
          <div class="mx-auto navbar-brand title">{{ title }}</div>
          <div class="navbar-collapse w-100">
            <div class="ml-auto">
              <img
                src="@/helpers/icons/close.svg"
                height="20"
                @click="$emit('close')"
              />
            </div>
          </div>
        </b-navbar>
      </div>
      <div class="bg-light">
        <slot></slot>
      </div>
      <b-row class="border-top sticky fixed-bottom bg-white">
        <b-col class="text-right">
          <b-container>
            <slot name="actions"></slot>
          </b-container>
        </b-col>
      </b-row>
    </div>
  </b-overlay>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
.title {
  font-size: 25px;
  font-weight: bolder;
}
.overflow-x-hidden {
  overflow-x: hidden;
}
</style>
