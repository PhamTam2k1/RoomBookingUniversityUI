<template>
  <div class="t-loading" :class="{ 'show-loading': isShowLoading }">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  props: ['isShowLoading'], // biến showloading
}
</script>

<style>
@import url('../../styles/components/loading.css');
</style>
