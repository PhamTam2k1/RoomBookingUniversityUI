<template>
  <div class="table_multi">
    <table class="schedule-table">
      <thead>
        <tr>
          <th></th>
          <th v-for="room in rooms" :key="room.RoomID">{{ room.RoomName }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="timeSlot in timeSlots" :key="timeSlot.dateTime">
          <td
            class="tdLabel"
            :class="{ isActive: dateNow == timeSlot.dateTime }"
          >
            {{ timeSlot.name }}
          </td>
          <td
            v-for="room in rooms"
            :key="room.RoomID"
            @click="onClickCell(timeSlot.dateTime, room.RoomID)"
            class="rowColor"
            :class="{
              isActive: dateNow == timeSlot.dateTime,
              isDisable: setDisable(timeSlot.dateTime1),
            }"
          >
            <div class="schedule-cell">
              <!-- <div
                class="schedule-cell-inner"
                v-if="getBookingColor(timeSlot.dateTime, room.RoomID) "
              
              > -->
              <div class="misa-active-status-table flex">
                <div
                  @click="onClickCell(booking.dateTime, booking.RoomID)"
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
                      ),
                    }"
                  ></div>
                  <p v-if="index <= 2" class="titleSubject">
                    {{ booking.Subject }}
                  </p>
                  <p
                    v-if="index > 2"
                    class="Seedetail"
                    @click="showPopUp(timeSlot.dateTime, room.RoomID)"
                  >
                    Xem thêm({{
                      getSubject(timeSlot.dateTime, room.RoomID).length - 3
                    }})
                  </p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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
              @click="onClickCell(booking.dateTime, booking.RoomID)"
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
                  ),
                }"
              ></div>
              <p class="titleSubject">
                {{ booking.Subject }}
              </p>
            </div>
          </div>
        </div>
      </template>
      <template #buttonPopup>
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
      </template>
    </BasePopup>
  </div>
</template>

<script>
import Enum from '@/commons/Enum'
import Resource from '@/commons/Resource'
import BasePopup from '@/components/base/BasePopup.vue'
export default {
  components: {
    BasePopup,
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
  },
  data() {
    return {
      bookingExists: false,
      dataSource: [],
      popupNoticeMode: false,
      generate: [],
      dateNow: new Date().toLocaleDateString('vi-VN'),
      bookingRooms: [],
      rooms: [],
      timeSlots: [],
    }
  },
  methods: {
    getSubject(dateTime, RoomID) {
      const booking = this.bookingRooms.filter(
        (item) => item.dateTime === dateTime && item.RoomID === RoomID,
      )
      booking.length > 1
        ? (this.bookingExists = true)
        : (this.bookingExists = false)
      return booking.slice(0, 4)
    },

    getBookingColor(value, RoomID) {
      const booking = this.bookingRooms.find(
        (item) => item.dateTime === value && item.RoomID === RoomID,
      )
      let color = booking ? booking.color : null
      return color
    },
    getBookingStatusColor(value, RoomID) {
      debugger
      const booking = this.bookingRooms.find(
        (item) => item.dateTime === value && item.RoomID === RoomID,
      )
      let status = booking ? booking.RoomStatus : 0
      let corlor = ''
      switch (status) {
        case Enum.OptionRequest.Await:
          corlor = Resource.BookingStatusColor.Await
          break
        case Enum.OptionRequest.Approve:
          corlor = Resource.BookingStatusColor.Approve
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
        debugger
        var date1 = new Date(element.StartDate)
        element.dateTime = date1.toLocaleDateString('vi-VN')
        element.color = '#008000'
      })
      // Lọc danh sách phòng không bị trùng BookingRoomID
      const uniqueRooms = this.dataSource.filter(
        (room, index, self) =>
          index === self.findIndex((r) => r.RoomID === room.RoomID),
      )
      this.rooms = uniqueRooms
    },
    onClickCell(TimeSlotID, RoomID) {
      console.log('Clicked on timeSlot:', TimeSlotID, 'in room:', RoomID)
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
      debugger
      const today = new Date()
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
      } else {
        daysOfWeek = [
          { id: 1, name: 'Thứ 2' },
          { id: 2, name: 'Thứ 3' },
          { id: 3, name: 'Thứ 4' },
          { id: 4, name: 'Thứ 5' },
          { id: 5, name: 'Thứ 6' },
          { id: 6, name: 'Thứ 7' },
          { id: 7, name: 'CN' },
          { id: 8, name: 'Thứ 2' },
          { id: 9, name: 'Thứ 3' },
          { id: 10, name: 'Thứ 4' },
          { id: 11, name: 'Thứ 5' },
          { id: 12, name: 'Thứ 6' },
          { id: 13, name: 'Thứ 7' },
          { id: 14, name: 'CN' },
          { id: 15, name: 'Thứ 2' },
          { id: 16, name: 'Thứ 3' },
          { id: 17, name: 'Thứ 4' },
          { id: 18, name: 'Thứ 5' },
          { id: 19, name: 'Thứ 6' },
          { id: 20, name: 'Thứ 7' },
          { id: 21, name: 'CN' },
          { id: 22, name: 'Thứ 2' },
          { id: 23, name: 'Thứ 3' },
          { id: 24, name: 'Thứ 4' },
          { id: 25, name: 'Thứ 5' },
          { id: 26, name: 'Thứ 6' },
          { id: 27, name: 'Thứ 7' },
          { id: 28, name: 'CN' },
        ]
      }

      // Tạo một mảng các đối tượng thể hiện ngày trong tuần kèm theo ngày hiện tại
      const daysWithDate = daysOfWeek.map((day) => {
        const date = new Date(today)
        const dayOfWeek = date.getDay()
        const diff = day.id - dayOfWeek
        date.setDate(today.getDate() + diff)
        return {
          id: day.id,
          name: day.name + ' ' + date.toLocaleDateString('vi-VN'),
          dateTime: date.toLocaleDateString('vi-VN'),
          dateTime1: date,
        }
      })
      this.timeSlots = daysWithDate
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

  created() {
    debugger
    this.dataSource = this.data
    this.loadDataBooking()
    this.dateCellTemplate()
  },
  watch: {
    view: function () {
      this.dateCellTemplate()
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
}

.wrap-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.schedule-table {
  border: 1px solid #ddd;
  border-collapse: collapse;
  width: 100%;
}

.schedule-table th,
.schedule-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.schedule-table td {
  height: 115px;
  padding: 0px;
  min-width: 159px;
}

.schedule-table td :hover {
  cursor: pointer;
}

.schedule-table th {
  font-weight: bold;
}

.schedule-cell {
  position: relative;
  width: 100%;
  height: 100%;
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
}

.misa-cell-active-group:hover {
  z-index: 99999;
  cursor: pointer;
  text-decoration: underline;
  color: rgb(167, 30, 151);
}

.schedule-cell :hover {
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;
}

.table_multi {
  height: 100%;
  overflow: auto;
  background-color: #fff;
}

.tdLabel {
  width: 150px;
}

.misa-active-status-table {
  height: 114px;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: grid;
  padding: 10px;
}

.misa-cell-active-group {
  margin-top: 10px;
  display: flex;
  z-index: 99999;
  color: black;
}

.Seedetail {
  position: absolute;
  right: 10px;
  bottom: 3px;
  font-size: 10px;
}

.isActive {
  color: #3d75de;
}

thead {
  height: 50px;
}

.rowColor {
  background-color: #fff;
}

.rowColor.isActive {
  background-color: #fffcf2 !important;
}

.rowColor.isDisable {
  background-color: #f0f0f3 !important;
}

.rowColor.isDisable :hover {
  background-color: #f0f0f3 !important;
}

.generate {
  height: 100%;
  overflow: auto;
}

.misa-active-status-table:hover {
  background-color: #6691e2;
}
</style>
