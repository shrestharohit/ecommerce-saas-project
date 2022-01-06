<template>
  <client-only>
    <b-overlay :show="loading" rounded="sm">
      <b-container>
        <b-row align-v="center" align-h="center" class="g-0">
          <b-col cols="12" md="5" class="my-4 p-0 m-0">
            <b-card class="shadow">
              <div>
                <b-card-title
                  class="h3 font-weight-bold text-center text-primary1-700"
                >
                  Account Activated
                </b-card-title>
                <b-card-text class="pt-2">
                  <h6 class="text-center text-secondary pb-4">
                    {{ message }}
                  </h6>
                  <b-button
                    variant="primary1-700"
                    block
                    @click="$router.push({ name: 'account-login' })"
                  >
                    Go to Login Page
                  </b-button>
                </b-card-text>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-overlay>
  </client-only>
</template>
<script>
import accountApi from '@/api/account/index.js'
export default {
  middleware: 'anonymous',
  data() {
    return {
      message:
        'Your account has successfully been activated. Please login to continue.',
      loading: false
    }
  },
  created() {
    this.checkLinkValidity()
  },
  methods: {
    checkLinkValidity() {
      this.loading = true
      const endpoint = accountApi.activateAccount(
        this.$route.params.id,
        this.$route.params.token
      )
      this.$axios
        .$get(endpoint)
        .then(response => {
          if (response.status === 200) {
            this.loading = false
          } else {
            this.$router.push({ name: 'index' })
          }
        })
        .catch(e => {
          this.$router.push({ name: 'index' })
        })
    }
  }
}
</script>
