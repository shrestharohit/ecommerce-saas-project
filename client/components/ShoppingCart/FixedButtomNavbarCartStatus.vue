<template>
  <div class="card container border-secondary bg-primary1-200">
    <b-row style="height: 60px">
      <b-col md="10" class="my-auto">
        <!-- {{
            `${$store.getters['shoppingCart/shortlistedServiceCount']} services from ${$store.getters['shoppingCart/shortlistedServiceTotalPrice']}`
          }} -->
        <span class="font-weight-bold">4 services</span> from
        <span class="font-weight-bold">$350</span>
      </b-col>
      <b-col
        md="2"
        align="right"
        class="text-center text-white bg-primary1-800 my-auto"
      >
        Choose time
      </b-col>
    </b-row>
  </div>
</template>
<style scoped>
.my-auto {
  padding-top: auto;
  padding-bottom: auto;
}
</style>
