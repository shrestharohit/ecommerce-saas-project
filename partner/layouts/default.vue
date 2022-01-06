<template>
  <div>
    <div
      v-if="!hideSidebar"
      class="sidebar bg-accent3-900 smooth"
      :style="mini ? 'width: 3rem' : 'width: 14rem'"
    >
      <div class="pl-2 ml-1 pt-4 pb-2 fixed-top">
        <component :is="key" class="svg" @click="toggleSidebar()" />
      </div>
      <div class="mt-5 pt-4">
        <div v-for="(item, index) in sidebarItems" :key="index">
          <div
            v-if="
              getSwitchedVenue &&
              item.permission.includes(getSwitchedVenue.role)
            "
            class="px-1"
          >
            <div
              class="p-2 rounded pointer"
              :class="
                item.name.toLowerCase() === $route.path.split('/')[3]
                  ? 'bg-accent3-700'
                  : ''
              "
            >
              <a
                @click="
                  $router.push({
                    name: item.path,
                    params: { slug: $route.params.slug }
                  })
                "
              >
                <component :is="item.icon" class="svg" />
                <span class="pl-2" v-text="item.name"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="smooth"
      :style="
        hideSidebar ? '' : mini ? 'padding-left: 3rem' : 'padding-left: 14rem'
      "
    >
      <nuxt></nuxt>
    </div>
  </div>
</template>
<script>
import Home from '@/helpers/icons/home.svg?inline'
import ListArrowLeft from '@/helpers/icons/list-arrow-left.svg?inline'
import ListArrowRight from '@/helpers/icons/list-arrow-right.svg?inline'
import Client from '@/helpers/icons/client.svg?inline'
import Staff from '@/helpers/icons/staff.svg?inline'
import Venue from '@/helpers/icons/venue.svg?inline'
import Services from '@/helpers/icons/services.svg?inline'
import Settings from '@/helpers/icons/settings.svg?inline'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    Home,
    ListArrowLeft,
    ListArrowRight,
    Client,
    Staff,
    Venue,
    Services,
    Settings
  },
  layout: 'empty',
  data() {
    return {
      mini: true,
      key: 'list-arrow-right',
      sidebarItems: [
        {
          name: 'Dashboard',
          icon: 'home',
          path: 'admin-slug-dashboard',
          permission: [
            'No Permission',
            'Basic',
            'Individual',
            'Reception',
            'Owner'
          ]
        },
        {
          name: 'Venue',
          icon: 'venue',
          path: 'admin-slug-venue',
          permission: [
            'No Permission',
            'Basic',
            'Individual',
            'Reception',
            'Owner'
          ]
        },
        {
          name: 'Client',
          icon: 'client',
          path: 'admin-slug-client',
          permission: ['Basic', 'Individual', 'Reception', 'Owner']
        },
        {
          name: 'Staff',
          icon: 'staff',
          path: 'admin-slug-staff',
          permission: ['Basic', 'Individual', 'Reception', 'Owner']
        },
        {
          name: 'Services',
          icon: 'services',
          path: 'admin-slug-services',
          permission: ['Owner']
        },
        {
          name: 'Settings',
          icon: 'settings',
          path: 'admin-slug-settings',
          permission: ['Owner']
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      hideSidebar: 'common/getKey',
      getSwitchedVenue: 'venue/getSwitchedVenue'
    })
  },
  mounted() {
    if (this.isAuthenticated) {
      this.$axios.get('/api/v1/control-panel/venue/').then(response => {
        this.setSwitchableVenues(response.data.results)
        const dataInLocalStorage = JSON.parse(
          localStorage.getItem('activeVenue')
        )
        if (dataInLocalStorage) {
          this.setSwitchedVenue(dataInLocalStorage)
        } else {
          this.setSwitchedVenue(response.data.results[0])
        }
      })
    }
    window.addEventListener('resize', e => {
      this.setScreenSize(e.target.innerWidth)
    })
    this.setScreenSize(window.innerWidth)
  },
  methods: {
    setScreenSize(size) {
      this.setKey(size < 500)
    },
    ...mapMutations({
      setKey: 'common/setKey',
      setSwitchedVenue: 'venue/setSwitchedVenue',
      setSwitchableVenues: 'venue/setSwitchableVenues'
    }),
    toggleSidebar() {
      if (this.mini) {
        this.mini = false
        this.key = 'list-arrow-left'
      } else {
        this.mini = true
        this.key = 'list-arrow-right'
      }
    }
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
  width: 2px;
  background: rgb(45, 42, 53);
}

.sidebar {
  height: 100%;
  width: 3rem;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  white-space: nowrap;
}

.sidebar a {
  text-decoration: none;
  font-size: 15px;
  color: #fffdfd;
  display: block;
}

.svg {
  filter: invert(1);
  height: 25px;
  width: 25px;
}
</style>
