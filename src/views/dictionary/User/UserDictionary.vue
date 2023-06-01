<template>
  <div id="body-user-dictionary">
    <div id="bd-user" class="Body">
      <div class="filter-options">
        <base-input
          class="misa-input-wrap flex w-240 mg-12"
          placeholder="Tìm kiếm người dùng"
          v-model="dataComponent.userFilter"
          @keyup="filterUser"
          classInput="misa-input"
        >
          <div class="misa-icon misa-icon-search misa-icon-24"></div>
        </base-input>
        <div class="mgl-16">
          <base-dropdownbox
            classDropdownbox="drop-down"
            placeholder="Chọn vai trò"
            :dataSource="dataRole"
            optionName="RoleName"
            optionValue="RoleID"
            @onValueChange="onValueChangeRole"
            :height="36"
            :width="208"
            :isSearch="true"
          ></base-dropdownbox>
        </div>
        <div class="btn-add flex">
          <DxButton
            class=""
            icon="add"
            :width="130"
            text="Thêm mới"
            type="default"
            styling-mode="contained"
            @click="addUser"
          />
          <el-tooltip content="Lấy lại dữ liệu" placement="top">
            <div class="mgl-16" @click="showLoading(true), getData()">
              <div class="icon-sibar icon-refesh misa-icon-24 mgt-8"></div>
            </div>
          </el-tooltip>
        </div>
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
import { mapActions, mapState } from 'vuex'
import UserApi from '@/apis/UserApi'
import BaseLoading from '@/components/base/BaseLoading.vue'
import UserDictionaryDetail from './UserDictionaryDetail.vue'
import DeleteUserPopupVue from './DeleteUserPopup.vue'
import PopupNotice from '@/components/popup/PopupNotice.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseDropdownbox from '@/components/base/BaseDropdownbox.vue'
export default {
  components: {
    DxButton,
    BaseTable,
    BasePaging,
    BaseCellTemplace,
    UserDictionaryDetail,
    BaseLoading,
    DeleteUserPopupVue,
    PopupNotice,
    BaseButton,
    BaseInput,
    BaseDropdownbox,
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
      /** Từ khóa tìm kiếm thông tin người dùng*/
      userFilter: '',
      RoleID: '',
      /**Timout của tìm kiếm */
      timeout: 1000,
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
          keyword: dataComponent.userFilter.trim(),
          roleID: dataComponent.RoleID,
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
  methods: {
    // Gọi hàm load data từ store
    ...mapActions({
      loadDataDepartments: 'dictionary/loadDataDepartments',
      loadDataRoles: 'dictionary/loadDataRoles',
    }),
    /** Mô tả: Sự kiện keyup để tìm kiếm nhân viên
     * CreatedBy: PTTAM
     * Created Date: 11-09-2022 08:23:11
     */
    filterUser() {
      clearTimeout(this.dataComponent.timeout)
      this.dataComponent.timeout = setTimeout(() => {
        this.getData()
      }, 1000)
    },
    /** Mô tả: Sự kiện thay đổi vai trò tìm kiếm
     * @param {object} optionId khóa chính vai trò
     * CreatedBy: PTTAM
     * Created Date: 03-09-2022 13:02:31
     */
    onValueChangeRole(option) {
      this.dataComponent.RoleID = option
      this.getData()
    },
  },
  computed: {
    ...mapState({
      roleOption: (state) => state.auth.roleOption,
      dataDepartment: (state) => state.dictionary.dataDepartment,
      dataRole: (state) => state.dictionary.dataRole,
    }),
    // Đăng ký đối tượng Enum trong phạm vi của component
    Enum() {
      return Enum
    },
  },
  async mounted() {
    try {
      await this.loadDataDepartments()
      await this.loadDataRoles()
    } catch (error) {
      console.error(error)
    }
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
  height: calc(100vh - 72px);
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
