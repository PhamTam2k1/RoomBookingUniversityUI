<template>
  <base-popup
    class="misa-dialog"
    titlePopup="Thay đổi mật khẩu"
    classPopup="misa-popup-delete"
    :popupMode="popupMode"
    @onClickClosePopup="onClickClosePopup"
  >
    <template #iconPopup>
      <el-tooltip content="Đóng" placement="top">
        <div class="misa-icon-popup" @click="onClickClosePopup">
          <div class="misa-icon misa-icon-close misa-icon-24"></div>
        </div>
      </el-tooltip>
    </template>
    <template #contentPopup>
      <div class="content-popup">
        <BaseInput
          lable="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          classInput="misa-input"
          class="misa-input-secondary"
          :tabindex="1"
          type="password"
          v-model="passNew"
        ></BaseInput>
        <BaseInput
          lable="Xác nhận mật khẩu"
          placeholder="Nhập lại mật khẩu"
          classInput="misa-input"
          class="misa-input-secondary mgt-16"
          :tabindex="1"
          type="password"
          v-model="passNew1"
        ></BaseInput>
      </div>
    </template>
    <template #buttonPopup>
      <BaseButton
        @click="onClickChangePass"
        lableButton="Cập nhật"
        classButton="misa-button-normal w-120 misa-button-primary "
      ></BaseButton>
    </template>
  </base-popup>
</template>

<script>
import UserApi from '@/apis/UserApi'

import BaseInput from '@/components/base/BaseInput.vue'
import ObjectFunction from '@/commons/CommonFuction'
import Resource from '@/commons/Resource'
import BasePopup from '@/components/base/BasePopup.vue'
import BaseButton from '@/components/base/BaseButton.vue'
export default {
  components: {
    BasePopup,
    BaseButton,
    BaseInput,
  },
  props: {
    /**Đối tượng user  */
    user: {
      type: Object,
    },

    /**Mode của popup */
    popupMode: {
      type: Number,
    },
  },
  data() {
    return {
      /**Object chứa resource */
      Resource: Resource,
      reson: '',
      passNew: '',
      pasNew1: '',
      ObjectFunction: ObjectFunction,
    }
  },
  methods: {
    /** Mô tả: Gửi sự kiện đóng popup
     * @param
     * @return
     * CreatedBy: PTTAM
     * Created Date: 06-09-2022 00:09:14
     */
    onClickClosePopup() {
      this.$emit('onClickClosePopup')
    },
    /** Mô tả: Sự kiện nhấn vào nút xóa người dùng
     * CreatedBy: PTTAM
     * Created Date: 03-09-2022 07:04:16
     */
    async onClickChangePass() {
      if (this.passNew === this.passNew1) {
        UserApi.changePass({
          UserID: JSON.parse(localStorage.getItem('user')).UserID,
          Password: this.passNew,
          PasswordNew: this.passNew,
        }).then((res) => {
          if (res && res.data) {
            ObjectFunction.toastMessage(
              'Thay đổi mật khẩu thành công!',
              Resource.Messenger.Success,
            )
            this.onClickClosePopup()
          } else {
            ObjectFunction.toastMessage(
              'Thay đổi mật khẩu thất bại',
              Resource.Messenger.Error,
            )
            this.onClickClosePopup()
          }
        })
      } else {
        ObjectFunction.toastMessage(
          'Mật khẩu mới và xác nhận mật khẩu không trùng nhau. ',
          Resource.Messenger.Warning,
        )
      }
    },
  },
}
</script>
