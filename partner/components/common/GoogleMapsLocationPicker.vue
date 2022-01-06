<template>
  <div>
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="zoom"
      :map-style-id="mapStyle"
      :options="options"
      class="map-width map-height"
      @click="handleMapClick"
    >
      <GmapMarker
        :position="marker"
        :clickable="clickable"
        :draggable="draggable"
        @drag="handleMarkerDrag"
        @click="panToMarker"
      />
    </GmapMap>
  </div>
</template>
<script>
import veeValidate from '@/mixins/veeValidate'
import axios from 'axios'
export default {
  mixins: [veeValidate],
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    zoom: {
      type: Number,
      default: 12
    },
    mapStyle: {
      type: String,
      default: 'terrain'
    },
    clickable: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: false
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
      marker: { lat: 10, lng: 10 },
      center: { lat: 10, lng: 10 }
    }
  },
  watch: {
    marker(val) {
      this.$emit('input', val)
      this.getAddressFromLatLng(val)
    }
  },
  mounted() {
    if (Object.keys(this.value).length > 0) {
      this.center = this.value
      this.marker = this.value
      this.panToMarker()
    } else {
      this.geolocate()
    }
  },
  methods: {
    getAddressFromLatLng(val) {
      if (val) {
        const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${val.lat},${val.lng}&key=${process.env.gAPIKey}`
        axios.get(endpoint).then(response => {
          if (response.data.results.length > 0) {
            const data = response.data.results[0]
            this.$emit('address', data)
          }
          if (response.data.error_message) {
            const errorText =
              'Error while generating address. Please type in address manually to proceed.'
            this.showSnackbar(errorText, 'danger')
          }
        })
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.marker = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.panToMarker()
      })
    },
    handleMarkerDrag(e) {
      this.marker = { lat: e.latLng.lat(), lng: e.latLng.lng() }
    },
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker)
    },
    handleMapClick(e) {
      this.marker = { lat: e.latLng.lat(), lng: e.latLng.lng() }
    }
  }
}
</script>
<style scoped>
.map-width {
  width: 100%;
}
.map-height {
  height: 300px;
}
</style>
