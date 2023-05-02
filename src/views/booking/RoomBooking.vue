<template>
  <div class="x">
    <DxScheduler
      :dataSource="dataSource"
      :views="views"
      :current-view="currentView"
      :current-date="currentDate"
      :start-day-hour="startDayHour"
      :end-day-hour="endDayHour"
      :cell-duration="cellDuration"
      :first-day-of-week="firstDayOfWeek"
      :show-all-day-panel="showAllDayPanel"
      :height="height"
      :scrolling-mode="scrollingMode"
      :time-cell-template="timeCellTemplate"
      :date-cell-template="dateCellTemplate"
      appointment-template="AppointmentTemplateSlot"
      appointment-tooltip-template="AppointmentTooltipTemplateSlot"
      :on-content-ready="onContentReady"
      :on-appointment-form-opening="onAppointmentClick"
    >
      <template #AppointmentTemplateSlot="{ data }">
        <AppointmentTemplate :scheduler="scheduler" :template-model="data" />
      </template>
      <template #AppointmentTooltipTemplateSlot="{ data }">
        <AppointmentTooltipTemplate
          :scheduler="scheduler"
          :template-tooltip-model="data"
        />
      </template>
    </DxScheduler>
    <!--Begin Popup detail -->
    <RoomBookingPopup v-if="isShowForm" @onCloseForm="isShowForm = false" />
    <!-- End popup detail -->
  </div>
</template>

<script>
import { DxScheduler } from 'devextreme-vue/scheduler'
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import AppointmentTemplate from './template/AppointmentTemplate.vue'
import AppointmentTooltipTemplate from './template/AppointmentTooltipTemplate.vue'
import BookingRoomApi from '@/apis/BookingRoomApi'
import RoomBookingPopup from './RoomBookingPopup.vue'
export default {
  name: 'App',
  components: {
    DxScheduler,
    AppointmentTemplate,
    AppointmentTooltipTemplate,
    RoomBookingPopup,
  },
  data() {
    return {
      isShowForm: false,
      dataSource: [],
      views: [
        {
          name: 'Ngày',
          type: 'day',
          intervalCount: 1,
          startDate: new Date(2021, 3, 4),
        },
        {
          name: 'Tuần',
          type: 'week',
          groupOrientation: 'horizontal',
          intervalCount: 1,
          groupByDate: true,
          startDate: new Date(2021, 2, 4),
        },
        {
          name: 'Tháng',
          type: 'month',
          intervalCount: 1,
        },
      ],
      currentView: 'day',
      currentDate: new Date(),
      startDayHour: 7,
      endDayHour: 21,
      cellDuration: 60,
      firstDayOfWeek: 1,
      showAllDayPanel: false,
      height: '100%',
      scrollingMode: 'virtual',
    }
  },
  computed: {
    timeCellTemplate() {
      return ({ date }) => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `<div class="time-cell">${hours}:${minutes}</div>`
      }
    },
    dateCellTemplate() {
      return ({ date }) => {
        const daysOfWeek = [
          'CN',
          'Thứ 2',
          'Thứ 3',
          'Thứ 4',
          'Thứ 5',
          'Thứ 6',
          'Thứ 7',
        ]
        const dayOfWeek = daysOfWeek[date.getDay()]
        // const day = date.getDate().toString().padStart(2, '0')
        // const month = (date.getMonth() + 1).toString().padStart(2, '0')
        return `
          <div class="date-cell" style="display:flex">
            <div class="day-of-week">${dayOfWeek} </div>
          </div>
        `
      }
    },
  },
  methods: {
    onContentReady(e) {
      this.scheduler = e.component
    },
    /**
     * Sự kiện click vào lịch để đặt phòng
     * 24.04.2023 PTTAM
     */
    onAppointmentClick(e) {
      e.cancel = true // Hủy bỏ việc hiển thị popup mặc định của DevExtreme
      this.isShowForm = true
    },
    /**
     * Sự kiện lấy dữ liệu đặt phòng
     * 23.04.2024
     * PTTAM
     */
    async loadDataBooking(callback) {
      try {
        await BookingRoomApi.getPaging({
          roomID: 'a880daef-ccb9-11ed-8def-f8b46ac25bb6',
          userID: null,
          buildingID: null,
          equipmentIDs: null,
          capacityMin: null,
          capacityMax: null,
        }).then((res) => {
          this.dataSource = res.data.data || []
          callback() // gọi callback để xử lý dataSource
        })
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * Convert date để hiển thị lên lịch
     * PTTAM 23.04.2023
     */
    handleDataSource() {
      for (let i = 0; i < this.dataSource?.length; i++) {
        const item = this.dataSource[i]

        const startDateObj = new Date(item.StartDate) // tạo đối tượng Date từ chuỗi ngày
        const startDateString = startDateObj.toString() // chuyển đổi sang chuỗi ngày theo định dạng mặc định

        const endDateObj = new Date(item.EndDate) // tạo đối tượng Date từ chuỗi ngày
        const endDateString = endDateObj.toString() // chuyển đổi sang chuỗi ngày theo định dạng mặc định

        const timezone = 'Eastern European Summer Time' // múi giờ
        const dateStartStringWithTimezone = startDateString.replace(
          /GMT\+\d{2}:\d{2}/,
          `GMT+00:00 (${timezone})`,
        ) // chèn múi giờ vào chuỗi ngày

        const dateEndStringWithTimezone = endDateString.replace(
          /GMT\+\d{2}:\d{2}/,
          `GMT+00:00 (${timezone})`,
        ) // chèn múi giờ vào chuỗi ngày

        // Gán lại giá trị cho thuộc tính startDate và endDate
        item.startDate = dateStartStringWithTimezone
        item.endDate = dateEndStringWithTimezone
      }
    },
  },
  created() {
    this.loadDataBooking(this.handleDataSource)
  },
}
</script>
