<template>
  <div>{{ error.statusCode }} Error Page</div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: `${this.error.statusCode} Error`
    }
  }
}
</script>
