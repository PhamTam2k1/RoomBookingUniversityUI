<template>
  <div :class="markDataCell(cellData)">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    cellData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    markDataCell(cellData) {
      const date = new Date(cellData.startDate)
      const isDisableDate = date < new Date()

      return {
        'disable-date': isDisableDate,
      }
    },
  },
}
</script>
