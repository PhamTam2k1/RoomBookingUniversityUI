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
    <div class="t-title-tooltip mgb-16">NGƯỜI DUYỆT</div>
    <div class="misa-full-name-avatar-table flex">
      <div
        class="misa-cell-avatar-color"
        :style="{
          backgroundColor: room.AvartarAdmin,
        }"
      >
        {{ CommonFunction.splitFullName(room.AdminName) }}
      </div>
      <div class="t-content">
        <div class="misa-cell-FullName font-weight">
          {{ room.AdminName }}
        </div>
        <div class="">
          {{ room.AdminEmail }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CommonFunction from '@/commons/CommonFuction'
export default {
  props: {
    room: {
      type: Object,
    },
  },
  data() {
    return {
      /**Object chứa các hàm dùng chung */
      CommonFunction: CommonFunction,
    }
  },
}
</script>
<style scoped>
.t-content-tooltip {
  width: 300px;
  height: 200px;
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
.font-weight {
  font-weight: 700;
}
</style>
