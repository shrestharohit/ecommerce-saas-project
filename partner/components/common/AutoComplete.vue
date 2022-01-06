<template>
  <b-form-select
    v-model="selectedItem"
    :options="itemsList"
    :value-field="valueField"
    :text-field="textField"
    :state="state"
    :disabled="readOnly"
  >
    <template #first>
      <b-form-select-option value="" disabled>
        Please select an option
      </b-form-select-option>
    </template>
  </b-form-select>
</template>
<script>
import veeValidate from '@/mixins/veeValidate'
export default {
  mixins: [veeValidate],
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    items: {
      type: Array,
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
      default: 'text'
    },
    valueField: {
      type: String,
      default: 'value'
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    state: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      selectedItem: this.value,
      itemsList: this.items
    }
  },
  watch: {
    selectedItem(val) {
      this.$emit('input', val)
      const data = this.itemsList.find(x => x.id === val || x.slug === val)
      this.$emit('fulldata', data)
    }
  },
  mounted() {
    this.populateOnFocus()
  },
  methods: {
    populateOnFocus() {
      if (this.endpoint) {
        this.getData()
      }
    },
    getData() {
      this.$axios
        .$get(this.endpoint)
        .then(response => {
          this.itemsList = response.results
          this.$emit('datafromapi', response.results)
        })
        .catch(() => {
          this.showSnackbar('Error while fetching data.', 'danger')
        })
    }
  }
}
</script>
