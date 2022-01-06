<template>
  <div class="bg-light">
    <create-form form-type="Create"></create-form>
  </div>
</template>
<script>
import CreateForm from '@/components/client/CreateForm.vue'
export default {
  components: { CreateForm },
  layout: 'empty',
  middleware: 'auth'
}
</script>
