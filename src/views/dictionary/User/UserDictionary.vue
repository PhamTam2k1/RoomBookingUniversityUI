<template>
  <div id="body-user-dictionary">
    <div id="bd-user" class="Body">
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
          @click="addUser"
        />
      </div>
      <!-- Begin table -->
      <div class="misa-tabble">
        <BaseTable
          :optionItems="headerTableUser"
          :dataSource="dataComponent.dataSource"
          id="table-user"
          :tableMode="0"
        >
          <template #baseCell="{ data }">
            <BaseCellTemplace
              :data="data"
              id="UserID"
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

  <UserDictionaryDetail
    :width="700"
    v-if="dataComponent.isShowForm"
    @onCloseForm="showFormDetail(false)"
    :popupMode="dataComponent.popupMode"
    @onLoadData="getData()"
    @onShowLoading="showLoading(true)"
    :userID="JSON.parse(JSON.stringify(dataComponent.userID))"
  />

  <!-- Begin popup delete -->
  <DeleteUserPopupVue
    @onClickClosePopup="onClickClosePopup"
    @onLoadData="getData()"
    @showPopupNotice="showPopup"
    @onShowLoading="showLoading(true)"
    @onHideLoading="showLoading(false)"
    :popupMode="dataComponent.popupMode"
    v-if="dataComponent.popupMode == Enum.PopupMode.DeleteMode"
    :userData="JSON.parse(JSON.stringify(dataComponent.userData))"
  />
  <!-- End popup delete -->
  <!--Begin Popup Notice Error -->
  <PopupNotice
    titlePopup="Xóa không thành công"
    :contentPopup="dataComponent.contentPopup"
    classIcon="misa-icon-notice"
    @onClickClosePopup="onClickClosePopupNotice"
    v-if="dataComponent.popupNoticeMode == Enum.PopupMode.NotifyMode"
  >
    <BaseButton
      :tabindex="1"
      :initFocus="true"
      @keydown.enter="onClickClosePopupNotice"
      @click="onClickClosePopupNotice"
      lableButton="Đóng"
      classButton="misa-button-normal w-80 misa-btn-warning"
    ></BaseButton>
  </PopupNotice>
  <!--End Popup Notice Error -->
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
import UserApi from '@/apis/UserApi'
import BaseLoading from '@/components/base/BaseLoading.vue'
import UserDictionaryDetail from './UserDictionaryDetail.vue'
import DeleteUserPopupVue from './DeleteUserPopup.vue'
import PopupNotice from '@/components/popup/PopupNotice.vue'
import BaseButton from '@/components/base/BaseButton.vue'
export default {
  components: {
    DxTextBox,
    DxButton,
    BaseTable,
    BasePaging,
    BaseCellTemplace,
    UserDictionaryDetail,
    BaseLoading,
    DeleteUserPopupVue,
    PopupNotice,
    BaseButton,
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
      userID: '',
      isEdit: false,
      popupMode: 0,
      userData: {},
      popupNoticeMode: -1,
      contentPopup: '',
    })

    /**
     * Header table
     * PTTAM
     */
    var headerTableUser = [
      {
        dataField: 'UserID',
        caption: 'ID User',
        visible: false,
        width: 0,
      },
      {
        dataField: 'UserCode',
        caption: 'Mã người dùng',
      },
      {
        dataField: 'FullName',
        caption: 'Tên người dùng',
      },
      {
        dataField: 'DepartmentName',
        caption: 'Phòng ban',
      },
      {
        dataField: 'PhoneNumber',
        caption: 'Số điện thoại',
      },
      {
        dataField: 'RoleName',
        caption: 'Vai trò',
      },
      {
        dataField: 'Email',
        caption: 'Email',
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
        dataField: 'UserStatusColor',
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
    /** Mô tả: Hiển thị popup
     * @param
     * CreatedBy: PTTAM
     */
    function showPopup(FullName) {
      dataComponent.contentPopup =
        'Giảng viên ' + FullName + ' đã có dữ liệu đặt phòng.'
      dataComponent.popupNoticeMode = Enum.PopupMode.NotifyMode
    }

    /**
     * Đóng popup notice
     */
    function onClickClosePopupNotice() {
      dataComponent.popupNoticeMode = -1
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
      dataComponent.userID = id
      dataComponent.userData = dataComponent.dataSource.find(
        (x) => x.UserID == id,
      )
      dataComponent.popupMode = Enum.PopupMode.DeleteMode //
    }

    /** Mô tả: Hàm hiển thị popup sửa vai trò của người dùng
     * @param {Object} user đối tượng người dùng
     * CreatedBy: PTTAM
     * Created Date: 03-09-2022 07:02:41
     */
    function onClickShowPopupEdit(id) {
      dataComponent.userID = id
      dataComponent.popupMode = Enum.PopupMode.EditMode // Gán lại trạng thái của popup
      showFormDetail(true)
    }
    function addUser() {
      dataComponent.popupMode = Enum.PopupMode.AddMode // Gán lại trạng thái của popup
      showFormDetail(true)
    }
    /** Mô tả: ẩn popup
     * CreatedBy: PTTAM
     * Created Date: 11-09-2022 08:22:11
     */
    function onClickClosePopup() {
      dataComponent.popupMode = -1
    }
    /**
     * lấy dữ liệu
     *
     */
    const getData = () => {
      try {
        UserApi.getPaging({
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

    return {
      dataComponent,
      getData,
      pageSizeSelected,
      currentPage,
      headerTableUser,
      onClickShowPopupDelete,
      onClickShowPopupEdit,
      showLoading,
      showFormDetail,
      showPopup,
      onClickClosePopup,
      onClickClosePopupNotice,
      addUser,
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
#body-user-dictionary {
  flex: 1;
  background-color: #efefef;
  height: calc(100% - 75px);
}
#bd-user {
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
