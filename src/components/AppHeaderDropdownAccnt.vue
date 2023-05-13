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
      <CDropdownItem>
        <CIcon icon="cil-user" /> Thông tin tài khoản
      </CDropdownItem>
      <CDropdownItem> <CIcon icon="cil-settings" /> Thiết lập </CDropdownItem>
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
</template>

<script>
import avatar from '@/assets/images/avatars/8.jpg'
import { mapState, mapActions } from 'vuex'
import ObjectFunction from '@/commons/CommonFuction'
export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
      user: JSON.parse(localStorage.getItem('user')),
      ObjectFunction: ObjectFunction,
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
      alert('changePass')
    },
    handleLogout() {
      this.logout()
      this.$router.push('/login')
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
