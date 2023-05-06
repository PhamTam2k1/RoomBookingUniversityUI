<template>
  <div id="body">
    <div id="bd-overview">
      <div class="filter-options">
        <DxTextBox
          placeholder="Tìm kiếm"
          class="input-field"
          v-model:value="searchText"
          height="34"
          width="300"
        >
          <div class="input-field-icon icon-search"></div>
        </DxTextBox>
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
            :dataSource="dataBookingStatus"
            optionName="StatusName"
            optionValue="StatusValue"
            :isSearch="true"
            :height="34"
            :width="165"
            placeholder="Trạng thái phòng"
            @onValueChange="onValueChangeTypeRoom"
          ></BaseDropdownbox>
        </div>
        <div class="t-row">
          <base-select-tagbox
            :dataSource="dataEquipment"
            :height="34"
            :width="250"
            classDropdownbox="drop-down-utc mgl-16"
            optionName="EquipmentName"
            optionValue="EquipmentID"
            placeholder="Chọn thiết bị"
            @onOptionChange="onOptionChangeEquipment"
          >
          </base-select-tagbox>
        </div>
        <div class="t-row">
          <base-date-picker
            class="mgl-16"
            :modelValue="filterOption.DateFilter"
            @change-date="changeDate"
          ></base-date-picker>
        </div>
      </div>
      <DxDataGrid
        id="gridContainer"
        :data-source="dataSource"
        key-expr="RoomCode"
        :show-borders="true"
      >
        <DxColumn data-field="RoomName" caption="Phòng" />
        <DxColumn data-field="BuildingName" caption="Toà" />
        <DxColumn data-field="Capacity" caption="Sức chứa" />
        <DxColumn data-field="TimeSlotName" caption="Ca học" />
        <DxColumn data-field="StartTime" caption="Thời gian bắt đầu" />
        <DxColumn data-field="EndTime" caption="Thời gian kết thúc" />
        <DxColumn data-field="Date" caption="Ngày" />
        <DxColumn data-field="RoomStatus" caption="Trạng thái phòng" />
        <DxColumn data-field="IsOpen" caption="Tuần" />
        <DxScrolling row-rendering-mode="virtual" />
        <DxPaging :enabled="false" />
      </DxDataGrid>
      <div class="misa-pagingtion">
        <base-paging
          :totalRecord="totalRecord"
          @pageSizeSelected="pageSizeSelected"
          @currentPage="currentPage"
          :currentPage="pageIndex"
          :startRecord="startRecord"
          :endRecord="endRecord"
        ></base-paging>
      </div>
    </div>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxScrolling,
  DxColumn,
  DxPaging,
} from 'devextreme-vue/data-grid'
import DxTextBox from 'devextreme-vue/text-box'
import { mapActions, mapState } from 'vuex'
import Resource from '@/commons/Resource'
import BookingRoomApi from '@/apis/BookingRoomApi'
import BaseDropdownbox from '@/components/base/BaseDropdownbox.vue'
export default {
  components: {
    DxDataGrid,
    DxScrolling,
    DxColumn,
    DxTextBox,
    DxPaging,
    BaseDropdownbox,
  },
  data() {
    return {
      dataBookingStatus: Resource.BookingStatus,
      dataSource: [],
      pageIndex: 1,
      showPageSizeSelector: true,
      showNavButtons: true,
      searchText: '',
      pageSize: 10,
      dateFilter: new Date(),
      totalRecord: 0,
      startRecord: 0,
      endRecord: 0,
      filterOption: {
        RoomID: null,
        BuildingID: null,
        TimeSlotID: null,
        EquipmentID: null,
        Keyword: null,
        Type: 1,
        DateFilter: new Date(),
      },
    }
  },
  computed: {
    // Gán data
    ...mapState({
      dataBuilding: (state) => state.dictionary.dataBuilding,
      dataEquipment: (state) => state.dictionary.dataEquipment,
      dataRoom: (state) => state.dictionary.dataRoom,
    }),
  },
  methods: {
    // Gọi hàm load data từ store
    ...mapActions({
      loadDataBuildings: 'dictionary/loadDataBuildings',
      loadDataEquipments: 'dictionary/loadDataEquipments',
      loadDataRooms: 'dictionary/loadDataRooms',
    }),
    /**
     * Sự kiện thay đổi date
     * @param {*} value
     */
    changeDate(value) {
      this.dateFilter = value
      this.filterOption.DateFilter = value
      this.loadDataBooking()
    },
    onValueChangeTypeRoom(value) {
      this.filterOption.Type = value
      this.loadDataBooking()
    },
    /**
     * Sự kiện thay đổi phòng
     * @param {*} value
     */
    onValueChangeRoom(value) {
      this.filterOption.RoomID = value
      this.loadDataBooking()
    },
    /**
     * Sự kiện thay đổi tòa nhà
     */
    onValueChangeBuilding(value) {
      this.filterOption.BuildingID = value
      this.loadDataBooking()
    },
    /**
     * Sự kiện thay đổi ca học
     * @param {*} value
     */
    onValueChangeTimeSlot(value) {
      this.filterOption.TimeSlotID = value
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

          ids += "'" + element.EquipmentID.trim() + "',"
        })
        ids = ids.slice(0, -1)
        this.filterOption.EquipmentID = ids
        this.loadDataBooking()
      }
    },
    /**
     * Mô tả : Sự kiện thay đổi số bản ghi / 1 trang
     * @param {Number} size --  trang
     * @Createdby: PTTAM
     * Created date: 22:50 03/09/2022
     */
    pageSizeSelected(size) {
      this.pageSize = size
      this.currentPageSize = 1
      this.loadDataBooking()
    },
    /**
     * Mô tả : Gán lại trang hiện tại khi nhận được sự kiện chuyển trang và load lại dữ liệu
     * @param {Number} val trang hiện tại
     * @Createdby PTTAM
     * Created date: 23:52 28/07/2022
     */
    currentPage(val) {
      this.pageIndex = val
      this.loadDataBooking()
    },
    loadDataBooking() {
      try {
        BookingRoomApi.getPaging({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          keyword: '',
          dateFilter: this.filterOption.DateFilter,
          roomID: this.filterOption.RoomID,
          timeSlotID: this.filterOption.TimeSlotID,
          buildingID: this.filterOption.BuildingID,
          equipmentID: this.filterOption.EquipmentID,
          type: this.Type,
        }).then((res) => {
          this.dataSource = res.data.Data || []
          this.totalRecord = res.data.TotalRecord
          this.pageIndex = res.data.CurrentPage
          this.startRecord = res.data.StartRecord
          this.endRecord = res.data.EndRecord
        })
      } catch (error) {
        console.log(error)
      }
    },
  },

  /**
   * Thực hiện gọi api để lấy dữ liệu phòng, thiết bị, tòa nhà
   * PTTAM 02.04.2023
   */
  async created() {
    try {
      this.loadDataBooking()
      await this.loadDataBuildings()
      await this.loadDataEquipments()
      await this.loadDataRooms()
    } catch (error) {
      console.error(error)
    }
  },
  mounted() {
    this.filterOption.DateFilter = Date.now()
  },
}
</script>

<style lang="scss" scoped>
#body {
  flex: 1;
  #bd-overview {
    padding: 20px;
    background: white;
  }
}

#gridContainer {
  height: 500px;
}
.filter-options {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;

  .option {
    margin-left: 20px;
  }

  .input-field {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 30px;

    .input-field-icon {
      position: absolute;
      width: 20px;
      height: 20px;
      z-index: 1;
      margin-left: -20px;
      background: url('@/assets/images/Icon.de5bb0db.svg') no-repeat;

      &.icon-search {
        background-position: -194px -2px;
      }
    }
  }
}
</style>
