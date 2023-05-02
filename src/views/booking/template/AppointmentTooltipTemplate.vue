<template>
  <div class="booking-tooltip">
    <div class="header-popover flex">
      <div class="text-title flex">
        {{ templateTooltipModel.targetedAppointmentData.Subject }}
      </div>
      <div class="tool flex"></div>
    </div>
    <div class="info">
      <div class="t-item-line flex">
        <div class="t-lable">Tên phòng</div>
        <div class="t-content">
          {{ templateTooltipModel.targetedAppointmentData.RoomName }}
        </div>
      </div>
      <div class="t-item-line flex">
        <div class="t-lable">Thời gian đặt</div>
        <div class="t-content">
          {{ templateTooltipModel.targetedAppointmentData.StartDate }}
        </div>
      </div>
      <div class="t-item-line flex">
        <div class="t-lable">Số người tham dự</div>
        <div class="t-content">
          {{ templateTooltipModel.targetedAppointmentData.Quantity }}
        </div>
      </div>
      <div class="t-item-line flex">
        <div class="t-lable">Người đặt phòng</div>
        <div class="t-content">
          <div class="misa-full-name-avatar-table flex">
            <div
              class="misa-cell-avatar-color"
              :style="{
                backgroundColor:
                  templateTooltipModel.targetedAppointmentData.AvartarColor,
              }"
            >
              {{
                CommonFunction.splitFullName(
                  templateTooltipModel.targetedAppointmentData.FullName,
                )
              }}
            </div>
            <div class="misa-cell-FullName">
              {{ templateTooltipModel.targetedAppointmentData.FullName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// import 'devextreme/localization/globalize/date';

import Query from 'devextreme/data/query'
import DxButton from 'devextreme-vue/button'
import CommonFunction from '@/commons/CommonFuction'
const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default {
  components: {
    DxButton,
  },
  props: {
    scheduler: {
      type: Object,
      default: () => {},
    },
    templateTooltipModel: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dayOfWeekNames,
      CommonFunction: CommonFunction,
    }
  },
  methods: {
    deleteAppointment(e, data) {
      const schedulerInstance = this.$refs['scheduler'].instance
      console.log(schedulerInstance)
      // Sennò apre in edit
      e.event.stopPropagation()

      schedulerInstance.deleteAppointment(data.appointmentData)
      schedulerInstance.hideAppointmentTooltip()
    },
  },
}
</script>
<style lang="scss" scoped>
.header-popover {
  .text-title {
    font-weight: 700;
    font-size: 16px;
  }
}

.info {
  padding: 10px;
  .t-item-line {
    height: 36px;
    justify-content: space-between;
    align-items: center;
    .t-lable {
      text-align: left;
      margin-right: 10px;
      width: 120px;
    }

    .t-content {
      text-align: left;
      flex: 1;
      font-weight: 700;
    }
  }
  .misa-full-name-avatar-table.flex {
    align-items: center;
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
}
</style>
