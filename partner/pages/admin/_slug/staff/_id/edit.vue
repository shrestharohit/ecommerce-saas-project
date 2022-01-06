<template>
  <div class="bg-light">
    <create-form form-type="Update"></create-form>
  </div>
</template>
<script>
import CreateForm from '@/components/staff/Forms/CreateStaff'
export default {
  components: { CreateForm },
  layout: 'empty',
  middleware: 'auth'
}
</script>
