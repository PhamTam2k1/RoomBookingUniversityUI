<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CAvatar :src="avatar" size="md" href="" />
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
export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
    }
  },
  methods: {
    handleChangePass() {
      alert('changePass')
    },
    handleLogout() {},
  },
}
</script>
