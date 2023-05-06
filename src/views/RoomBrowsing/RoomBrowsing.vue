<template>
  <div id="body-browsing">
    <div id="bd-room-browsing" class="Body">
      <div class="filter-options">
        <DxTextBox
          placeholder="Tìm kiếm lịch họp"
          class="input-field"
          v-model:value="dataComponent.keyword"
          height="34"
          :width="300"
          @input="filterBooking"
        >
          <div class="input-field-icon icon-search"></div>
        </DxTextBox>
      </div>
      <!-- Begin table -->
      <div class="misa-tabble">
        <BaseTable
          :optionItems="headerTableBookingRoom"
          :dataSource="dataComponent.dataSource"
          id="table-equipment"
          :tableMode="0"
        >
          <template #baseCell="{ data }">
            <BaseCellTemplace
              :data="data"
              id="BookingRoomID"
              @onClickShowPopupReject="confirmRefuseClick"
              @onClickShowPopupApprove="confirmApproveClick"
              :isAdmin="dataComponent.isAdmin"
            ></BaseCellTemplace>
          </template>
        </BaseTable>
      </div>
      <!-- End table -->
      <!-- Begin paging -->
      <div class="misa-pagingtion">
        <BasePaging
          :totalRecord="dataComponent.totalRecord"
          @pageSizeSelected="pageSizeSelected"
          @currentPage="currentPage"
          :currentPage="dataComponent.pageIndex"
          :startRecord="dataComponent.startRecord"
          :endRecord="dataComponent.endRecord"
        ></BasePaging>
      </div>
      <!-- End Paging -->
    </div>
  </div>
  <ConfirmApproveProcessVue
    @onClickClosePopup="onClickClosePopup"
    :popupMode="dataComponent.popupMode"
    v-if="dataComponent.popupMode == Enum.PopupMode.ApproveMode"
    @approveClick="approveClick"
  />

  <ConfirmRefuseProcessVue
    @refuseClick="(reson) => refuseClick(reson)"
    @onClickClosePopup="onClickClosePopup"
    :popupMode="dataComponent.popupMode"
    v-if="dataComponent.popupMode == Enum.PopupMode.RefuseMode"
  />

  <!-- Loading -->
  <BaseLoading :isShowLoading="dataComponent.isShowLoading"></BaseLoading>
</template>
<script>
import BookingRoomApi from '@/apis/BookingRoomApi'
import BasePaging from '@/components/base/BasePaging.vue'
import BaseCellTemplace from '@/components/base/BaseCellTemplace.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import DxTextBox from 'devextreme-vue/text-box'
import Enum from '@/commons/Enum'
import { reactive } from 'vue'
import ConfirmApproveProcessVue from './ConfirmApproveProcess.vue'
import ConfirmRefuseProcessVue from './ConfirmRefuseProcess.vue'
import { mapState } from 'vuex'
import BaseLoading from '@/components/base/BaseLoading.vue'
import ObjectFunction from '@/commons/CommonFuction'
import Resource from '@/commons/Resource'
export default {
  components: {
    BaseTable,
    BaseCellTemplace,
    DxTextBox,
    BasePaging,
    ConfirmApproveProcessVue,
    ConfirmRefuseProcessVue,
    BaseLoading,
  },
  props: {
    weekID: {
      type: Number,
    },
  },

  setup() {
    var dataComponent = reactive({
      dataSource: [],
      isAdmin: false,
      pageIndex: 1,
      pageSize: 15,
      popupVisible: false,
      refuseVisible: false,
      dataSelect: {},
      startRecord: 1,
      endRecord: 1,
      totalRecord: 1,
      /**Timout của tìm kiếm */
      timeout: 1000,
      keyword: '',
      /** Biến show loading: true- show, false - hide*/
      isShowLoading: false,
      userID: null,
    })
    var headerTableBookingRoom = [
      {
        dataField: 'BookingRoomID',
        visible: false,
        width: 0,
      },
      {
        dataField: 'FullName',
        caption: 'Người đặt lịch',
        visible: true,
        width: 200,
      },
      {
        dataField: 'RoomName',
        caption: 'Tên phòng',
        visible: true,
        width: 150,
      },
      {
        dataField: 'BuildingName',
        caption: 'Tên tòa nhà',
        visible: true,
        width: 120,
      },
      {
        dataField: 'TimeSlotName',
        caption: 'Ca đặt',
        visible: true,
        width: 70,
      },
      {
        dataField: 'DateRequest',
        caption: 'Ngày yêu cầu',
        visible: true,
        width: 120,
        dataType: 'date',
        format: 'dd/MM/yyyy',
        calculateCellValue: function (data) {
          const date = new Date(data.DateRequest)
          const day = date.getDate().toString().padStart(2, '0')
          const month = (date.getMonth() + 1).toString().padStart(2, '0')
          const year = date.getFullYear()
          return `${day}/${month}/${year}`
        },
      },
      {
        dataField: 'StartDate',
        caption: 'Ngày đặt',
        visible: true,
        width: 120,
        dataType: 'date',
        format: 'dd/MM/yyyy',
        calculateCellValue: function (data) {
          const date = new Date(data.StartDate)
          const day = date.getDate().toString().padStart(2, '0')
          const month = (date.getMonth() + 1).toString().padStart(2, '0')
          const year = date.getFullYear()
          return `${day}/${month}/${year}`
        },
      },
      {
        dataField: 'Description',
        caption: 'Tiêu đề',
        visible: true,
        width: 250,
      },
      {
        dataField: 'Approve',
        caption: '',
      },
    ]
    /**
     * Mô tả : Hàm show/hide loading
     * @param {Boolean} isShow true: hiển thị loading, false: ẩn loading
     * @Createdby: PTTAM
     */
    function showLoading(isShow) {
      dataComponent.isShowLoading = isShow
    }
    /**
     * đóng popup phê duyệt
     * @param {
     * } val
     */
    const closePopup = () => {
      dataComponent.popupVisible = false
    }
    /** Mô tả: ẩn popup
     * CreatedBy: PTTAM
     * Created Date: 11-09-2022 08:22:11
     */
    function onClickClosePopup() {
      dataComponent.popupMode = -1
    }
    /** Mô tả: Sự kiện keyup để tìm kiếm lịch
     * CreatedBy: PTTAM
     */
    function filterBooking() {
      clearTimeout(dataComponent.timeout)
      dataComponent.timeout = setTimeout(() => {
        getData()
      }, 500)
    }
    /**
     * đóng popup từ chối
     * @param {
     * } val
     */
    const closeRefusePopup = () => {
      dataComponent.refuseVisible = false
    }

    /**
     * lấy dữ liệu
     *
     */
    const getData = () => {
      try {
        BookingRoomApi.getPagingRequest({
          pageIndex: dataComponent.pageIndex,
          pageSize: dataComponent.pageSize,
          keyword: dataComponent.keyword,
          userID: dataComponent.userID,
        }).then((res) => {
          dataComponent.dataSource = res.data.Data || []
          dataComponent.pageIndex = res.data.CurrentPage
          dataComponent.startRecord = res.data.StartRecord
          dataComponent.endRecord = res.data.EndRecord
          dataComponent.totalRecord = res.data.TotalRecord
          showLoading(false)
        })
      } catch (error) {
        showLoading(false)
        console.log(error)
      }
    }
    /**
     * load lại dữ liệu khi thay đổi số bản ghi/ trang
     * @param {*} size - số bản ghi/ trang
     */
    const pageSizeSelected = (size) => {
      dataComponent.pageSize = size
      showLoading(true)
      getData()
    }

    /**
     * load lại dữ liệu khi thay đổi trang
     * @param {*} val - trang hiện tại
     */
    const currentPage = (val) => {
      dataComponent.pageIndex = val
      showLoading(true)
      getData()
    }

    /**
     * confirm phê duyệt
     *
     */
    const confirmApproveClick = (e) => {
      dataComponent.popupMode = Enum.PopupMode.ApproveMode
      dataComponent.dataSelect = e
    }

    /**
     * confirm từ chối
     *
     */
    const confirmRefuseClick = (e) => {
      dataComponent.popupMode = Enum.PopupMode.RefuseMode
      dataComponent.dataSelect = e
    }

    /**
     * phê duyệt
     *
     */
    const approveClick = async () => {
      try {
        const res = await BookingRoomApi.approveRequest({
          bookingRoomID: dataComponent.dataSelect,
          option: Enum.OptionRequest.Approve,
        })

        if (res && res.data) {
          closePopup()
          showLoading(true)
          getData()
          onClickClosePopup()

          ObjectFunction.toastMessage(
            'Phê duyệt thành công',
            Resource.Messenger.Success,
          )
        } else {
          onClickClosePopup()
          ObjectFunction.toastMessage(
            'Phê duyệt thất bại',
            Resource.Messenger.Error,
          )
        }
      } catch (error) {
        console.log(error)
      }
    }

    /**
     * Từ chối
     *
     */
    const refuseClick = (reson) => {
      try {
        BookingRoomApi.approveRequest({
          bookingRoomID: dataComponent.dataSelect,
          refusalReason: reson,
          option: Enum.OptionRequest.Reject,
        }).then((res) => {
          if (res && res.data) {
            closePopup()
            showLoading(true)
            getData()
            onClickClosePopup()
            ObjectFunction.toastMessage(
              'Từ chối thành công',
              Resource.Messenger.Success,
            )
          } else {
            onClickClosePopup()
            ObjectFunction.toastMessage(
              'Từ chối thất bạ',
              Resource.Messenger.Success,
            )
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    return {
      dataComponent,
      getData,
      pageSizeSelected,
      currentPage,
      approveClick,
      refuseClick,
      confirmApproveClick,
      closePopup,
      confirmRefuseClick,
      closeRefusePopup,
      headerTableBookingRoom,
      filterBooking,
      showLoading,
      onClickClosePopup,
    }
  },
  computed: {
    ...mapState({
      roleOption: (state) => state.auth.roleOption,
    }),
    // Đăng ký đối tượng Enum trong phạm vi của component
    Enum() {
      return Enum
    },
  },
  mounted() {
    this.dataComponent.isAdmin =
      localStorage.getItem('roleOption') - 0 == Enum.RoleOption.Admin
        ? true
        : false
    this.dataComponent.userID =
      this.dataComponent.isAdmin == true
        ? null
        : JSON.parse(localStorage.getItem('user')).UserID

    this.getData()
  },
}
</script>

<style lang="scss" scoped>
#body-browsing {
  flex: 1;
  padding: 20px 20px;
  background-color: #efefef;
  height: calc(100% - 75px);
}

#bd-room-browsing {
  height: calc(100vh - 180px);
  background: white;
  padding: 20px;
}
.filter-options {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  position: relative;
  .btn-add {
    right: 0;
    position: absolute;
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
.flex {
  display: flex;
}
.btn {
  text-decoration: none !important;
}
.approve {
  color: #4cae4c !important;
  padding-right: 5px !important;
}

.refuse {
  color: red !important;
}

.dx-datagrid-search-panel {
  width: 220px !important;
}
#gridContainer {
  height: 600px;
}
</style>
