<template>
  <div id="page-container">
    <div class="sticky z-index-1000 bg-white shadow-sm">
      <div class="container">
        <b-navbar toggleable="lg" class="navbar-horizontal">
          <b-navbar-brand>
            <div class="pointer" @click="$router.push({ name: 'index' })">
              <img
                src="/logo/full/dark shades/nawarti.svg"
                width="85"
                alt="Nawarti Logo"
              />
            </div>
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav small class="ml-auto">
              <b-nav-item
                class="text-accent1-500 pointer"
                @click="$router.push({ name: 'account-login' })"
              >
                LOG IN
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
    <div id="content-wrap" class="bg-light">
      <div class="container">
        <nuxt></nuxt>
      </div>
    </div>
    <div
      id="footer"
      class="bg-accent1-500 text-white text-md-start text-size-14"
    >
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Footer from '@/components/common/Footer'
export default {
  components: {
    Footer
  },
  data() {
    return {
      desktop: false
    }
  },
  mounted() {
    window.addEventListener('resize', e => {
      this.setScreenSize(e.target.innerWidth)
    })
    this.setScreenSize(window.innerWidth)
  },
  methods: {
    setScreenSize(size) {
      this.desktop = size > 992
      if (this.desktop) {
        console.log('Desktop Mode') //eslint-disable-line
      }
    }
  }
}
</script>
<style scoped>
@media only screen and (min-width: 992px) {
  #page-container {
    position: relative;
    min-height: 100vh;
  }
  #footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 17rem;
  }
  #content-wrap {
    padding-bottom: 17rem;
  }
}
.text-size-14 {
  font-size: 14px;
}
</style>
