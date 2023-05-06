<template>
  <div class="t-content-tooltip">
    <div class="t-title-tooltip mgb-16">{{ room.RoomName }}</div>
    <div class="t-row-tooltip mgb-16 flex">
      <div class="t-lable-row">Sức chứa:</div>
      <div class="t-content-row-tooltip mgl-8p">{{ room.Capacity }} người</div>
    </div>
    <div class="t-row-tooltip mgb-16 flex">
      <div class="t-lable-row">Thiết bị:</div>
      <div class="t-content-row-tooltip mgl-8p">
        {{ room.ListEquipmentName }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    room: {
      type: Object,
    },
  },
}
</script>
<style scoped>
.t-content-tooltip {
  width: 200px;
  height: 120px;
  font-size: 15px;
  padding: 10px;
}
.t-title-tooltip {
  font-weight: 700;
  font-size: 14px;
}
.t-content-row-tooltip {
  font-weight: 700;
}
</style>
