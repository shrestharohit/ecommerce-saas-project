export default {
  head: {
    title: 'Client | Nawarti',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/logo/english icon/dark shades/nawarti.svg'
      }
    ]
  },

  css: ['@/assets/app.scss'],

  plugins: ['~/plugins/axios.js', '~/plugins/google-maps.js'],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/dotenv'],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/svg'
  ],

  axios: {},

  auth: {
    redirect: {
      login: '/account/login',
      logout: '/',
      callback: '/oauth2/callback/',
      home: '/'
    },
    cookie: {
      options: {
        maxAge: 3600 // 1 hour
      }
    },
    strategies: {
      local: {
        token: {
          property: 'access'
        },
        user: {
          property: ''
        },
        endpoints: {
          login: {
            url: 'api/v1/auth/client-login/',
            method: 'post'
          },
          user: {
            url: '/api/v1/user/me/',
            method: 'get'
          },
          logout: false
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    plugins: ['~/plugins/auth.js']
  },

  build: {
    transpile: ['vee-validate/dist/rules'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // ...
    }
  }
}
