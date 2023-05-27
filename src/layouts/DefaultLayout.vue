<template>
  <div>
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div class="body flex-grow-1">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
// import { CContainer } from '@coreui/vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    AppSidebar,
    // CContainer,
  },
}
</script>
.
<style scoped>
.min-vh-100 {
  min-height: 100vh !important;
  max-height: 100vh;
  /* font-family: Notosans; */
  /* font-family: Notosans;
  font-size: 16px; */
  /* overflow: hidden; */
}
</style>
