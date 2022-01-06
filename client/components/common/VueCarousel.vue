<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <template v-for="(item, index) in actionData">
        <b-carousel-slide
          :key="index"
          :img-src="item.image"
          style="height: 50vh"
        ></b-carousel-slide>
      </template>
    </b-carousel>
  </div>
</template>

<script>
export default {
  props: {
    actionData: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  }
}
</script>
