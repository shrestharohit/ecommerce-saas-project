<template>
  <b-card no-body class="shadow pointer" @click="redirectToDetailPage()">
    <b-row class="text-center" align-v="center">
      <b-col md="12">
        <img :src="actionData.display_picture" alt="card_image" width="100%" />
      </b-col>
      <b-col md="12" align="left">
        <h3 class="px-3 pt-2 font-weight-bold">
          {{ actionData.name }}
        </h3>
        <div class="px-3 pb-2 text-secondary">
          {{ actionData.venue_address && actionData.venue_address[0].address }}
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
export default {
  props: {
    actionData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    redirectToDetailPage() {
      this.$router.push({
        name: 'venue-slug',
        params: { slug: this.actionData.slug }
      })
    }
  }
}
</script>
