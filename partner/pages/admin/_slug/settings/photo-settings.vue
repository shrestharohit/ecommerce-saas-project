<template>
  <page-wrapper :title="'Photo Settings'">
    <b-overlay :show="loading" rounded="sm">
      <div class="overflow-x-hidden pt-4">
        <b-row align-h="center" align-v="center" class="px-2">
          <b-col md="11" cols="12">
            <a
              class="pointer"
              @click="
                $router.push({
                  name: 'admin-slug-settings',
                  params: { slug: $route.params.slug }
                })
              "
            >
              Go Back to Previous Page
            </a>
            <b-form>
              <!-- Carousel Images start -->
              <b-row align-h="center" align-v="center" class="pb-3">
                <b-col md="12" cols="12" class="pb-4">
                  <div class="font-weight-bold">
                    <h3>Carousel Images</h3>
                  </div>
                  <div class="text-secondary small">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Alias iusto odit perspiciatis recusandae neque mollitia
                    consectetur.
                  </div>
                </b-col>
                <b-col md="12" cols="12">
                  <image-component
                    :action-data="formValues.carousel_images"
                    @create="getData()"
                  ></image-component>
                </b-col>
              </b-row>
              <!-- Carousel Images end -->
            </b-form>
          </b-col>
        </b-row>
      </div>
    </b-overlay>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/common/PageWrapper'
import { retrieveMixin } from '@/mixins/FormMixins'
import ImageComponent from '@/components/common/ImageDisplay'
export default {
  components: {
    PageWrapper,
    ImageComponent
  },
  mixins: [retrieveMixin],
  middleware: 'auth',
  data() {
    return {
      formValues: {
        carousel_images: []
      },
      crudInfo: {
        name: 'Photo Settings',
        results: [],
        autoFetch: true,
        endpoint: {
          get: `api/v1/control-panel/${this.$route.params.slug}/image/`
        }
      }
    }
  },
  methods: {
    fetchSuccess() {
      this.formValues.carousel_images = this.crudInfo.results.results
    }
  }
}
</script>
