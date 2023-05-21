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
  width: fit-content;
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
.misa-cell-avatar-color {
  text-transform: uppercase;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  padding-top: 6px;
  font-size: 14px;
  color: #fff;
  font-weight: bolder;
  margin-right: 8px;
  text-align: center;
  min-width: 32px;
  min-height: 32px;
}

.misa-full-name-avatar-table.flex {
  align-items: center;
}

.misa-cell-active-color {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  margin-right: 8px;
  margin-top: 5px;
}
</style>
