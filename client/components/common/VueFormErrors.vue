<template>
  <div>
    <b-alert
      v-if="nonFieldErrors.length !== 0"
      variant="danger"
      dismissible
      fade
    >
      <strong class="text-danger"> There are some errors </strong>
      <div v-for="(value, index) in nonFieldErrors" :key="index">
        <div v-for="(error, objKey) in value" :key="objKey" class="text-danger">
          <span v-text="`${index + 1} )`" />
          <span v-text="error.message" />
        </div>
      </div>
    </b-alert>
  </div>
</template>
<script>
export default {
  props: {
    nonFieldErrors: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      key: '',
      dismissSecs: 5
    }
  }
}
</script>
