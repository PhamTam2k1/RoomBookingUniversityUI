<template>
  <div class="table_multi" ref="table_multi">
    <table class="schedule-table">
      <thead>
        <tr class="tr-data">
          <th class="sticky"></th>

          <th v-for="room in rooms" :key="room.RoomID">
            <el-tooltip placement="bottom" effect="light">
              <template v-slot:content>
                <HeaderTooltip :room="room"></HeaderTooltip>
              </template>
              {{ room.RoomName }}
            </el-tooltip>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="timeSlot in timeSlots" :key="timeSlot.dateTime">
          <td
            class="tdLabel sticky"
            :class="{ isActive: dateNow == timeSlot.dateTime }"
            v-html="timeSlot.name"
          ></td>
          <td
            v-for="room in rooms"
            :key="room.RoomID"
            @click="
              onClickCell(timeSlot.dateTime, room.RoomID),
                (isShowForm = true),
                $event.stopPropagation()
            "
            class="rowColor"
            :class="{
              isActive: dateNow == timeSlot.dateTime,
              isDisable: setDisable(timeSlot.dateTime1),
            }"
            ref="hoverElement"
          >
            <div class="schedule-cell">
              <!-- <div
                class="schedule-cell-inner"
                v-if="getBookingColor(timeSlot.dateTime, room.RoomID) "
              
              > -->
              <div
                class="misa-active-status-table flex"
                v-click-out-side="showToolTip"
              >
                <div
                  @click="
                    onClickCell(
                      booking.dateTime,
                      booking.RoomID,
                      booking.BookingRoomID,
                    ),
                      $event.stopPropagation(),
                      (isShowForm = true)
                  "
                  v-for="(booking, index) in getSubject(
                    timeSlot.dateTime,
                    room.RoomID,
                  )"
                  :key="index"
                  class="misa-cell-active-group"
                >
                  <div
                    class="misa-cell-active-color"
                    v-if="index <= 2"
                    :style="{
                      backgroundColor: getBookingStatusColor(
                        timeSlot.dateTime,
                        room.RoomID,
                        booking.BookingRoomID,
                      ),
                    }"
                  ></div>

                  <p v-if="index <= 2" class="titleSubject">
                    <el-tooltip placement="top" effect="light">
                      <template v-slot:content>
                        <AppointmentTooltipTemplate
                          :templateTooltipModel="booking"
                          :dataRoom="dataRoom"
                        />
                      </template>
                      {{ booking.TimeSlotName }} - {{ booking.Subject }}
                    </el-tooltip>
                  </p>
                  <p
                    v-if="index > 2"
                    class="Seedetail"
                    @click.stop="showPopUp(timeSlot.dateTime, room.RoomID)"
                  >
                    Xem thêm +
                    {{ getSubject(timeSlot.dateTime, room.RoomID).length - 3 }}
                  </p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <RoomBookingPopup
      v-if="isShowForm"
      @onCloseForm="isShowForm = false"
      @onShowLoading="showLoading"
      :roomID="roomID"
      :bookingID="bookingID"
      :dateBooking="dateBooking"
      :popupMode="popupMode"
      @onLoadData="onLoadDataBooking"
      @isSuccess="onSendingEmail"
    />
    <BasePopup
      v-if="popupNoticeMode"
      class="misa-dialog"
      titlePopup="Xem chi tiết"
      classPopup="popup-dictionary-detail"
      @onClickClosePopup="onCloseForm"
      :tabindex="4"
    >
      <template #iconPopup>
        <el-tooltip content="Đóng" placement="bottom">
          <div
            class="misa-icon misa-icon-close misa-icon-24"
            @click="onCloseForm"
          ></div>
        </el-tooltip>
      </template>
      <template #contentPopup>
        <div class="generate">
          <div class="misa-active-status-table flex">
            <div
              @click="
                onClickCell(
                  booking.dateTime,
                  booking.RoomID,
                  booking.BookingRoomID,
                ),
                  $event.stopPropagation(),
                  (isShowForm = true)
              "
              v-for="(booking, index) in generate"
              :key="index"
              class="misa-cell-active-group"
            >
              <div
                class="misa-cell-active-color"
                :style="{
                  backgroundColor: getBookingStatusColor(
                    booking.dateTime,
                    booking.RoomID,
                    booking.BookingRoomID,
                  ),
                }"
              ></div>
              <p class="titleSubject">
                <el-tooltip placement="top" effect="light">
                  <template v-slot:content>
                    <AppointmentTooltipTemplate
                      :templateTooltipModel="booking"
                      :dataRoom="dataRoom"
                    />
                  </template>
                  {{ booking.TimeSlotName }} - {{ booking.Subject }}
                </el-tooltip>
              </p>
            </div>
          </div>
        </div>
      </template>
      <!-- <template #buttonPopup>
        <BaseButton
          :tabindex="3"
          lableButton="Lưu"
          classButton="misa-button-normal w-86 misa-button-primary "
          @click="beforeSaveData()"
        ></BaseButton>
        <BaseButton
          @keyup="handleKeyup"
          classButton="w-0"
          :tabindex="4"
        ></BaseButton>
      </template> -->
    </BasePopup>
  </div>
</template>

<script>
/* eslint-disable */
import Enum from '@/commons/Enum'
import Resource from '@/commons/Resource'
import BasePopup from '@/components/base/BasePopup.vue'
import clickOutSide from '@mahdikhashan/vue3-click-outside'
import RoomBookingPopup from '@/views/booking/RoomBookingPopup.vue'
import AppointmentTooltipTemplate from '@/views/booking/template/AppointmentTooltipTemplate.vue'
import HeaderTooltip from './HeaderTooltip.vue'
import moment from 'moment'
export default {
  components: {
    BasePopup,
    AppointmentTooltipTemplate,
    RoomBookingPopup,
    HeaderTooltip,
  },
  // do not forget this section
  directives: {
    clickOutSide,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    view: {
      type: String,
      required: true,
      default: 'week',
    },
    dataDate: {
      type: String,
      required: true,
    },
    dataRoom: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      bookingExists: false,
      classArrow: false,
      dataSource: [],
      bookingHover: {},
      isShowTooltip: false,
      left: '0px',
      top: '0px',
      popupNoticeMode: false,
      isShowForm: false,
      generate: [],
      dateNow: new Date().toLocaleDateString('vi-VN'),
      bookingRooms: [],
      rooms: [],
      timeSlots: [],
      roomID: '',
      bookingID: '',
      popupMode: 0,
      dateBooking: new Date(),
    }
  },
  methods: {
    showToolTip() {
      this.isShowTooltip = false
    },
    /**
     * Gửi sự kiện loading
     */
    showLoading() {
      this.$emit('onShowLoading')
    },
    onLoadDataBooking() {
      this.$emit('onLoadData')
    },
    getSubject(dateTime, RoomID) {
      const booking = this.bookingRooms.filter(
        (item) => item.dateTime === dateTime && item.RoomID === RoomID,
      )
      booking.length > 1
        ? (this.bookingExists = true)
        : (this.bookingExists = false)
      return booking
        .slice(0, 4)
        .sort((a, b) => a.TimeSlotName.localeCompare(b.TimeSlotName))
    },
    // lấy vị trí x y khi hover
    handleMouseMove(event, booking, popup) {
      const childElement = event.target
      const parentElement = childElement.closest('.rowColor')
        ? childElement.closest('.rowColor')
        : childElement.closest('.misa-dialog-content')
      const parentRect = parentElement.getBoundingClientRect()
      const elementRect = childElement.getBoundingClientRect()

      const tooltipWidth = event.currentTarget.clientWidth
      const tooltipHeight = event.currentTarget.clientHeight
      const elementWidth = elementRect.width
      const elementHeight = elementRect.height
      const elementLeft = elementRect.left
      const elementTop = elementRect.top
      const parentLeft = parentRect.left
      // const parentTop = parentRect.top

      let left = 0
      let top = 0
      let classArrow = false
      if (
        elementLeft + tooltipWidth < parentLeft + parentRect.width &&
        elementLeft + tooltipWidth < 800
      ) {
        left = elementLeft + elementWidth + 20
      } else {
        left = elementLeft - parentRect.width - elementWidth - 120
        classArrow = true
      }

      top =
        elementTop -
        tooltipHeight / 2 +
        elementHeight / 2 +
        parentElement.scrollTop

      this.left = popup ? left + 180 : left
      this.top = top - 100
      this.classArrow = classArrow
      this.bookingHover = booking
      this.isShowTooltip = true
    },
    getBookingColor(value, RoomID) {
      const booking = this.bookingRooms.find(
        (item) => item.dateTime === value && item.RoomID === RoomID,
      )
      let color = booking ? booking.color : null
      return color
    },
    getBookingStatusColor(value, RoomID, BookingRoomID) {
      const booking = this.bookingRooms.find(
        (item) =>
          item.dateTime === value &&
          item.RoomID === RoomID &&
          item.BookingRoomID === BookingRoomID,
      )
      let status = booking ? booking.StatusBooking : 0
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
    async loadDataBooking() {
      this.handleDataSource()
      // kiểm tra  gán lại giá trị
      this.bookingRooms = this.dataSource
      this.bookingRooms.forEach((element) => {
        var date1 = new Date(element.StartDate)
        element.dateTime = date1.toLocaleDateString('vi-VN')
        element.color = '#008000'
      })
      // Lọc danh sách phòng không bị trùng BookingRoomID
      // const uniqueRooms = this.dataSource.filter(
      //   (room, index, self) =>
      //     index === self.findIndex((r) => r.RoomID === room.RoomID),
      // )
      // this.rooms = uniqueRooms
    },
    onClickCell(TimeSlotID, RoomID, BookingRoomID) {
      this.isShowTooltip = false
      this.popupNoticeMode = false
      this.dateBooking = moment(TimeSlotID, 'DD/MM/YYYY').toDate()
      if (BookingRoomID) {
        this.bookingID = BookingRoomID
        this.popupMode = Enum.PopupMode.EditMode
      } else {
        this.roomID = RoomID
        this.popupMode = Enum.PopupMode.AddMode
      }
    },
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
    /// Đóng form
    onCloseForm() {
      this.popupNoticeMode = false
    },
    setDisable(dateTime) {
      var a =
        new Date().setHours(0, 0, 0, 0) >
        new Date(Date.parse(dateTime)).setHours(0, 0, 0, 0)
          ? true
          : false
      return a
    },
    showPopUp(dateTime, RoomID) {
      var booking = this.bookingRooms.filter(
        (item) => item.dateTime === dateTime && item.RoomID === RoomID,
      )
      this.popupNoticeMode = true
      this.generate = booking
    },
    // tạo ra template ngày tháng
    dateCellTemplate() {
      const today = new Date(this.dataDate)
      let daysOfWeek = []
      if (this.view && this.view == 'week') {
        daysOfWeek = [
          { id: 1, name: 'Thứ 2' },
          { id: 2, name: 'Thứ 3' },
          { id: 3, name: 'Thứ 4' },
          { id: 4, name: 'Thứ 5' },
          { id: 5, name: 'Thứ 6' },
          { id: 6, name: 'Thứ 7' },
          { id: 7, name: 'CN' },
        ]
        // Tạo một mảng các đối tượng thể hiện ngày trong tuần kèm theo ngày hiện tại
        const daysWithDate = daysOfWeek.map((day) => {
          const date = new Date(today)
          const dayOfWeek = date.getDay()
          const diff = day.id - dayOfWeek - (dayOfWeek === 0 ? 7 : 0)
          date.setDate(today.getDate() + diff)
          const momentObj = moment(date)
          const formattedString = momentObj.format('DD/MM')
          return {
            id: day.id,
            name: day.name + '<br>' + formattedString,
            dateTime: date.toLocaleDateString('vi-VN'),
            dateTime1: date,
          }
        })
        this.timeSlots = daysWithDate
      } else {
        this.timeSlots = this.getDaysInMonth(
          today.getFullYear(),
          today.getMonth(),
        )
      }
    },
    getDaysInMonth(year, month) {
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      const days = []
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day)
        const dayOfWeek = date.getDay() - 1
        const momentObj = moment(date)
        const formattedString = momentObj.format('DD/MM')
        days.push({
          date,
          dayOfWeek,
          name: this.getMonth(dayOfWeek) + '<br>' + formattedString,
          dateTime: date.toLocaleDateString('vi-VN'),
          dateTime1: date,
        })
      }
      return days
    },
    // hàm chuyển thành Thứ mấy
    getMonth(value) {
      var name = ''
      switch (value) {
        case 0:
          name = 'Thứ 2'
          break
        case 1:
          name = 'Thứ 3'
          break
        case 2:
          name = 'Thứ 4'
          break
        case 3:
          name = 'Thứ 5'
          break
        case 4:
          name = 'Thứ 6'
          break
        case 5:
          name = 'Thứ 7'
          break
        case 6:
          name = 'CN'
          break

        default:
          break
      }
      return name
    },
    /**
     * Thực hiện gửi email
     */
    onSendingEmail(result) {
      this.$emit('onSendingEmail', result)
    },
  },
  computed: {
    subjects() {
      const bookings = this.bookingRooms.filter(
        (item) =>
          item.TimeSlotID === this.TimeSlotID && item.RoomID === this.RoomID,
      )
      return bookings.map((booking) => booking.Subject)
    },
    timeCellTemplate() {
      return ({ date }) => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `<div class="time-cell">${hours}:${minutes}</div>`
      }
    },
  },
  updated() {
    this.dataSource = this.data
    this.rooms = this.dataRoom
    this.loadDataBooking()
  },
  mounted() {
    this.dataSource = this.data
    this.rooms = this.dataRoom
    this.loadDataBooking()
    this.dateCellTemplate()
  },
  watch: {
    view: function () {
      this.dateCellTemplate()
    },
    dataDate: function () {
      this.dateCellTemplate()
    },
    data() {
      this.dataSource = this.data
    },
    dataRoom() {
      this.rooms = this.dataRoom
    },
  },
}
</script>

<style scoped>
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
  cursor: pointer;
}

.wrap-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.schedule-table {
  /* border: 1px solid #ddd; */
  border-collapse: collapse;
  width: 100%;
}

.schedule-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
.schedule-table th {
  border-bottom: 1px solid #ddd;
  border-top: none;
  border-left: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1); /* thêm dòng này */
}
.schedule-table td {
  height: 115px;
  padding: 0px;
  min-width: 159px;
  z-index: 0;
}

.schedule-table td :hover {
  cursor: pointer;
}

.schedule-table th {
  font-weight: bold;
  z-index: 1;
}

.schedule-cell {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.schedule-cell-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13x;
  border-radius: 2px;
  padding: 2px;
  box-sizing: border-box;
  overflow: hidden;
}

.schedule-cell-inner:hover {
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* .schedule-cell-inner:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
} */

.schedule-cell-inner:hover:before {
  opacity: 1;
}

.schedule-cell-inner:after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -8px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 6px 0 6px;
  border-color: rgba(255, 255, 255, 0.5) transparent transparent transparent;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.schedule-cell-inner:hover:after {
  opacity: 1;
}

.misa-cell-active-group {
  display: flex;
  pointer-events: auto !important;
  cursor: pointer;
}

.misa-cell-active-group:hover {
  z-index: 886;
  cursor: pointer;
  text-decoration: underline;
  color: rgb(167, 30, 151);
}

.schedule-cell :hover {
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;
}

.table_multi {
  height: calc(100vh - 166px);
  overflow: auto;
  background-color: #fff;
}

.tdLabel {
  width: 150px;
  font-weight: 500;
}

.misa-active-status-table {
  width: 100%;
  align-items: center;
  display: grid;
  font-size: 14px;
  padding: 10px;
}

.misa-cell-active-group {
  display: flex;
  color: black;
  height: 25px;
}

.Seedetail {
  position: absolute;
  right: 10px;
  bottom: 3px;
  font-size: 12.5px;
  color: #3d75de;
}
.Seedetail:hover {
  text-decoration: underline;
  cursor: pointer;
}
.isActive {
  color: #3d75de;
}

thead {
  height: 65px;
  border-bottom: 1px solid #ddd;
}

.rowColor {
  background-color: #fff;
}
.rowColor:hover {
  background-color: rgba(221, 221, 221, 0.6);
}
.rowColor.isActive {
  background-color: #fffcf2 !important;
}
.rowColor.isActive:hover {
  background-color: rgba(206, 238, 249, 0.6) !important;
}

.rowColor.isDisable {
  background-color: #f0f0f3 !important;
  /* pointer-events: none; */
}

.rowColor.isDisable :hover {
  background-color: #f0f0f3 !important;
}
.rowColor.isDisable .schedule-cell:hover {
  cursor: not-allowed;
  /* pointer-events: none; */
}
.generate {
  height: 100%;
  overflow: auto;
}

/* .schedule-cell .misa-active-status-table:hover {
  background-color: rgba(221, 221, 221, 0.6);
} */
.misa-cell-active-group:hover {
  color: black;
}
.tooltipTable {
  position: absolute;
  width: 400px;
  z-index: 999999999;
  top: 130px;
  left: 0px;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
}
.titleSubject {
  height: 100%;
  white-space: nowrap;
  height: 10px;
}
.tr-data {
  position: sticky;
  z-index: 888;
  left: 0;
  top: 0;
  background-color: #fff;
  border-top: none;
}
.sticky {
  position: sticky;
  left: 0;
  top: 0;
  z-index: 1 !important;
  background-color: #fff;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
}
</style>
