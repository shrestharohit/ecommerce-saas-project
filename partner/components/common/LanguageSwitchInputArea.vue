<template>
  <b-form-group class="small font-weight-bold" :label="label">
    <b-tabs lazy small>
      <b-tab title="English" title-link-class="tab">
        <b-form-textarea
          :key="enComponentKey"
          v-model="selectedItemEn"
          :state="state ? false : null"
          placeholder="Enter something ..."
        />
        <b-form-invalid-feedback>
          {{ state }}
        </b-form-invalid-feedback>
      </b-tab>
      <b-tab title="Arabic" title-link-class="tab">
        <b-form-textarea
          :key="arComponentKey"
          v-model="selectedItemAr"
          placeholder="Enter Something ..."
          dir="rtl"
        />
      </b-tab>
    </b-tabs>
  </b-form-group>
</template>
<script>
import veeValidate from '@/mixins/veeValidate'
export default {
  mixins: [veeValidate],
  props: {
    value: {
      type: String,
      default: ''
    },
    arabic: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      selectedItemEn: '',
      selectedItemAr: '',
      initialLoad: true,
      enComponentKey: 0,
      arComponentKey: 1
    }
  },
  watch: {
    value(val) {
      if (this.initialLoad) {
        this.selectedItemEn = val
        this.enComponentKey = 2
        this.selectedItemAr = this.arabic
        this.arComponentKey = 3
        this.initialLoad = false
      }
    },
    selectedItemEn(val) {
      this.$emit('input', val)
    },
    selectedItemAr(val) {
      this.$emit('update:arabic', val)
    }
  }
}
</script>
<style scoped>
.tab-content textarea {
  border: 0;
  border-bottom: 1px solid rgb(206, 212, 218);
  border-left: 1px solid rgb(206, 212, 218);
  border-right: 1px solid rgb(206, 212, 218);
  border-radius: 0;
}
</style>
