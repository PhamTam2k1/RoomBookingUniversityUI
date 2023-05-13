<template>
  <div class="dx-scheduler-appointment-tooltip booking-tooltip" ref="tooltip">
    <div class="header-popover flex">
      <div class="text-title flex">
        {{ templateTooltipModel.appointmentData.Subject }}
      </div>
      <div class="tool flex"></div>
    </div>
    <div class="info">
      <div
        class="t-item-line flex mgt-8"
        v-if="
          isNotAdminDefult == false &&
          templateTooltipModel.appointmentData.StatusBooking ==
            Enum.BookingStatus.Pending
        "
      >
        <div class="t-pending flex">
          <div class="t-lable flex">
            <div class="icon-booking icon-pending misa-icon-24 mgt-10"></div>
            <div class="t-div mgl-8p mgt-14" style="color: red">Chờ duyệt</div>
            <div
              class="icon-booking icon-arrow-left misa-icon-24 mgt-10 mgl-8p"
            ></div>
          </div>
          <div class="misa-full-name-avatar-table flex">
            <div
              class="misa-cell-avatar-color"
              :style="{
                backgroundColor: roomChoose.AvartarAdmin,
              }"
            >
              {{ CommonFunction.splitFullName(roomChoose.AdminName) }}
            </div>
            <div class="t-content">
              <div class="misa-cell-FullName">
                {{ roomChoose.AdminName }}
              </div>
              <div class="">
                {{ roomChoose.AdminEmail }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="t-item-line flex mgt-8">
        <div class="t-lable">Tên phòng</div>
        <div class="t-content">
          {{ templateTooltipModel.appointmentData.RoomName }}
        </div>
      </div>
      <div class="t-item-line flex">
        <div class="t-lable">Thời gian đặt</div>
        <div class="t-content">
          {{ templateTooltipModel.appointmentData.TimeSlotName }} -
          {{ dateBooking }}
        </div>
      </div>
      <div class="t-item-line flex" v-if="isNotAdminDefult == false">
        <div class="t-lable">Số người tham dự</div>
        <div class="t-content">
          {{ templateTooltipModel.appointmentData.Quantity }}
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
                  templateTooltipModel.appointmentData.AvartarColor,
              }"
            >
              {{
                CommonFunction.splitFullName(
                  templateTooltipModel.appointmentData.FullName,
                )
              }}
            </div>
            <div class="misa-cell-FullName">
              {{ templateTooltipModel.appointmentData.FullName }}
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
import Enum from '@/commons/Enum'
import moment from 'moment'
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
    dataRoom: {
      type: Object,
    },
    classArrow: {
      type: Boolean,
    },
  },
  data() {
    return {
      dayOfWeekNames,
      CommonFunction: CommonFunction,
      roomChoose: {},
      isNotAdminDefult: false,
      Enum: Enum,
      dateBooking: null,
    }
  },
  mounted() {
    const momentObj = moment(
      this.templateTooltipModel.appointmentData.startDate,
    )
    this.dateBooking = momentObj.format('DD/MM/YYYY')
    this.roomChoose = this.dataRoom.find(
      (x) => x.RoomID == this.templateTooltipModel.appointmentData.RoomID,
    )
    this.isNotAdminDefult =
      this.templateTooltipModel.appointmentData.FullName == 'Admin'
        ? true
        : false
  },
}
</script>
<style lang="scss" scoped>
.booking-tooltip {
  font-size: 14px;
  width: 400px;
}
.header-popover {
  .text-title {
    font-weight: 700;
    font-size: 16px;
    padding: 10px 10px 0px 10px;
  }
}

.info {
  padding: 10px;
  .t-pending {
    height: 50px;
    background: #fff0f2;
    border-radius: 4px;
    border: dashed 1px #eae7f1;
    padding-left: 5px;
    padding-right: 5px;
    width: 400px;
  }
  .t-item-line {
    height: 36px;
    justify-content: space-between;
    align-items: center;
    .t-lable {
      text-align: left;
      margin-right: 10px;
      width: 150px;
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
.arrow {
  width: 0;
  left: -10px;
  top: 50%;
  height: 0;
  position: absolute;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #fff;
  transform: translateY(-50%);
}
.arrow_right {
  border-left: 10px solid #fff;
  right: -10px;
  left: auto;
  border-right: none;
}
</style>
