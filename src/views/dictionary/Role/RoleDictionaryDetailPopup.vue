<template>
  <div @keydown="eventFormDictionary" ref="popupDictionary">
    <BasePopup
      class="misa-dialog"
      titlePopup="Thêm vai trò"
      classPopup="popup-dictionary-detail"
      @onClickClosePopup="onCloseForm"
      :tabindex="4"
    >
      <template #iconPopup>
        <el-tooltip content="Đóng" placement="bottom">
          <div
            class="misa-icon misa-icon-close misa-icon-24"
            @click="onCloseForm"
          ></div>
        </el-tooltip>
      </template>
      <template #contentPopup>
        <!-- User Code Field -->
        <base-input
          lable="Mã vai trò"
          classInput="misa-input"
          :focus="focus"
          class="misa-input-secondary mgb-8"
          :required="true"
          :maxlength="20"
          v-model="role.RoleCode"
          :tabindex="1"
          @handleBlurInput="validate('RoleCode')"
          @handleKeyupInput="removeError('RoleCode')"
          :error="Error['RoleCode']"
        ></base-input>
        <!-- User Code Field -->
        <base-input
          lable="Tên vai trò"
          classInput="misa-input w-135"
          class="misa-input-secondary"
          :required="true"
          :maxlength="255"
          v-model="role.RoleName"
          :tabindex="2"
          @handleBlurInput="validate('RoleName')"
          @handleKeyupInput="removeError('RoleName')"
          :error="Error['RoleName']"
        ></base-input>
      </template>
      <template #buttonPopup>
        <BaseButton
          :tabindex="3"
          lableButton="Lưu"
          classButton="misa-button-normal w-86 misa-button-primary "
          @click="beforeSaveData()"
        ></BaseButton>
        <BaseButton
          @keyup="handleKeyup"
          classButton="w-0"
          :tabindex="4"
        ></BaseButton>
      </template>
    </BasePopup>
  </div>
  <!--Begin Popup Notice Error -->
  <PopupNotice
    :contentPopup="contentPopup"
    :classIcon="classIconPopup"
    @onClickClosePopup="onClickClosePopup"
    v-if="this.popupNoticeMode == Enum.PopupMode.NotifyMode"
  >
    <BaseButton
      :tabindex="1"
      :initFocus="true"
      @keydown.enter="onClickClosePopup"
      @click="onClickClosePopup"
      lableButton="Đóng"
      classButton="misa-button-normal w-80 misa-btn-warning"
    ></BaseButton>
  </PopupNotice>
  <!--End Popup Notice Error -->
</template>

<script>
import BasePopup from '@/components/base/BasePopup.vue'
import RoleApi from '@/apis/RoleApi'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import Enum from '@/commons/Enum'
import Resource from '@/commons/Resource'
import PopupNotice from '@/components/popup/PopupNotice.vue'
import { v4 as uuidv4 } from 'uuid'
import ObjectFunction from '@/commons/CommonFuction'
export default {
  name: ' ',
  emits: ['onCloseForm', 'onLoadData', 'onShowLoading'],
  components: {
    BasePopup,
    BaseInput,
    BaseButton,
    PopupNotice,
  },

  props: {
    roleData: {
      type: Object,
    },
    popupMode: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      positionOf: '',
      /**Trạng thái của popup */
      popupNoticeMode: -1,
      Error: {},
      focus: true,
      closeButtonOptions: {
        text: 'Hủy bỏ',
        onClick: () => {
          this.$emit('closePopup', false)
        },
      },
      Enum: Enum,
      /**Nội dung của popup */
      contentPopup: '',

      /**Icon của popup */
      classIconPopup: '',
      role: {
        RoleID: this.roleData.RoleID || uuidv4(),
        RoleCode: this.roleData.RoleCode || '',
        RoleName: this.roleData.RoleName || '',
      },
      validateErrorList: [],
      message: '',
    }
  },

  methods: {
    /** Mô tả: Gửi sự kiện đóng form
     * CreatedBy: PTTAM
     */
    onCloseForm() {
      this.$emit('onCloseForm')
    },
    /** Mô tả: Thực hiện đóng popup
     * CreatedBy: PTTAM
     */
    onClickClosePopup() {
      this.popupNoticeMode = -1
      if (this.validateErrorList.length > 0) {
        // Focus vào lỗi đầu tiên
        // this.$nextTick(() =>
        //   this.$refs[this.validateErrorList[0]][0].autoFocus()
        // );
        this.$refs.popupDictionary
          .querySelector('.misa-input-required input[tabindex]')
          .focus()
      }
    },
    /**
     * Mô tả : Sự kiện khi focus vào input đầu tiên khi tab index đến item cuối cùng của form
     * @Createdby: PTTAM
     */
    handleKeyup(e) {
      if (e.key == 'Tab') {
        this.focus = true
        this.$refs.popupDictionary.querySelector('input[tabindex]').focus()
      }
    },
    /**
     * Validate
     * PTTAM
     */
    validate(fieldName) {
      try {
        if (!this.role[fieldName]) {
          let field = ''
          if (fieldName == 'RoleCode') {
            field = 'Mã vai trò'
          } else if (fieldName == 'RoleName') {
            field = 'Tên vai trò'
          }
          this.Error[fieldName] = field + ' ' + Resource.ErrForm.IsNotEmpty
          this.validateErrorList.push(fieldName)
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * Xóa bỏ lỗi
     * @param {String} fieldName
     */
    removeError(fieldName) {
      if (this.role[fieldName]) {
        this.Error[fieldName] = ''
      }
    },
    /** Mô tả: xử lý sự kiện form
     * @param {event}
     * CreatedBy: PTTAM
     */
    eventFormDictionary(e) {
      if (e.key === 'Escape') {
        this.onCloseForm()
      }

      if (e.ctrlKey && e.key.toLowerCase() == 's' && !e.shiftKey) {
        e.preventDefault()
        this.beforeSaveData()
      }
    },
    /**
     * Mô tả : sự kiện nhấn vào nút lưu
     * @Createdby: PTTAM
     */
    beforeSaveData() {
      this.validateErrorList = [] // Gán lại array = []
      // Lấy danh sách các trường (fields) của object role
      const fields = Object.keys(this.role)

      // Lặp qua danh sách các trường để lấy tên của các trường
      fields.forEach((field) => {
        this.validate(field)
      })
      // Nếu mảng chứa lỗi không chứa lỗi
      if (this.validateErrorList.length <= 0) {
        // Thêm mới user
        this.saveData()
      } else {
        // Ngược lại
        this.showPopup('misa-icon-notice', Resource.ErrForm.ErrorInput) // Hiển thị popup
        this.popupNoticeMode = Enum.PopupMode.NotifyMode
      }
    },
    /** Mô tả: Hiển thị popup
     * @param
     * CreatedBy: PTTAM
     */
    showPopup(iconPopup, contentPopup) {
      this.classIconPopup = iconPopup
      this.contentPopup = contentPopup
    },
    /**
     * Thực hiện lưu form
     */
    saveData() {
      this.$emit('onShowLoading') // hiển thị loading
      if (this.popupMode == Enum.PopupMode.EditMode) {
        try {
          RoleApi.updated(this.roleData.RoleID, this.role).then((res) => {
            if (res && res.data) {
              ObjectFunction.toastMessage(
                Resource.Messenger.UpdateSucces,
                Resource.Messenger.Success,
              )
              this.$emit('onShowLoading')
              this.$emit('onCloseForm')
              this.$emit('onLoadData')
            } else {
              ObjectFunction.toastMessage(
                'Cập nhật thất bại',
                Resource.Messenger.Error,
              )
              this.$emit('onCloseForm')
            }
          })
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          RoleApi.insert(this.role).then((res) => {
            if (res && res.data) {
              ObjectFunction.toastMessage(
                Resource.Messenger.InsertSucces,
                Resource.Messenger.Success,
              )
              this.$emit('onCloseForm')
              this.$emit('onLoadData')
            } else {
              ObjectFunction.toastMessage(
                'Thêm thất bại',
                Resource.Messenger.Error,
              )
              this.$emit('onCloseForm')
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>

<style scoped></style>
