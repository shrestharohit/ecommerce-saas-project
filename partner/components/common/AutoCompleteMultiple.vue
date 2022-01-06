<template>
  <multiselect
    v-model="selectedItem"
    :options="itemsList"
    :label="textField"
    :track-by="valueField"
    placeholder="Please select an option"
    multiple
  ></multiselect>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components: { Multiselect },
  props: {
    value: {
      type: [Array],
      default() {
        return []
      }
    },
    endpoint: {
      type: String,
      default: ''
    },
    textField: {
      type: String,
      default: 'title'
    },
    valueField: {
      type: String,
      default: 'slug'
    }
  },
  data() {
    return {
      selectedItem: [],
      itemsList: []
    }
  },
  watch: {
    selectedItem(val) {
      this.$emit('input', val)
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      if (!this.endpoint) return
      this.$axios.$get(this.endpoint).then(response => {
        this.itemsList = response.results
        this.$emit('result')
        const selectedData = this.value.map(x => x.slug)
        this.selectedItem = response.results.filter(x =>
          selectedData.includes(x.slug)
        )
      })
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
