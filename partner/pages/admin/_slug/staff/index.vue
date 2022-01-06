<template>
  <page-wrapper :title="'Staff'" no-border-bottom>
    <template #tabs>
      <b-tabs
        v-model="selectedTab"
        lazy
        small
        nav-wrapper-class="pt-0 bg-white"
        active-nav-item-class="font-weight-bold text-accent3-600"
      >
        <template #tabs-end>
          <b-tab
            v-for="(item, index) in tabs"
            :key="index"
            :title="item"
          ></b-tab>
        </template>
      </b-tabs>
    </template>
    <div class="p-4 overflow-hidden">
      <employees v-if="selectedTab == 0"></employees>
      <schedule v-if="selectedTab == 1"></schedule>
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/common/PageWrapper'
import Schedule from '@/components/staff/schedule'
import Employees from '@/components/staff/employees'

export default {
  components: {
    PageWrapper,
    Schedule,
    Employees
  },
  middleware: 'auth',
  data() {
    return {
      selectedTab: 0,
      tabs: ['Staff Members', 'Staff Working Hours']
    }
  }
}
</script>
