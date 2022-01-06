<template>
  <page-wrapper :title="'Settings'">
    <div class="overflow-hidden">
      <b-row align-h="center" align-v="center" class="pb-4 mb-4">
        <b-col md="10" cols="12" class="py-3">
          <b-row class="pb-4 pt-2">
            <b-col v-for="(item, index) in items" :key="index" md="7" cols="12">
              <b-card
                class="pointer shadow m-2"
                @click="
                  $router.push({
                    name: item.path,
                    params: { slug: $route.params.slug }
                  })
                "
              >
                <div class="card-text">
                  <div class="font-weight-bold">{{ item.name }}</div>
                  <div class="text-secondary small">
                    Here you can view the settings related to {{ item.name }}
                  </div>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </page-wrapper>
</template>
<script>
import PageWrapper from '@/components/common/PageWrapper'
export default {
  components: {
    PageWrapper
  },
  middleware: 'auth',
  data() {
    return {
      items: [
        {
          name: 'General Settings',
          path: 'admin-slug-settings-general-settings'
        },
        {
          name: 'Location Settings',
          path: 'admin-slug-settings-location-settings'
        },
        {
          name: 'Photo Settings',
          path: 'admin-slug-settings-photo-settings'
        }
      ]
    }
  }
}
</script>
