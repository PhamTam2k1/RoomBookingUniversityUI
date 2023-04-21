
<template>
  <div class="container">
    
   
    <div class="sheduler-content">
      <DxScheduler
        @appointment-click="deleteRecurrence"
        time-zone="America/Los_Angeles"
        :data-source="dataSource"
        :views="views"
        :current-date="currentDate"
        :height="800"
        :groups="groups"
        :first-day-of-week="0"
        :start-day-hour="9"
        :end-day-hour="23"
        :show-all-day-panel="false"
        :cross-scrolling-enabled="false"
        :cell-duration="cellDuration"
        :editing="editing"
        :on-content-ready="onContentReady"
        :on-appointment-form-opening="onAppointmentFormOpening"
        appointment-template="AppointmentTemplateSlot"
        appointment-tooltip-template="AppointmentTooltipTemplateSlot"
        current-view="workWeek"
        :on-appointment-added="onAddedRoom"
        :on-appointment-updated="onUpdatedRoom"
        :on-appointment-deleted="onDeletedRoom"
       
      >
        <DxResource
          :use-color-as-default="true"
          :data-source="moviesData"
          field-expr="movieId"
        />
        <!-- <DxResource :data-source="moviesData" field-expr="movieId" /> -->
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
    </div>
    
  </div>
 <RoomBookingPopup
 v-if="false"
      @onCloseForm="showFormDetail(false)"
      @onLoadData="getData()"
      @onShowLoading="showLoading(true)"
 />
</template>


<script>
/* eslint-disable */
import DxScheduler, { DxResource } from "devextreme-vue/scheduler";
import Query from "devextreme/data/query";
import AppointmentTemplate from "./template/AppointmentTemplate.vue";
import AppointmentTooltipTemplate from "./template/AppointmentTooltipTemplate.vue";
import { DxSelectBox } from "devextreme-vue/select-box";
import { DxNumberBox } from "devextreme-vue/number-box";
import { DxCheckBox } from "devextreme-vue/check-box";
import  ImportRoom  from "../importroom/ImportRoom.vue";
import RoomBookingPopup from "./RoomBookingPopup.vue";
import {
  data,
  moviesData,
  theatreData,
  floors,
  building,
  rooms,

} from "../data/data.js";


const getMovieById = function (resourceId) {
  return Query(moviesData).filter("id", resourceId).toArray()[0];
};

export default {
  components: {
    DxScheduler,
    DxResource,
    AppointmentTemplate,
    AppointmentTooltipTemplate,
    DxSelectBox,
    DxNumberBox,
    DxCheckBox,
    ImportRoom,
    RoomBookingPopup
  },
  data() {
    return {
      views: [
        {
          name: "Ngày",
          type: "day",
          intervalCount: 1,
          startDate: new Date(2021, 3, 4),
        },
        {
          groups: ["movieId"],
          name: "Tuần",
          type: "workWeek",
          intervalCount: 1,
          startDate: new Date(2021, 2, 4),
          groupOrientation: "vertical",
          intervalCount: 1,
          // cellDuration: 1440
          // groupByDate: true,
        },
        {
          name: "Tháng",
          type: "month",
          intervalCount: 1,
        },
      ],
      groups: ["movieId"],
      scheduler: null,
      groupOrientation: "vertical",
      currentDate: new Date(2021, 3, 27),
      dataSource: data,
      moviesData,
      theatreData,
      cellDuration:20,
      //editing: { allowAdding: true },
      floors,
      building,
      rooms,
      searchModeOption: "contains",
      searchExprOption: "Name",
      searchTimeoutOption: 200,
      minSearchLengthOption: 0,
      showDataBeforeSearchOption: false,
      floorsFilter: [],
      roomsFilter: [],
      buildingSelected: "",
      floorSelected: "",
      roomSelected: "",
    };
  },
  computed: {
    editing() {
      return {
        allowAdding: false,
        allowDeleting: true,
        allowUpdating: true,
        allowResizing: true,
        allowDragging: true,
      };
    },
  },
  methods: {
    dateCellTemplate() {
      return ({ date }) => {
        const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `
          <div class="date-cell" style="display:flex">
            <div class="day-of-week">${dayOfWeek} - </div>
            <div class="day">${day} / </div>
            <div class="month">${month}</div>
          </div>
        `;
      }
    },
    onContentReady(e) {
      this.scheduler = e.component;
    },
    onAppointmentFormOpening(e) {
      const { form } = e;
      let movieInfo = getMovieById(e.appointmentData.movieId) || {};
      let { startDate } = e.appointmentData;

      form.option("items", [
        {
          label: {
            text: "Movie",
          },
          editorType: "dxSelectBox",
          dataField: "movieId",
          editorOptions: {
            items: moviesData,
            displayExpr: "text",
            valueExpr: "id",
            onValueChanged(args) {
              movieInfo = getMovieById(args.value);

              form.updateData("director", movieInfo.director);
              form.updateData(
                "endDate",
                new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration)
              );
            },
          },
        },
        {
          label: {
            text: "Tác giả",
          },
          name: "director",
          editorType: "dxTextBox",
          editorOptions: {
            value: movieInfo.director,
            readOnly: true,
          },
        },
        {
          dataField: "startDate",
          editorType: "dxDateBox",
          editorOptions: {
            width: "100%",
            type: "datetime",
            onValueChanged(args) {
              startDate = args.value;
              form.updateData(
                "endDate",
                new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration)
              );
            },
          },
        },
        {
          name: "endDate",
          dataField: "endDate",
          editorType: "dxDateBox",
          editorOptions: {
            width: "100%",
            type: "datetime",
            readOnly: true,
          },
        },
        {
          dataField: "price",
          editorType: "dxRadioGroup",
          editorOptions: {
            dataSource: [5, 10, 15, 20],
            itemTemplate(itemData) {
              return "$".concat(itemData);
            },
          },
        },
      ]);
    },
    /**
     * Sự kiện thay đổi tòa nhà
     */
    onValueBuildingChanged(data) {
      this.buildingSelected = data.value;
      this.roomSelected = "";
      this.floorSelected = "";
      this.roomsFilter = [];
      this.floorsFilter = floors.filter((x) => x.BuildingID == data.value);
    },
    /**
     * Sự kiện thay đổi tầng
     */
    onValueFloorChanged(data) {
      this.floorSelected = data.value;
      this.roomSelected = "";
      this.roomsFilter = rooms.filter(
        (x) => x.BuildingID == this.buildingSelected && x.FloorID == data.value
      );
    },
    /**
     * Sự kiện thay đổi phòng
     */
    onValueRoomChanged(data) {
      this.roomSelected = data.value;
    },

    /**
     * Sự kiện thêm lịch
     */
    onAddedRoom(e) {
      console.log("Added", e.appointmentData.text, "success");
    },
    /**
     * Sự kiện sửa lịch
     */
    onUpdatedRoom(e) {
      console.log("Updated", e.appointmentData.text, "info");
    },
    /**
     * Sự kiện xóa lịch
     */
    onDeletedRoom(e) {
      console.log("Deleted", e.appointmentData.text, "warning");
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  // margin: 50px;
  .select-bar {
    height: 44px;
    margin-bottom: 25px;
    display: flex;
    position: relative;
    .item-select {
      width: 250px;
    }
    .item-select:not(:first-child) {
      margin-left: 25px;
    }
    .import-el{
      position: absolute;
      right: 10px;
    }
  }
  .sheduler-content {
    height: 600px !important;
  }
}

.widget-container {
  margin-right: 320px;
}

.current-product {
  padding-top: 11px;
}

.current-value {
  font-weight: bold;
}
.dx-scheduler.dx-widget.dx-visibility-change-handler {
    height: 600px !important;
    width: calc(100vw - 327px) !important;
}
.options {
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 260px;
}

.caption {
  font-weight: 500;
  font-size: 18px;
}

.option {
  margin-top: 10px;
}
</style>
