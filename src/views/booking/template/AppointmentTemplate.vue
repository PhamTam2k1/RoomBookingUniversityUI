<template>
  <div class="showtime-preview">
    <div class="schedule-cell">
      <div class="schedule-cell-inner" :style="{ backgroundColor: '#b2ccff' }">
        <div class="misa-active-status-table flex">
          <div
            class="misa-cell-active-color"
            :style="{
              backgroundColor: 'blue',
            }"
          ></div>

          <div class="misa-cell-active-text" :style="{ color: black }">
            {{ templateModel.targetedAppointmentData.TimeSlotName }}
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
    // getFormatDate(value) {
    //   return localization.formatDate(value, 'shortTime');
    // },
  },
  mounted() {
    console.log(this.templateModel)
  },
}
</script>
<style scoped>
.misa-full-name-avatar-table.flex {
  align-items: center;
}
.misa-active-status-table {
  height: 100%;
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
