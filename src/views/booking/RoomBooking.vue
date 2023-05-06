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
        <div class="t-row">
          <BaseDropdownbox
            classDropdownbox="drop-down-utc mgl-16"
            :dataSource="dataBuilding"
            optionName="BuildingName"
            optionValue="BuildingID"
            :isSearch="true"
            :height="34"
            :width="120"
            placeholder="Chọn vị trí"
            @onValueChange="onValueChangeBuilding"
          ></BaseDropdownbox>
        </div>
        <div class="t-row">
          <BaseDropdownbox
            classDropdownbox="drop-down-utc mgl-16"
            :dataSource="dataRoom"
            optionName="RoomName"
            optionValue="RoomID"
            :isSearch="true"
            :height="34"
            :width="150"
            placeholder="Chọn phòng"
            @onValueChange="onValueChangeRoom"
          ></BaseDropdownbox>
        </div>

        <div class="t-row">
          <BaseSelectTagBox
            :dataSource="dataEquipment"
            :height="34"
            :width="250"
            classDropdownbox="drop-down-utc mgl-16"
            optionName="EquipmentName"
            optionValue="EquipmentID"
            placeholder="Chọn thiết bị"
            @onOptionChange="onOptionChangeEquipment"
          >
          </BaseSelectTagBox>
        </div>
      </div>
      <div
        role="group"
        class="dx-buttongroup_custom dx-buttongroup dx-widget"
        tabindex="0"
      >
        <div class="dx-buttongroup-wrapper dx-widget dx-collection">
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
      </div>
    </div>
    <div v-if="lstRoom.length === 0">
      <NoData />
    </div>
    <div v-else>
      <DxScheduler
        v-if="showView || isTypeDay"
        :dataSource="dataSource"
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
        :on-content-ready="onContentReady"
        :on-appointment-form-opening="onAppointmentClick"
        :on-cell-click="onCellClick"
        :on-appointment-click="onAppointmentClick"
        resource-cell-template="resourceCellTemplate"
      >
        <DxView
          class="day"
          type="day"
          groups="RoomID"
          height="75vh"
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
          height="75vh"
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
          height="75vh"
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
                :scheduler="scheduler"
                :template-tooltip-model="data"
              />
            </template>
            <AppointmentTemplate
              :scheduler="scheduler"
              :template-model="data"
            />
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
      ></ColumnBookingForWeekTemplate>
    </div>

    <!--Begin Popup detail -->
    <RoomBookingPopup
      v-if="isShowForm"
      @onCloseForm="isShowForm = false"
      @onShowLoading="showLoading(true)"
      :roomID="roomID"
      :bookingID="bookingID"
      :popupMode="popupMode"
      @onLoadData="loadDataBooking()"
    />
    <!-- End popup detail -->
    <BaseLoading :isShowLoading="isShowLoading"></BaseLoading>
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
import BaseSelectTagBox from '@/components/base/BaseSelectTagBox.vue'
import Enum from '@/commons/Enum'
import NoData from './template/NoData.vue'
import BaseLoading from '@/components/base/BaseLoading.vue'
import HeaderTooltip from './template/HeaderTooltip.vue'
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
    BaseSelectTagBox,
    NoData,
    BaseLoading,
    HeaderTooltip,
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
      filterOption: {
        RoomID: null,
        BuildingID: null,
        EquipmentIDs: null,
        UserID: null,
        CapacityMin: null,
        CapacityMax: null,
      },
      /** Biến show loading: true- show, false - hide*/
      isShowLoading: false,
    }
  },
  computed: {
    // Gán data
    ...mapState({
      dataBuilding: (state) => state.dictionary.dataBuilding,
      dataEquipment: (state) => state.dictionary.dataEquipment,
      dataRoom: (state) => state.dictionary.dataRoom,
    }),
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
    // Gọi hàm load data từ store
    ...mapActions({
      loadDataBuildings: 'dictionary/loadDataBuildings',
      loadDataEquipments: 'dictionary/loadDataEquipments',
      loadDataRooms: 'dictionary/loadDataRooms',
    }),
    onContentReady(e) {
      this.scheduler = e.component
      this.showLoading(false)
    },
    // set view khi click chuyển đổi
    setView(option, name) {
      this.isTypeDay = name == 'day' ? true : false
      this.showView = this.lstRoom.length > 1 ? false : true
      if (option && name) {
        this.currentView = name
      }
    },

    /**
     * Mô tả : Hàm show/hide loading
     * @param {Boolean} isShow true: hiển thị loading, false: ẩn loading
     * @Createdby: PTTAM
     */
    showLoading(isShow) {
      this.isShowLoading = isShow
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
      debugger
      e.cancel = true // Hủy bỏ việc hiển thị popup mặc định của DevExtreme
      if (e.appointmentData?.BookingRoomID) {
        this.bookingID = e.appointmentData.BookingRoomID
        this.popupMode = Enum.PopupMode.EditMode
      } else {
        this.roomID = e.appointmentData.RoomID
        this.popupMode = Enum.PopupMode.AddMode
      }
      // Lấy thời gian hiện tại
      this.isShowForm = true
      // var now = new Date()
      // this.isShowForm =
      //   new Date(e.appointmentData.startDate) >= now ? true : false
    },
    onCellClick(e) {
      this.roomID = e.cellData.groups.RoomID
      this.popupMode = Enum.PopupMode.AddMode
      this.isShowForm = true
      // // Lấy thời gian hiện tại
      // var now = new Date()
      // this.isShowForm = new Date(e.cellData.startDate) >= now ? true : false
    },
    /**
     * Sự kiện lấy dữ liệu đặt phòng
     * 23.04.2024
     * PTTAM
     */
    async loadDataBooking() {
      try {
        await BookingRoomApi.getPaging({
          roomID: this.filterOption.RoomID ? this.filterOption.RoomID : null,
          userID: this.filterOption.UserID ? this.filterOption.UserID : null,
          buildingID: this.filterOption.BuildingID
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
        }).then((res) => {
          this.dataSource = res.data.dataBooking || []
          this.lstRoom = res.data.dataRoom || []
          if (res.data.option == 1 || this.isTypeDay) {
            this.showView = true
          } else {
            this.showView = false
          }

          this.handleDataSource()
        })
      } catch (error) {
        console.log(error)
      }
    },
    // cập nhật lại ngày khi chọn lại
    onDateBoxChanged(item) {
      this.showLoading(true)
      this.currentDate = item.value
    },
    /**
     * Convert date để hiển thị lên lịch
     * PTTAM 23.04.2023
     */
    handleDataSource() {
      this.rooms = []
      this.lstRoom.forEach((element) => {
        this.rooms.push({
          id: element.RoomID,
          code: element.RoomCode,
          RoomName: element.RoomName,
          Capacity: element.Capacity,
          ListEquipmentName: element.ListEquipmentName,
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
      this.showLoading(false)
    },
    /**
     * Sự kiện thay đổi phòng
     * @param {*} value
     */
    onValueChangeRoom(value) {
      this.filterOption.RoomID = value
      this.showLoading(true)
      this.loadDataBooking()
    },
    /**
     * Sự kiện thay đổi tòa nhà
     */
    onValueChangeBuilding(value) {
      this.filterOption.BuildingID = value
      this.showLoading(true)
      this.loadDataBooking()
    },
    /**
     * Sự kiện thay đổi lọc thiết bị trong phòng học
     * @param {*} values
     */
    onOptionChangeEquipment(values) {
      if (values) {
        let ids = ''

        values?.forEach((element) => {
          console.log(element)

          ids += element.EquipmentID.trim() + ','
        })
        ids = ids.slice(0, -1)
        this.filterOption.EquipmentIDs = ids
        this.showLoading(true)
        this.loadDataBooking(this.handleDataSource)
      }
    },
  },
  async created() {
    this.showLoading(true)
    this.loadDataBooking()
    await this.loadDataBuildings()
    await this.loadDataEquipments()
    await this.loadDataRooms()
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
  right: 30px;
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
</style>
