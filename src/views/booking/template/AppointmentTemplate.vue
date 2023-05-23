<template>
  <div class="showtime-preview">
    <div class="schedule-cell">
      <div class="schedule-cell-inner" :style="{ backgroundColor: '#b2ccff' }">
        <div class="misa-active-status-table flex">
          <div
            class="misa-cell-active-color"
            :style="{
              backgroundColor: getBookingStatusColor(),
            }"
          ></div>

          <div class="misa-cell-active-text">
            {{ templateModel.targetedAppointmentData.TimeSlotName }} -
            {{ templateModel.targetedAppointmentData.Subject }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// import localization from 'devextreme/localization';
import DxButton from 'devextreme-vue/button'
import Enum from '@/commons/Enum'
import Resource from '@/commons/Resource'
const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default {
  components: {
    DxButton,
  },
  props: {
    templateModel: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dayOfWeekNames,
    }
  },
  methods: {
    getBookingStatusColor() {
      let status = this.templateModel.targetedAppointmentData.StatusBooking
      let corlor = ''
      switch (status) {
        case Enum.OptionRequest.Await:
          corlor = Resource.BookingStatusColor.Await
          break
        case Enum.OptionRequest.Approve:
          corlor = Resource.BookingStatusColor.Approve
          break
        case Enum.OptionRequest.OpenDoor:
          corlor = Resource.BookingStatusColor.OpenDoor
          break
        default:
          break
      }
      return corlor
    },
  },
  mounted() {
    // console.log(this.templateModel)
  },
}
</script>
<style scoped>
.misa-full-name-avatar-table.flex {
  align-items: center;
}
.misa-active-status-table {
  height: 100%;

  font-size: 14px;
}
.misa-cell-active-color {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  margin-right: 8px;
  margin-top: 5px;
}
.dx-scheduler-appointment-recurrence .dx-scheduler-appointment-content {
  padding: 0px !important;
}

.schedule-cell {
  height: 100%;
}
.schedule-cell-inner {
  height: 100%;
}
</style>
