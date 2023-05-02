<template>
  <div>
    <table class="schedule-table">
      <thead>
        <tr>
          <th></th>
          <th v-for="room in rooms" :key="room.id">{{ room.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="timeSlot in timeSlots" :key="timeSlot.id">
          <td>{{ timeSlot.name }}</td>
          <td
            v-for="room in rooms"
            :key="room.id"
            @click="!bookingExists && onClickCell(timeSlot.id, room.Subject)"
          >
            <div class="schedule-cell">
              <div
                class="schedule-cell-inner"
                v-if="getBookingColor(timeSlot.id, room.id)"
                :style="{ backgroundColor: ' rgb(255 241 178)' }"
              >
                <div class="misa-active-status-table flex">
                  <div class="misa-cell-active-text" :style="{ color: white }">
                    <div
                      @click="onClickCell(booking.id, booking.Subject)"
                      v-for="(booking, index) in getSubject(
                        timeSlot.id,
                        room.id,
                      )"
                      :key="index"
                      class="misa-cell-active-group"
                    >
                      <div
                        class="misa-cell-active-color"
                        :style="{
                          backgroundColor: getBookingStatusColor(
                            timeSlot.id,
                            room.id,
                          ),
                        }"
                      ></div>
                      {{ booking.Subject }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Enum from '@/commons/Enum'
import Resource from '@/commons/Resource'
export default {
  components: {},
  data() {
    return {
      bookingExists: false,
      bookingRooms: [
        {
          id: 1,
          startDate: '2023-04-22',
          endDate: '2023-04-23',
          Subject: 'Dạy bù',
          color: '#008000',
          roomID: 1,
          timeSlotID: 1,
          bookingStatus: 1,
        },
        {
          id: 1,
          startDate: '2023-04-22',
          endDate: '2023-04-23',
          Subject: 'Dạy bù 23',
          color: '#008000',
          roomID: 1,
          timeSlotID: 5,
          bookingStatus: 1,
        },
        {
          id: 1,
          startDate: '2023-04-22',
          endDate: '2023-04-23',
          Subject: 'Dạy bù 256',
          color: '#008000',
          roomID: 1,
          timeSlotID: 2,
          bookingStatus: 1,
        },
        {
          id: 2,
          startDate: '2023-04-23',
          endDate: '2023-04-24',
          Subject: 'Họp giao ban',
          color: '#FFA500',
          roomID: 2,
          timeSlotID: 2,
          bookingStatus: 2,
        },
        {
          id: 3,
          startDate: '2023-04-24',
          endDate: '2023-04-25',
          Subject: 'Bảo vệ đồ án tốt nghiệp',
          color: '#0000FF',
          roomID: 3,
          timeSlotID: 3,
          bookingStatus: 1,
        },
        {
          id: 4,
          startDate: '2023-04-25',
          endDate: '2023-04-26',
          Subject: 'Dạy bù',
          color: '#800080',
          roomID: 4,
          timeSlotID: 4,
          bookingStatus: 2,
        },
        {
          id: 5,
          startDate: '2023-04-26',
          endDate: '2023-04-27',
          Subject: 'Dạy bù',
          color: '#FF0000',
          roomID: 1,
          timeSlotID: 5,
          bookingStatus: 1,
        },
      ],
      rooms: [
        { id: 1, name: 'Phòng 1' },
        { id: 2, name: 'Phòng 2' },
        { id: 3, name: 'Phòng 3' },
        { id: 4, name: 'Phòng 4' },
      ],
      timeSlots: [
        { id: 2, name: 'Thứ 2' },
        { id: 3, name: 'Thứ 3' },
        { id: 4, name: 'Thứ 4' },
        { id: 5, name: 'Thứ 5' },
        { id: 6, name: 'Thứ 6' },
        { id: 7, name: 'Thứ 7' },
        { id: 8, name: 'CN' },
        { id: 2, name: 'Thứ 2' },
        { id: 3, name: 'Thứ 3' },
        { id: 4, name: 'Thứ 4' },
        { id: 5, name: 'Thứ 5' },
        { id: 6, name: 'Thứ 6' },
        { id: 7, name: 'Thứ 7' },
        { id: 8, name: 'CN' },
        { id: 2, name: 'Thứ 2' },
        { id: 3, name: 'Thứ 3' },
        { id: 4, name: 'Thứ 4' },
        { id: 5, name: 'Thứ 5' },
        { id: 6, name: 'Thứ 6' },
        { id: 7, name: 'Thứ 7' },
        { id: 8, name: 'CN' },
      ],
    }
  },
  methods: {
    getSubject(timeSlotID, roomID) {
      debugger
      const booking = this.bookingRooms.filter(
        (item) => item.timeSlotID === timeSlotID && item.roomID === roomID,
      )
      booking.length > 1
        ? (this.bookingExists = true)
        : (this.bookingExists = false)
      return booking
    },

    getBookingColor(timeSlotID, roomID) {
      const booking = this.bookingRooms.find(
        (item) => item.timeSlotID === timeSlotID && item.roomID === roomID,
      )
      let color = booking ? booking.color : null
      return color
    },
    getBookingStatusColor(timeSlotID, roomID) {
      const booking = this.bookingRooms.find(
        (item) => item.timeSlotID === timeSlotID && item.roomID === roomID,
      )
      let status = booking ? booking.bookingStatus : 0
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
    onClickCell(timeSlotID, roomID) {
      console.log('Clicked on timeSlot:', timeSlotID, 'in room:', roomID)
    },
  },
  computed: {
    subjects() {
      const bookings = this.bookingRooms.filter(
        (item) =>
          item.timeSlotID === this.timeSlotID && item.roomID === this.roomID,
      )
      return bookings.map((booking) => booking.Subject)
    },
  },
}
</script>

<style>
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
  height: 100px;
  padding: 0px;
}
.schedule-table th {
  background-color: #f2f2f2;
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
  background-color: rgb(255 241 178 / 48%) !important;
  cursor: pointer;
  text-decoration: underline;
  color: rgb(134, 166, 223);
}
.schedule-cell :hover {
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;
}
</style>
