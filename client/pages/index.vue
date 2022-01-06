<template>
  <search-section></search-section>
</template>
<script>
import SearchSection from '@/components/venue/SearchComponent'
export default {
  components: {
    SearchSection
  },
  middleware: 'anonymous'
}
</script>
