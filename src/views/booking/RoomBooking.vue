<template>
  <div id="scheduler">
    <div class="toolbar">
      <div class="input_date">
        <div
          @click="SetDate('reduce')"
          class="dx-widget dx-button dx-button-mode-contained dx-button-normal dx-button-has-icon dx-item dx-buttongroup-item dx-item-content dx-buttongroup-item-content dx-buttongroup-first-item dx-shape-standard dx-scheduler-navigator-previous"
          role="button"
          aria-label="chevronprev"
        >
          <div class="dx-button-content">
            <i class="dx-icon dx-icon-chevronprev"></i>
          </div>
        </div>
        <BaseDate
          class="mt-16"
          :labelMode="'hidden'"
          :stylingMode="'outlined'"
          :value="currentDate"
          @onValueChanged="onDateBoxChanged"
        >
        </BaseDate>
        <div
          @click="SetDate('increase')"
          class="dx-widget dx-button dx-button-mode-contained dx-button-normal dx-button-has-icon dx-item dx-buttongroup-item dx-item-content dx-buttongroup-item-content dx-buttongroup-last-item dx-shape-standard dx-scheduler-navigator-next"
          role="button"
          aria-label="chevronnext"
        >
          <div class="dx-button-content">
            <i class="dx-icon dx-icon-chevronnext"></i>
          </div>
        </div>
      </div>
      <div class="toolbar-filter flex">
        <div class="t-location-building flex mgl-8p">
          <div class="misa-icon-style mgl-16 mgt-5">
            <div class="icon-booking t-icon-location misa-icon-24"></div>
          </div>
          <BaseDropdownbox
            classDropdownbox="drop-down-bulding"
            :dataSource="dataBuildingWithAll"
            optionName="BuildingName"
            optionValue="BuildingID"
            :height="34"
            :width="120"
            placeholder="Chọn vị trí"
            @onValueChange="onValueChangeBuilding"
          ></BaseDropdownbox>
        </div>
        <div class="t-row" v-if="filterOption.BuildingID != 'tatca'">
          <BaseDropdownbox
            classDropdownbox="drop-down-utc mgl-16"
            :dataSource="dataRoomWithAll"
            optionName="RoomName"
            optionValue="RoomID"
            :isSearch="true"
            :height="38"
            :width="150"
            @onValueChange="onValueChangeRoom"
            :value="'tatca'"
          ></BaseDropdownbox>
        </div>
      </div>
      <div
        role="group"
        class="dx-buttongroup_custom dx-buttongroup dx-widget"
        tabindex="0"
      >
        <div class="flex">
          <BaseDropdownbox
            classDropdownbox="drop-down-filter"
            :dataSource="schedulerConnection"
            :height="34"
            :width="160"
            optionName="Text"
            optionValue="Value"
            :value="schedulerConnection[0].Value"
            @onValueChange="onValueChangeShedulerConnection"
          ></BaseDropdownbox>
          <div class="dx-buttongroup-wrapper dx-widget dx-collection mgl-8p">
            <div
              @click="setView(1, 'day')"
              :class="{ 'dx-item-selected': currentView == 'day' }"
              class="dx-widget dx-button dx-button-mode-contained dx-button-normal dx-button-has-text dx-item dx-buttongroup-item dx-item-content dx-buttongroup-item-content dx-buttongroup-first-item dx-shape-standard"
              role="button"
              aria-label="Ngày"
              aria-selected="true"
            >
              <div class="dx-button-content">
                <span class="dx-button-text">Ngày</span>
              </div>
            </div>
            <div
              @click="setView(2, 'week')"
              :class="{ 'dx-item-selected': currentView == 'week' }"
              class="dx-widget dx-button dx-button-mode-contained dx-button-normal dx-button-has-text dx-item dx-buttongroup-item dx-item-content dx-buttongroup-item-content dx-shape-standard"
              role="button"
              aria-label="Tuần"
              aria-selected="false"
            >
              <div class="dx-button-content">
                <span class="dx-button-text">Tuần</span>
              </div>
            </div>
            <div
              @click="setView(3, 'month')"
              :class="{ 'dx-item-selected': currentView == 'month' }"
              class="dx-widget dx-button dx-button-mode-contained dx-button-normal dx-button-has-text dx-item dx-buttongroup-item dx-item-content dx-buttongroup-item-content dx-buttongroup-last-item dx-shape-standard"
              role="button"
              aria-label="Tháng"
              aria-selected="false"
            >
              <div class="dx-button-content">
                <span class="dx-button-text">Tháng</span>
              </div>
            </div>
          </div>
          <div class="t-popup-setting">
            <el-tooltip content="Bộ lọc" placement="top">
              <div
                class="misa-icon-style mgl-16 mgt-5"
                @click="isShowPopup = !isShowPopup"
                ref="buttonSetting"
              >
                <div class="misa-icon-navbar t-icon-option misa-icon-24"></div>
              </div>
            </el-tooltip>
            <RoomBookingSetting
              :isShowPopup="isShowPopup"
              @onClickClosePopup="isShowPopup = false"
              @valueFilterRoom="valueFilterRoom"
            ></RoomBookingSetting>
          </div>
          <el-tooltip content="Nhập khẩu lịch học" placement="top">
            <div
              v-if="isAdmin"
              class="misa-icon-style mgl-16 mgtr-7"
              @click="isShowImportScheduler = !isShowImportScheduler"
              ref="buttonSetting"
            >
              <div class="icon-sibar t-icon-import-excel misa-icon-24"></div>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div v-if="lstRoom.length === 0" style="height: calc(100vh - 166px)">
      <NoData />
    </div>
    <div v-else style="height: calc(100vh - 166px)">
      <DxScheduler
        v-if="showView || isTypeDay"
        :dataSource="dataSource"
        :current-view="currentView"
        :current-date="currentDate"
        :start-day-hour="startDayHour"
        :end-day-hour="endDayHour"
        :cell-duration="cellDuration"
        :first-day-of-week="firstDayOfWeek"
        :show-all-day-panel="false"
        :height="height"
        :scrolling-mode="scrollingMode"
        :time-cell-template="timeCellTemplate"
        :date-cell-template="dateCellTemplate"
        appointment-template="AppointmentTemplateSlot"
        :on-content-ready="onContentReady"
        :on-appointment-form-opening="onAppointmentClick"
        :on-cell-click="onCellClick"
        :on-appointment-click="onAppointmentClick"
        resource-cell-template="resourceCellTemplate"
        :groups="['RoomID']"
      >
        <DxView
          class="day"
          type="day"
          height="85vh"
          :scrolling="{
            mode: 'virtual',
            showScrollbar: 'always',
            scrollByContent: true,
            useNative: false,
            useSimulatedScrollbar: true,
            scrollByThumb: true,
            bounceEnabled: false,
          }"
        />
        <DxView
          type="week"
          height="85vh"
          :scrolling="{
            mode: 'virtual',
            showScrollbar: 'always',
            scrollByContent: true,
            useNative: false,
            useSimulatedScrollbar: true,
            scrollByThumb: true,
            bounceEnabled: false,
          }"
        />

        <DxView
          type="month"
          height="85vh"
          :scrolling="{
            mode: 'virtual',
            showScrollbar: 'always',
            scrollByContent: true,
            useNative: false,
            useSimulatedScrollbar: true,
            scrollByThumb: true,
            bounceEnabled: false,
          }"
          :max-appointments-per-cell="5"
        />
        <DxResource
          :data-source="rooms"
          :allow-multiple="false"
          field-expr="RoomID"
        />
        <template #resourceCellTemplate="{ data: room }">
          <el-tooltip placement="bottom" effect="light">
            <template v-slot:content>
              <HeaderTooltip :room="room.data"></HeaderTooltip>
            </template>
            {{ room.data.RoomName }}
          </el-tooltip>
        </template>

        <template #AppointmentTemplateSlot="{ data }">
          <el-tooltip placement="top" effect="light">
            <template v-slot:content>
              <AppointmentTooltipTemplate
                :template-tooltip-model="data"
                :dataRoom="dataRoom"
              />
            </template>
            <AppointmentTemplate :template-model="data" />
          </el-tooltip>
          <!-- <AppointmentTemplate :scheduler="scheduler" :template-model="data" /> -->
        </template>
        <!-- <template #AppointmentTooltipTemplateSlot>
          <div class="dx-tooltip-wrapper" style="display: none"></div>
        </template> -->
      </DxScheduler>
      <ColumnBookingForWeekTemplate
        v-if="showView == false && isTypeDay == false"
        :data="dataSource"
        :dataRoom="lstRoom"
        :view="currentView"
        :dataDate="currentDate"
        @onShowLoading="showLoading(true)"
        @onLoadData="loadDataBooking()"
        @onSendingEmail="onSendingEmail"
      ></ColumnBookingForWeekTemplate>
    </div>
    <!--Begin Popup detail -->
    <RoomBookingPopup
      v-if="isShowForm"
      @onCloseForm="isShowForm = false"
      @onShowLoading="showLoading(true)"
      :roomID="roomID"
      :bookingID="bookingID"
      :dateBooking="dateBooking"
      :popupMode="popupMode"
      @onLoadData="loadDataBooking()"
      @isSuccess="onSendingEmail"
    />
    <ImportRoom
      v-if="isShowImportScheduler"
      @onCloseForm="isShowImportScheduler = false"
      @onShowLoading="showLoading(true)"
      @onLoadData="loadDataBooking()"
    ></ImportRoom>
    <!-- End popup detail -->
    <BaseLoading :isShowLoading="isShowLoading"></BaseLoading>
    <div class="misa-pagingtion">
      <BasePaging
        :totalRecord="totalRecord"
        @pageSizeSelected="pageSizeSelected"
        @currentPage="currentPage"
        :currentPage="pageIndex"
        :startRecord="startRecord"
        :endRecord="endRecord"
      ></BasePaging>
    </div>
  </div>
</template>

<script>
import { DxScheduler, DxResource, DxView } from 'devextreme-vue/scheduler'
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import AppointmentTemplate from './template/AppointmentTemplate.vue'
import AppointmentTooltipTemplate from './template/AppointmentTooltipTemplateVerDX.vue'
import BookingRoomApi from '@/apis/BookingRoomApi'
import RoomBookingPopup from './RoomBookingPopup.vue'
import BaseDate from '@/components/base/BaseDate.vue'
import ColumnBookingForWeekTemplate from '@/views/booking/template/ColumnBookingForWeekTemplate.vue'
import BaseDropdownbox from '@/components/base/BaseDropdownbox.vue'
import { mapActions, mapState } from 'vuex'
import Enum from '@/commons/Enum'
import NoData from './template/NoData.vue'
import BaseLoading from '@/components/base/BaseLoading.vue'
import HeaderTooltip from './template/HeaderTooltip.vue'
import RoomBookingSetting from './RoomBookingSetting.vue'
import ImportRoom from '../importroom/ImportRoom.vue'
import Resource from '@/commons/Resource'
import BasePaging from '@/components/base/BasePaging.vue'

export default {
  name: 'App',
  components: {
    DxScheduler,
    AppointmentTemplate,
    AppointmentTooltipTemplate,
    RoomBookingPopup,
    BaseDate,
    ColumnBookingForWeekTemplate,
    DxResource,
    DxView,
    BaseDropdownbox,
    NoData,
    BaseLoading,
    HeaderTooltip,
    RoomBookingSetting,
    ImportRoom,
    BasePaging,
  },
  data() {
    return {
      isShowForm: false,
      dataSource: [],
      isSelect: 1,
      showView: true,
      currentView: 'week',
      currentDate: new Date(),
      startDayHour: 7,
      endDayHour: 21,
      cellDuration: 60,
      firstDayOfWeek: 1,
      showAllDayPanel: false,
      height: '100%',
      scrollingMode: 'virtual',
      lstRoom: [],
      rooms: [],
      isTypeDay: false,
      roomID: '',
      bookingID: '',
      popupMode: 0,
      dateBooking: new Date(),
      filterOption: {
        RoomID: null,
        BuildingID: 'tatca',
        EquipmentIDs: null,
        UserID: null,
        CapacityMin: null,
        CapacityMax: null,
      },
      shouldRenderScheduler: true,
      scheduler: null,
      rangeCapacity: [],
      pageIndex: 0,
      startRecord: 0,
      endRecord: 0,
      totalRecord: 0,
      /** Biến show loading: true- show, false - hide*/
      isShowLoading: false,
      /**Biến show popup lọc theo điều kiện */
      isShowPopup: false,
      /**Biến show popup import  */
      isShowImportScheduler: false,
      isAdmin: false,
      schedulerConnection: Resource.SchedulerConnection,
    }
  },
  computed: {
    // Gán data
    ...mapState({
      roleOption: (state) => state.auth.roleOption,
      dataBuilding: (state) => state.dictionary.dataBuilding,
      dataRoom: (state) => state.dictionary.dataRoom,
    }),
    dataBuildingWithAll() {
      const dataBuilding = this.dataBuilding
      return (
        dataBuilding?.unshift({
          BuildingName: 'Tất cả',
          BuildingID: 'tatca',
        }) && dataBuilding
      )
    },
    dataRoomWithAll() {
      const dataRoom = this.dataRoom
      let roomsFilter = dataRoom?.filter(
        (room) => room.BuildingID === this.filterOption.BuildingID,
      )
      return (
        roomsFilter?.unshift({
          RoomName: 'Tất cả',
          RoomID: 'tatca',
        }) && roomsFilter
      )
    },
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
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        if (this.currentView == 'month') {
          return `
          <div class="date-cell" style="display:flex">
            <div class="day-of-week">${dayOfWeek} </div>
          </div>
        `
        } else if (this.currentView == 'week') {
          return `
          <div class="date-cell" style="display:flex">
            <div class="day-of-week">${dayOfWeek},&nbsp; </div>
            <div class="day-of-wee"> ${day}/ </div>
                <div class="day-of-week">${month} </div>
          </div>
        `
        }
      }
    },
  },
  methods: {
    /**
     * Sự kiện thay đổi số bản ghi/trang
     */
    pageSizeSelected(size) {
      this.pageSize = size
      this.showLoading(true)
      this.loadDataBooking()
    },
    /**
     * Sự kiện thay đổi số trang
     */
    currentPage(val) {
      this.pageIndex = val
      this.showLoading(true)
      this.loadDataBooking()
    },
    demo() {
      this.loadDataBooking()
      console.log('a')
    },
    // Gọi hàm load data từ store
    ...mapActions({
      loadDataBuildings: 'dictionary/loadDataBuildings',
      loadDataRooms: 'dictionary/loadDataRooms',
    }),
    onContentReady(e) {
      this.scheduler = e.component
    },
    // set view khi click chuyển đổi
    setView(option, name) {
      this.isTypeDay = name == 'day' ? true : false
      this.showView = this.lstRoom.length > 1 ? false : true
      if (option && name) {
        this.showLoading(true)
        this.currentView = name
        setTimeout(() => {
          this.showLoading(false)
        }, 1200) // hide loading after 2 seconds (adjust as needed)
      }
    },
    resetPosition() {
      // Reset popup position after it is closed
      this.position = {
        my: 'right top',
        at: 'right bottom',
        offset: '0 5',
      }
    },
    /**
     * Mô tả : Hàm show/hide loading
     * @param {Boolean} isShow true: hiển thị loading, false: ẩn loading
     * @Createdby: PTTAM
     */
    showLoading(isShow) {
      this.isShowLoading = isShow
      console.log('loading')
    },
    /**
     * Sự kiện tăng giảm ngày
     * 24.04.2023 PTTAM
     */
    SetDate(handle) {
      var date = new Date(this.currentDate)
      if (handle == 'increase') {
        // Tăng ngày hiện tại lên 1
        this.currentDate = date.setDate(date.getDate() + 1)
      }
      if (handle == 'reduce') {
        // Giảm ngày hiện tại xuống 1
        this.currentDate = date.setDate(date.getDate() - 1)
      }
    },
    /**
     * Sự kiện click vào lịch để đặt phòng
     * 24.04.2023 PTTAM
     */
    onAppointmentClick(e) {
      e.cancel = true // Hủy bỏ việc hiển thị popup mặc định của DevExtreme
      this.bookingID = e.appointmentData.BookingRoomID
      this.popupMode = Enum.PopupMode.EditMode
      // Lấy thời gian hiện tại
      this.isShowForm = true
      // var now = new Date()
      // this.isShowForm =
      //   new Date(e.appointmentData.startDate) >= now ? true : false
    },
    onCellClick(e) {
      this.dateBooking = e.cellData.startDate
      this.roomID = e.cellData.groups.RoomID
      this.popupMode = Enum.PopupMode.AddMode
      this.isShowForm = true
      // Lấy thời gian hiện tại
      var now = new Date()
      this.isShowForm = new Date(e.cellData.startDate) >= now ? true : false
    },
    /**
     * Sự kiện lấy dữ liệu đặt phòng
     * 23.04.2024
     * PTTAM
     */
    async loadDataBooking() {
      try {
        await BookingRoomApi.getPaging({
          roomID:
            this.filterOption.RoomID != 'tatca'
              ? this.filterOption.RoomID
              : null,
          userID: this.filterOption.UserID ? this.filterOption.UserID : null,
          buildingID:
            this.filterOption.BuildingID != 'tatca'
              ? this.filterOption.BuildingID
              : null,
          equipmentIDs: this.filterOption.EquipmentIDs
            ? this.filterOption.EquipmentIDs
            : null,
          capacityMin: this.filterOption.CapacityMin
            ? this.filterOption.CapacityMin
            : null,
          capacityMax: this.filterOption.CapacityMax
            ? this.filterOption.CapacityMax
            : null,
          pageSize: this.pageSize ? this.pageSize : 20,
          pageIndex: this.pageIndex ? this.pageIndex : 1,
        }).then((res) => {
          debugger
          ;(this.pageIndex = res.CurrentPage),
            (this.startRecord = res.startRecord),
            (this.endRecord = res.endRecord),
            (this.totalRecord = res.totalRecord),
            (this.dataSource = res.data.dataBooking || [])
          this.lstRoom = res.data.dataRoom || []
          if (res.data.option == 1 || this.isTypeDay) {
            this.showView = true
          } else {
            this.showView = false
          }
        })
      } catch (error) {
        console.log(error)
      }
      this.handleDataSource()
    },
    // cập nhật lại ngày khi chọn lại
    onDateBoxChanged(item) {
      this.currentDate = item.value
    },
    /**
     * Convert date để hiển thị lên lịch
     * PTTAM 23.04.2023
     */
    handleDataSource() {
      this.showLoading(false)
      this.rooms = []
      this.lstRoom.forEach((element) => {
        this.rooms.push({
          id: element.RoomID,
          code: element.RoomCode,
          RoomName: element.RoomName,
          Capacity: element.Capacity,
          ListEquipmentName: element.ListEquipmentName,
          AvartarAdmin: element.AvartarAdmin,
          AdminEmail: element.AdminEmail,
          AdminName: element.AdminName,
        })
      })
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
    /**
     * Sự kiện thay đổi phòng
     * @param {*} value
     */
    onValueChangeRoom(value) {
      this.filterOption.RoomID = value ? value : null
      this.showLoading(true)
      this.loadDataBooking()
    },
    /**
     * Sự kiện thay đổi phòng
     * @param {*} value
     */
    onValueChangeShedulerConnection(value) {
      if (value == Enum.SchedulerConnection.ALL) {
        this.filterOption.UserID = null
      } else {
        this.filterOption.UserID = JSON.parse(
          localStorage.getItem('user'),
        ).UserID
      }

      this.showLoading(true)
      this.loadDataBooking()
    },
    /**
     * Sự kiện thay đổi tòa nhà
     */
    onValueChangeBuilding(value) {
      this.filterOption.BuildingID = value ? value : null
      this.showLoading(true)
      if (this.filterOption.BuildingID != null) {
        this.filterOption.RoomID = null
      }
      this.loadDataBooking()
    },
    /**
     * Sự kiện lọc theo bộ lọc
     */
    valueFilterRoom(data) {
      this.filterOption.CapacityMin = data.CapacityMin - 0
      this.filterOption.CapacityMax = data.CapacityMax - 0
      this.filterOption.EquipmentIDs = data.EquipmentIDs
      this.showLoading(true)
      this.loadDataBooking()
    },
    /**
     * Thực hiện gửi email
     */
    onSendingEmail(result) {
      switch (result.popupMode) {
        case Enum.PopupMode.AddMode:
          BookingRoomApi.sendEmailPending(result.bookingRoomData).then(
            (res) => {
              if (res) {
                console.log(res)
              }
            },
          )
          break
        case Enum.PopupMode.EditMode:
          BookingRoomApi.sendingEmailUpdate(
            result.bookingID,
            result.bookingRoomData,
          ).then((res) => {
            if (res) {
              console.log(res)
            }
          })
          break
        case 9:
          BookingRoomApi.sendingEmailCancel(result.bookingID).then((res) => {
            if (res) {
              console.log(res)
            }
          })
          break
        default:
          break
      }
    },
  },

  async created() {},
  async mounted() {
    this.showLoading(true)
    this.loadDataBooking()
    await this.loadDataBuildings()
    await this.loadDataRooms()
    this.loadDataBooking()
    this.isAdmin =
      localStorage.getItem('roleOption') - 0 == Enum.RoleOption.Admin
        ? true
        : false
  },
}
</script>
<style>
.input_date {
  min-width: 220px;
  display: flex;
  width: 220px;
}

.toolbar {
  display: flex;
  width: 100%;
  height: 56px;
  background-color: #f5f5f5;
  align-items: center;
  position: relative;
}

.dx-buttongroup_custom {
  position: absolute;
  right: 10px;
}
.mgt-5 {
  margin-top: 5px;
}
.mgtr-7 {
  margin-top: 7px;
  margin-right: 8px;
}
.dx-scheduler-header {
  display: none !important;
}

.dx-scheduler-work-space-day .dx-scheduler-group-header {
  height: 50px !important;
  width: 200px;
}
.dx-scheduler-work-space-day .dx-scheduler-cell-sizes-horizontal {
  width: 200px;
}
th.dx-scheduler-group-header {
  font-size: 16px;
}
.dx-buttongroup-wrapper {
  cursor: pointer;
}
tr.dx-scheduler-group-row {
  border-bottom: 1px solid rgba(221, 221, 221, 0.6) !important;
}
.my-popper-class {
  margin-top: 100px;
  margin-left: 20px;
  right: 18px;
  top: 20px !important;
  left: unset !important;
  z-index: 1000 !important;
  padding: 0 !important;
  border-radius: 6px;
}
.my-popper-class span.el-popper__arrow {
  display: none;
}
.t-popup-setting {
  position: relative;
}
.t-location-building {
  border: 1px solid rgba(221, 221, 221, 0.6);
  background: #fff;
}
.misa-pagingtion {
  border-top: none;
  padding: 0px 0 !important;
  height: 40px;
  position: relative;
  /* margin: 0 10px 8px 10px; */
  margin-top: 3px;
  background-color: #f9fafc !important;
}
</style>
