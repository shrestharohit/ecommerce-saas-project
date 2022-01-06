const facebookLogin = {
  created() {
    if (process.client) {
      this.loadFacebookSDK(document, 'script', 'facebook-jssdk')
      this.initFacebook()
    }
  },
  data() {
    return {
      constants: {
        sdkUrl: 'https://connect.facebook.net/en_US/sdk.js',
        facebookLoginScope: 'email'
      },
      loading: false
    }
  },
  methods: {
    loginWithFacebook() {
      const scope = this.constants.facebookLoginScope
      window.FB.login(this.handleFacebookAuthResponseChange, {
        scope
      })
    },
    handleFacebookAuthResponseChange(response) {
      if (response.status === 'connected') {
        this.handleAccessToken(response)
      }
    },
    initFacebook() {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: process.env.FB_CLIENT_ID,
          cookie: true,
          version: 'v13.0'
        })
      }
    },
    loadFacebookSDK(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      const js = d.createElement(s)
      js.id = id
      js.src = this.constants.sdkUrl
      fjs.parentNode.insertBefore(js, fjs)
    },
    handleAccessToken(response) {
      console.log('access_token: ' + response.authResponse.accessToken) //eslint-disable-line
      const token = response.authResponse.accessToken
      this.loading = true
      const url = `/api/v1/exchange_token/facebook/`
      this.$axios
        .$post(url, { access_token: token })
        .then(data => {
          setTimeout(async () => {
            await this.$auth.setStrategy('local')
            this.$auth.setUserToken(data.access)
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}

const googleLogin = {
  head() {
    return {
      meta: [
        {
          name: 'google-signin-scope',
          content: 'profile email'
        },
        {
          name: 'google-signin-client_id',
          content: process.env.GOOGLE_CLIENT_ID
        }
      ],
      script: [
        {
          src: 'https://apis.google.com/js/platform.js',
          defer: true,
          callback: () => {
            this.initializeGoogleApi()
          }
        }
      ]
    }
  },
  methods: {
    initializeGoogleApi() {
      window.gapi.load('auth2', function () {
        window.gapi.auth2.init({
          client_id: process.env.GOOGLE_CLIENT_ID,
          redirect_uri: 'http://localhost:3000/oauth2/callback/'
        })
      })
      console.log('Google API Initialized') //eslint-disable-line
    },
    loginWithGoogle() {
      this.loading = true
      const googleAuth = window.gapi.auth2.getAuthInstance()
      googleAuth
        .signIn()
        .then(() => {
          this.handleGoogleLoginSuccess()
        })
        .catch(e => {
          this.handleGoogleLoginError(e)
        })
    },
    handleGoogleLoginSuccess() {
      const googleAuth = window.gapi.auth2.getAuthInstance()
      const authUser = googleAuth.currentUser.get()
      const authResponse = authUser.getAuthResponse(true)
      const accessToken = authResponse.access_token
      // console.log(accessToken) //eslint-disable-line
      this.handleToken(accessToken)
    },
    handleGoogleLoginError(e) {
      console.log(e) //eslint-disable-line
      this.loading = false
    },
    handleToken(accessToken) {
      const url = `/api/v1/exchange_token/google-oauth2/`
      this.$axios
        .$post(url, { access_token: accessToken })
        .then(data => {
          setTimeout(async () => {
            await this.$auth.setStrategy('local')
            this.$auth.setUserToken(data.access)
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}

export { facebookLogin, googleLogin }
