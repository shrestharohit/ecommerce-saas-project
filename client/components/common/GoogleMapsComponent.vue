<template>
  <div>
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="zoom"
      :map-style-id="mapStyle"
      :options="options"
      class="map-width map-height"
    >
      <gmap-marker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        @click="toggleInfoWindow(m, index)"
      >
      </gmap-marker>

      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        <div class="overflow-hidden pointer" style="max-width: 220px">
          <b-row @click="$emit('open', selectedMarker.slug)">
            <b-col md="7">
              <img
                :src="selectedMarker.display_picture"
                alt="card_image"
                width="100%"
              />
            </b-col>
            <b-col md="5" align="left" class="px-0 mx-0">
              <h6>{{ selectedMarker.name }}</h6>
              <div class="text-secondary">
                {{ selectedMarker.address }}
              </div>
            </b-col>
          </b-row>
        </div>
      </gmap-info-window>
    </GmapMap>
  </div>
</template>
<script>
export default {
  name: 'GoogleMap',
  props: {
    value: {
      type: [Array, Object],
      default() {
        return {}
      }
    },
    zoom: {
      type: Number,
      default: 15
    },
    mapStyle: {
      type: String,
      default: 'terrain'
    },
    options: {
      type: Object,
      default() {
        return {
          disableDefaultUI: false
        }
      }
    }
  },
  data() {
    return {
      center: { lat: 52.51195, lng: 6.089625 },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      selectedMarker: {},
      markers: []
    }
  },
  mounted() {
    this.value.forEach(x => {
      this.markers.push({
        slug: x.slug,
        name: x.name,
        address: (x.venue_address && x.venue_address[0].address) || '',
        display_picture: x.display_picture,
        position: {
          lat: x.venue_address[0].latitude,
          lng: x.venue_address[0].longitude
        }
      })
    })
    this.center = {
      lat: this.value[0].venue_address[0].latitude,
      lng: this.value[0].venue_address[0].longitude
    }
  },
  methods: {
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position
      this.selectedMarker = marker

      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    }
  }
}
</script>
<style scoped>
.map-width {
  width: 100%;
}
.map-height {
  height: 100vh;
}
</style>
