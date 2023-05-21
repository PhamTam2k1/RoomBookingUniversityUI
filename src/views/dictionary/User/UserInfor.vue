<template>
  <div class="change-height text-center">
    <div class="infoUser">Thông tin cá nhân</div>
    <span>Quản lý thông tin cá nhân</span>
  </div>
  <div class="t-content">
    <div class="t-row-left">
      <div class="row">
        <div class="row-content">
          <div class="t-lable flex">
            <div class="t-title">Thông tin cơ bản</div>
            <div
              class="misa-icon misa-icon-pencil misa-icon-24"
              @click="showPopup"
            ></div>
          </div>

          <div class="flex t-row">
            <div class="t-row-line">Họ và tên:</div>
            <div class="t-row-result">{{ user.FullName }}</div>
          </div>
          <div class="flex t-row">
            <div class="t-row-line">Địa chỉ:</div>
            <div class="t-row-result">{{ user.Address }}</div>
          </div>
          <div class="flex t-row">
            <div class="t-row-line">Email:</div>
            <div class="t-row-result">{{ user.Email }}</div>
          </div>
          <div class="flex t-row">
            <div class="t-row-line">Số điện thoại:</div>
            <div class="t-row-result">{{ user.PhoneNumber }}</div>
          </div>
        </div>
        <div class="row-content mgt-16">
          <div class="t-title">Công việc</div>
          <div class="flex t-row">
            <div class="t-row-line">Khoa:</div>
            <div class="t-row-result">{{ departmentName }}</div>
          </div>
          <div class="flex t-row">
            <div class="t-row-line">Vai trò:</div>
            <div class="t-row-result">{{ roleName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <UserDictionaryDetail
    v-if="isShowForm"
    @onCloseForm="showFormDetail(false)"
    :popupMode="popupMode"
    :userID="user.UserID"
    @onLoadData="getUserByID"
  />
</template>
<script>
import ObjectFunction from '@/commons/CommonFuction'
import UserApi from '@/apis/UserApi'
import { mapActions, mapState } from 'vuex'
import UserDictionaryDetail from '@/views/dictionary/User/UserDictionaryDetail.vue'
import Enum from '@/commons/Enum'
export default {
  name: 'AppHeaderDropdownAccnt',
  components: {
    UserDictionaryDetail,
  },
  data() {
    return {
      user: {},
      ObjectFunction: ObjectFunction,
      isShowForm: false,
      popupMode: 0,
      roleName: '',
      departmentName: '',
    }
  },
  methods: {
    // Gọi hàm load data từ store
    ...mapActions({
      loadDataDepartments: 'dictionary/loadDataDepartments',
      loadDataRoles: 'dictionary/loadDataRoles',
    }),
    getUserByID() {
      UserApi.getByID(JSON.parse(localStorage.getItem('user')).UserID).then(
        (res) => {
          if (res) {
            let data = res.data
            this.user = {
              UserID: data.UserID,
              UserCode: data.UserCode,
              FullName: data.FullName,
              DepartmentID: data.DepartmentID,
              RoleID: data.RoleID,
              Email: data.Email,
              PhoneNumber: data.PhoneNumber,
              Address: data.Address,
            }
            this.roleName = this.dataRole.find(
              (x) => x.RoleID == data.RoleID,
            ).RoleName
            this.departmentName = this.dataDepartment.find(
              (x) => x.DepartmentID == data.DepartmentID,
            ).DepartmentName
          }
        },
      )
    },
    /**
     * Hiển thị popup
     * PTTAM
     * @param {Boolean} isShow
     */
    showFormDetail(isShow) {
      this.isShowForm = isShow
    },
    showPopup() {
      this.popupMode = Enum.PopupMode.EditMode
      this.showFormDetail(true)
    },
  },
  computed: {
    // Gán data
    ...mapState({
      dataDepartment: (state) => state.dictionary.dataDepartment,
      dataRole: (state) => state.dictionary.dataRole,
    }),
  },
  async mounted() {
    try {
      await this.loadDataRoles()
      await this.loadDataDepartments()
    } catch (error) {
      console.error(error)
    }
    this.getUserByID()
  },
}
</script>
<style scoped>
.change-height {
  align-self: center;
  margin-bottom: 24px;
  width: 100%;
  font-family: 'Roboto';
}
.infoUser {
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 24px !important;
}
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: 15px;
  margin-left: 15px;
  font-family: 'Roboto';
}
.row-content {
  margin: auto;
  background-color: #fff;
  border-radius: 8px;
}
.t-content {
  width: 100%;
  font-size: 16px;
  padding-left: 10%;
  padding-right: 10%;
}
/* .t-row-left,
.t-row-right {
  width: 60%;
} */
.t-title {
  font-size: 20px;
  font-family: 'Google Sans', sans-serif !important;
  font-weight: 600 !important;
  font-weight: normal;
  padding: 10px 0px 10px 10px;
}
.t-row-line {
  margin-left: 10px;
  width: 30%;
}
.t-row-result {
  width: 70%;
}
.t-row {
  width: 100%;
  margin-bottom: 30px;
  border-bottom: 1px solid #ccc;
}
.t-row-left {
  position: relative;
}
.misa-icon {
  position: absolute;
  right: 0;
  margin-right: 40px;
  margin-top: 10px;
}
</style>
