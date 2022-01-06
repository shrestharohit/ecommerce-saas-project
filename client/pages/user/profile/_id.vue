<template>
  <div>
    <div>
      <strong>Username:</strong>
      {{ loggedInUser.full_name }}
    </div>
    <div>
      <strong>Email:</strong>
      {{ loggedInUser.email }}
    </div>
    <b-button @click="logout()">Logout</b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'empty',
  middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
