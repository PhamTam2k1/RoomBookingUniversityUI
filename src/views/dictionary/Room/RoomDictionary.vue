<template>
  <div id="body-room-dictionary">
    <div id="bd-room" class="Body">
      <div class="filter-options">
        <DxTextBox
          placeholder="Tìm kiếm"
          class="input-field"
          v-model:value="searchText"
          height="34"
        >
          <div class="input-field-icon icon-search"></div>
        </DxTextBox>
        <DxButton
          class="btn-add"
          icon="add"
          :width="130"
          text="Thêm mới"
          type="default"
          styling-mode="contained"
          @click="addBuilding"
        />
      </div>
      <!-- Begin table -->
      <div class="misa-tabble">
        <BaseTable
          :optionItems="headerTableRoom"
          :dataSource="dataComponent.dataSource"
          id="table-room"
          :tableMode="0"
        >
          <template #baseCell="{ data }">
            <BaseCellTemplace
              :data="data"
              id="RoomID"
              @onClickShowPopupDelete="onClickShowPopupDelete"
              @onClickShowPopupEdit="onClickShowPopupEdit"
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
  <!-- Loading -->
  <BaseLoading :isShowLoading="dataComponent.isShowLoading"></BaseLoading>

  <RoomDictionaryDetail
    :width="700"
    v-if="dataComponent.isShowForm"
    @onCloseForm="showFormDetail(false)"
    :popupMode="dataComponent.popupMode"
    @onLoadData="getData()"
    @onShowLoading="showLoading(true)"
    :roomData="JSON.parse(JSON.stringify(dataComponent.roomData))"
  />
  <!-- Begin popup delete -->
  <DeleteRoomPopup
    @onClickClosePopup="onClickClosePopup"
    @onLoadData="getData()"
    @onShowLoading="showLoading(true)"
    @onHideLoading="showLoading(false)"
    :popupMode="dataComponent.popupMode"
    @showPopupNotice="showPopup"
    v-if="dataComponent.popupMode == Enum.PopupMode.DeleteMode"
    :roomData="JSON.parse(JSON.stringify(dataComponent.roomData))"
  />
  <!-- End popup delete -->
  <!--Begin Popup Notice Error -->
  <PopupNotice
    titlePopup="Xóa không thành công"
    :contentPopup="dataComponent.contentPopup"
    classIcon="t-question-nocation"
    @onClickClosePopup="onClickClosePopupNotice"
    v-if="dataComponent.popupNoticeMode == Enum.PopupMode.NotifyMode"
    class="popup-noction-delete-error"
  >
    <BaseButton
      :tabindex="1"
      :initFocus="true"
      @keydown.enter="onClickClosePopupNotice"
      @click="onClickClosePopupNotice"
      lableButton="Không"
      classButton="misa-button-normal w-80"
    ></BaseButton>
    <BaseButton
      :tabindex="1"
      :initFocus="true"
      @keydown.enter="onClickClosePopupNotice"
      @click="onClickClosePopupNotice"
      lableButton="Xóa"
      classButton="misa-button-normal w-80 misa-btn-danger"
    ></BaseButton>
  </PopupNotice>
</template>
<script>
import BasePaging from '@/components/base/BasePaging.vue'
import BaseCellTemplace from '@/components/base/BaseCellTemplace.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import Enum from '@/commons/Enum'
import { DxButton } from 'devextreme-vue/button'
import { reactive } from 'vue'
import { mapState } from 'vuex'
import DxTextBox from 'devextreme-vue/text-box'
import RoomApi from '@/apis/RoomApi'
import BaseLoading from '@/components/base/BaseLoading.vue'
import RoomDictionaryDetail from './RoomDictionaryDetail.vue'
import DeleteRoomPopup from './DeleteRoomPopup.vue'
import PopupNotice from '@/components/popup/PopupNotice.vue'
import BaseButton from '@/components/base/BaseButton.vue'
export default {
  components: {
    DxTextBox,
    DxButton,
    BaseTable,
    BasePaging,
    BaseCellTemplace,
    RoomDictionaryDetail,
    DeleteRoomPopup,
    PopupNotice,
    BaseButton,
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
      isAdmin: true,
      pageIndex: 1,
      pageSize: 15,
      totalRecord: 0,
      startRecord: 1,
      endRecord: 15,
      popupVisible: false,
      message: '',
      dataSelect: {},
      title: '',
      deleteVisible: false,
      roomData: {},
      isEdit: false,
      popupMode: 0,
      popupNoticeMode: -1,
      isShowForm: false,
    })

    /**
     * Header table
     * PTTAM
     */
    var headerTableRoom = [
      {
        dataField: 'RoomID',
        caption: 'Mã phòng',
        visible: false,
        width: 0,
      },
      {
        dataField: 'RoomCode',
        caption: 'Mã phòng',
      },
      {
        dataField: 'RoomName',
        caption: 'Tên phòng',
      },
      {
        dataField: 'Capacity',
        caption: 'Sức chứa',
        width: 70,
      },
      {
        dataField: 'ListEquipmentName',
        caption: 'Thiết bị',
      },
      {
        dataField: 'SupporterName',
        caption: 'Người phụ trách',
        width: 200,
      },
      {
        dataField: 'AvartarSupporter',
        caption: '',
        width: 0,
        visible: false,
      },
      {
        dataField: 'AdminName',
        caption: 'Người duyệt phòng',
        width: 200,
      },
      {
        dataField: 'AvartarAdmin',
        caption: '',
        width: 0,
        visible: false,
      },
      {
        dataField: '',
        caption: '',
        width: 50,
      },
      {
        dataField: 'AvartarColor',
        caption: '',
        width: 0,
        visible: false,
      },
      {
        dataField: 'RoomStatusColor',
        caption: '',
        width: 0,
        visible: false,
      },
    ]
    /**
     * Hiển thị popup
     * PTTAM
     * @param {Boolean} isShow
     */
    function showFormDetail(isShow) {
      dataComponent.isShowForm = isShow
    }
    /**
     * Mô tả : Hàm show/hide loading
     * @param {Boolean} isShow true: hiển thị loading, false: ẩn loading
     * @Createdby: PTTAM
     */
    function showLoading(isShow) {
      dataComponent.isShowLoading = isShow
    }
    /** Mô tả: Hàm hiển thị popup xóa người dùng
     * @param {string} userId Mã người dùng
     * @param {string} userName Tên người dùng
     * CreatedBy: PTTAM
     * Created Date: 02-09-2022 14:12:42
     */
    function onClickShowPopupDelete(id) {
      dataComponent.roomData = dataComponent.dataSource.find(
        (x) => x.RoomID == id,
      )
      dataComponent.popupMode = Enum.PopupMode.DeleteMode //
    }
    /**
     * Đóng popup notice
     */
    function onClickClosePopupNotice() {
      dataComponent.popupNoticeMode = -1
    }
    /** Mô tả: Hàm hiển thị popup sửa vai trò của người dùng
     * @param {Object} user đối tượng người dùng
     * CreatedBy: PTTAM
     * Created Date: 03-09-2022 07:02:41
     */
    function onClickShowPopupEdit(id) {
      dataComponent.roomData = dataComponent.dataSource.find(
        (x) => x.RoomID == id,
      )
      dataComponent.popupMode = Enum.PopupMode.EditMode // Gán lại trạng thái của popup
      showFormDetail(true)
    }
    /** Mô tả: ẩn popup
     * CreatedBy: PTTAM
     * Created Date: 11-09-2022 08:22:11
     */
    function onClickClosePopup() {
      dataComponent.popupMode = -1
    }
    /** Mô tả: Hiển thị popup
     * @param
     * CreatedBy: PTTAM
     */
    function showPopup(RoomName) {
      dataComponent.contentPopup =
        RoomName +
        ' đã có dữ liệu đặt phòng. Bạn có chắc chắn muốn xóa toàn bộ dữ liệu phòng không?'
      dataComponent.popupNoticeMode = Enum.PopupMode.NotifyMode
    }
    /**
     * đóng popup phê duyệt
     * @param {
     * } val
     */
    const closePopup = () => {
      dataComponent.popupVisible = false
    }

    const closeDeletePopup = () => {
      dataComponent.deleteVisible = false
    }

    /**
     * sửa tòa nhà
     * @param {*} event
     */
    const editBuilding = (event) => {
      let id = event.element.accessKey
      dataComponent.roomData = dataComponent.dataSource.find(
        (x) => x.RoomID == id,
      )
      dataComponent.title = 'Sửa tòa nhà'
      dataComponent.isEdit = true
      dataComponent.popupVisible = true
    }

    /**
     * lấy dữ liệu
     *
     */
    const getData = () => {
      try {
        RoomApi.getPaging({
          pageIndex: dataComponent.pageIndex,
          pageSize: dataComponent.pageSize,
          keyword: '',
        }).then((res) => {
          dataComponent.dataSource = res.data.Data || []
          dataComponent.pageIndex = res.data.CurrentPage
          dataComponent.startRecord = res.data.StartRecord
          dataComponent.endRecord = res.data.EndRecord
          dataComponent.totalRecord = res.data.TotalRecord
          showLoading(false)
        })
      } catch (error) {
        console.log(error)
      }
    }

    const deleteBuilding = (event) => {
      let id = event.element.accessKey
      dataComponent.roomData = dataComponent.dataSource.find(
        (x) => x.RoomID == id,
      )
      dataComponent.deleteVisible = true
    }
    /**
     * Sự kiện thay đổi số bản ghi/trang
     * PTTAM 09/04/2023
     */
    const pageSizeSelected = (size) => {
      dataComponent.pageSize = size
      showLoading(true)
      getData()
    }

    /**
     * Sự kiện thay đổi số trang
     * PTTAM 08/04/2023
     */
    const currentPage = (val) => {
      dataComponent.pageIndex = val
      showLoading(true)
      getData()
    }

    const addBuilding = () => {
      dataComponent.title = 'Thêm mới'
      dataComponent.roomData = {}
      showFormDetail(true)
      dataComponent.popupMode = Enum.PopupMode.AddMode
    }

    return {
      dataComponent,
      getData,
      pageSizeSelected,
      currentPage,
      closePopup,
      addBuilding,
      closeDeletePopup,
      editBuilding,
      deleteBuilding,
      headerTableRoom,
      onClickShowPopupDelete,
      onClickShowPopupEdit,
      showLoading,
      showFormDetail,
      onClickClosePopupNotice,
      onClickClosePopup,
      showPopup,
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
    this.showLoading(true)
    this.getData()
    this.isAdmin =
      localStorage.getItem('roleOption') - 0 == Enum.RoleOption.Admin
        ? true
        : false
  },
}
</script>

<style lang="scss" scoped>
#body-room-dictionary {
  flex: 1;
  background-color: #efefef;
  height: calc(100% - 75px);
}

#bd-room {
  height: calc(100vh - 90px);
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

.approve {
  color: #4cae4c !important;
  padding-right: 5px !important;
}

.dx-icon-edit {
  color: #337ab7 !important;
}

.dx-icon-trash {
  color: #959595 !important;
}

.btn-action > .dx-button-content {
  padding: 0 !important;
}

.edit {
  padding-right: 20px !important;
}
</style>
