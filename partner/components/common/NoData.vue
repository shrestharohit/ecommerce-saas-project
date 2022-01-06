<template>
  <div class="p-2">
    <b-row align-v="center" :style="`height: ${height}`">
      <b-col class="text-center">
        <div v-if="loading">
          <b-spinner class="align-middle"></b-spinner>
          <div v-text="'Please wait. Loading data ...'"></div>
        </div>
        <div v-else>
          <img v-if="svg" src="@/helpers/icons/badge.svg" height="100" />
          <img v-if="!svg" src="/misc/no-data-found.png" height="180" />
          <div class="text-black-50" v-text="text"></div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: 'No data available at the moment'
    },
    svg: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '300px'
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
