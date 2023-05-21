<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <div class="misa-full-name-avatar-table flex" @click.prevent>
        <div
          class="misa-cell-avatar-color"
          :style="{
            backgroundColor: user.AvartarColor,
          }"
        >
          {{ ObjectFunction.splitFullName(user.FullName) }}
        </div>
      </div>
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Thiết lập
      </CDropdownHeader>
      <CDropdownItem @click="changeInfor">
        <CIcon icon="cil-user" /> Thông tin tài khoản
      </CDropdownItem>
      <!-- <CDropdownItem> <CIcon icon="cil-settings" /> Thiết lập </CDropdownItem> -->
      <CDropdownItem @click="handleChangePass">
        <CIcon icon="cil-pencil" /> Đổi mật khẩu
      </CDropdownItem>
      <!-- <CDropdownItem>
        <CIcon icon="cil-dollar" /> Payments
        <CBadge color="secondary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem> -->

      <CDropdownDivider />
      <CDropdownItem @click="handleLogout">
        <CIcon icon="cil-lock-locked" /> Đăng xuất
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
  <ChangePass
    @onClickClosePopup="showPopup(false)"
    @onShowLoading="showLoading(true)"
    @onHideLoading="showLoading(false)"
    v-if="isShowPopup"
  ></ChangePass>
</template>

<script>
import avatar from '@/assets/images/avatars/8.jpg'
import { mapState, mapActions } from 'vuex'
import ObjectFunction from '@/commons/CommonFuction'
import ChangePass from '@/views/dictionary/User/ChangePass.vue'
export default {
  name: 'AppHeaderDropdownAccnt',
  components: {
    ChangePass,
  },
  data() {
    return {
      avatar: avatar,
      itemsCount: 42,
      user: JSON.parse(localStorage.getItem('user')),
      ObjectFunction: ObjectFunction,
      isShowPopup: false,
    }
  },
  computed: {
    ...mapState({
      isLoggedInn: (state) => state.auth.isLoggedIn,
      currentUser: (state) => state.auth.user,
    }),
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    handleChangePass() {
      this.showPopup(true)
    },
    handleLogout() {
      this.logout()
      this.$router.push('/login')
    },
    changeInfor() {
      this.$router.push('/infor-user')
    },
    showPopup(isShow) {
      this.isShowPopup = isShow
    },
  },
}
</script>
<style scoped>
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
</style>
