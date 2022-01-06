<template>
  <b-card no-body class="shadow">
    <b-row
      class="text-center px-3 pt-3"
      align-v="center"
      @click="$emit('open', actionData.slug)"
    >
      <b-col md="4">
        <img :src="actionData.display_picture" alt="card_image" width="100%" />
      </b-col>
      <b-col md="8" align="left">
        <h3 class="font-weight-bold">
          {{ actionData.name }}
        </h3>
        <div class="text-secondary">
          {{ actionData.venue_address && actionData.venue_address[0].address }}
        </div>
      </b-col>
      <template v-for="item in actionData.services || []">
        <b-col :key="item.id" md="12"><hr class="my-2" /></b-col>
        <b-col :key="item.id" md="6" align="left">
          <div>{{ item.title }}</div>
          <div class="text-secondary">
            <small>
              {{ item.service_pricing_options[0].title }}
            </small>
          </div>
        </b-col>
        <b-col :key="item.id" md="6" align="right">
          <h4 class="text-accent3-900 pr-1">
            £{{ item.service_pricing_options[0].real_price }}
          </h4>
        </b-col>
      </template>
    </b-row>
    <hr />
    <b-row class="px-3 pb-3">
      <b-col align="left" class="text-primary">
        <div v-if="!showMore">Quick View Venue Details</div>
      </b-col>
      <b-col align="right">
        <div v-if="showMore" class="pointer" @click="showMore = false">
          <arrow-up class="svg-icons"></arrow-up>
        </div>
        <div v-if="!showMore" class="pointer" @click="showMore = true">
          <arrow-down class="svg-icons"></arrow-down>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="showMore" class="px-3 pb-3">
      <b-col :md="mapView ? '12' : '5'" align="left" class="pb-2">
        <div class="text-primary">Opening Hours:</div>
        <div
          v-for="(item, index) in actionData.venue_opening_hours"
          :key="index"
        >
          <b-row>
            <b-col md="4"> {{ item.weekday }}</b-col>
            <b-col md="8">{{ item.start_time }} - {{ item.end_time }}</b-col>
          </b-row>
        </div>
      </b-col>
      <b-col :md="mapView ? '12' : '7'" align="left" class="pb-2">
        <div class="text-primary">Description:</div>
        {{ actionData.description }}
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import ArrowUp from '@/helpers/icons/arrow-up.svg?inline'
import ArrowDown from '@/helpers/icons/arrow-down.svg?inline'
export default {
  components: { ArrowUp, ArrowDown },
  props: {
    actionData: {
      type: Object,
      default() {
        return {}
      }
    },
    mapView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showMore: false
    }
  }
}
</script>
<style scoped>
.svg-icons {
  height: 20px;
  width: 20px;
}
</style>
