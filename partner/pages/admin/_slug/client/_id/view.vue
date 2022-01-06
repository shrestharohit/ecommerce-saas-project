<template>
  <page-wrapper :title="title">
    <view-form></view-form>
  </page-wrapper>
</template>
<script>
import PageWrapper from '@/components/common/PageWrapper'
import ViewForm from '@/components/client/ViewForm.vue'
export default {
  components: { ViewForm, PageWrapper },
  middleware: 'auth',
  data() {
    return {
      title: 'Client Profile'
    }
  }
}
</script>
