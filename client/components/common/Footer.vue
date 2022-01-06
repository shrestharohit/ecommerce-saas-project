<template>
  <div class="container">
    <div class="row py-4 text-white text-center text-lg-left">
      <div
        v-for="(title, index) in footerItemTitle"
        :key="index"
        class="col-lg-3 mb-4 mb-lg-0"
      >
        <ul class="list-unstyled mb-0">
          <li class="pb-2">{{ title }}</li>
          <li v-for="(item, index1) in footerItems[title]" :key="index1">
            <a :href="item.path" class="text-white">{{ item.name }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="row d-flex justify-content-between border-top">
      <div class="col-lg-2 text-center text-lg-left mb-0 mb-lg-0 pt-3">
        <a href="#!" class="text-white">Company</a>
      </div>
      <div class="col-lg-2 text-center text-lg-right mb-4 mb-lg-0 pt-3">
        <a href="#!" class="text-white">United Kingdom</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      footerItemTitle: ['Contact', 'Discover', 'Partners', 'Company'],
      footerItems: {
        Contact: [
          { name: 'Customer Help Center', path: '#' },
          { name: 'Contact Us', path: '#' }
        ],
        Discover: [
          { name: 'Treatment Guide', path: '#' },
          { name: 'The Treatment Files', path: '#' },
          { name: 'Nawarti Gift Card', path: '#' },
          { name: 'Sign Up for our newsletter', path: '#' },
          { name: 'Recommend a Salon', path: '#' },
          { name: 'The Nawarti Glossary', path: '#' }
        ],
        Partners: [
          { name: 'List Your Bussiness', path: '#' },
          { name: 'Partner Help Center', path: '#' }
        ],
        Company: [
          { name: 'About Us', path: '#' },
          { name: 'We are Hiring', path: '#' },
          { name: 'Legal', path: '#' },
          { name: 'Tax Strategy', path: '#' },
          { name: 'Mordern Slavery Statement', path: '#' },
          { name: 'Become an Affiliate', path: '#' }
        ]
      }
    }
  }
}
</script>
