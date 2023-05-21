<template>
  <div @keydown="eventFormDictionary" ref="popupDictionary">
    <BasePopup
      class="misa-dialog"
      :titlePopup="titlePopup"
      classPopup="popup-dictionary-user-detail"
      @onClickClosePopup="onCloseForm"
      :tabindex="9"
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
        <div class="t-row-group flex mgt-16">
          <div class="t-row-left">
            <div class="t-lable mgb-8 flex">
              <div class="t-lable-title">Mã giảng viên</div>
              <div class="required">
                <span class="t-required"> &nbsp;*</span>
              </div>
            </div>
            <base-input
              classInput="misa-input"
              :focus="focus"
              class="misa-input-secondary mgb-8 input-user-code"
              :required="true"
              :maxlength="20"
              :tabindex="1"
              v-model="user.UserCode"
              @handleBlurInput="validate('UserCode')"
              @handleKeyupInput="removeError('UserCode')"
              :error="Error['UserCode']"
            ></base-input>
          </div>
          <div class="t-row-right mgl-16">
            <div class="t-lable mgb-8 flex">
              <div class="t-lable-title">Tên giảng viên</div>
              <div class="required">
                <span class="t-required"> &nbsp;*</span>
              </div>
            </div>
            <base-input
              classInput="misa-input"
              class="misa-input-secondary mgb-8"
              :required="true"
              :maxlength="100"
              :tabindex="2"
              v-model="user.FullName"
              @handleBlurInput="validate('FullName')"
              @handleKeyupInput="removeError('FullName')"
              :error="Error['FullName']"
            ></base-input>
          </div>
        </div>
        <div class="t-row-block">
          <div class="t-lable mgb-8">Địa chỉ</div>
          <base-input
            classInput="misa-input"
            class="misa-input-secondary mgb-8"
            :maxlength="255"
            :tabindex="3"
            v-model="user.Address"
          ></base-input>
        </div>
        <div class="t-row-group flex mgt-16">
          <div class="t-row-left">
            <div class="t-lable mgb-8 flex">
              <div class="t-lable-title">Số điện thoại liên hệ</div>
              <div class="required">
                <span class="t-required"> &nbsp;*</span>
              </div>
            </div>
            <base-input
              classInput="misa-input"
              class="misa-input-secondary mgb-8 input-user-code"
              :required="true"
              :maxlength="25"
              :tabindex="4"
              v-model="user.PhoneNumber"
              @handleBlurInput="validate('PhoneNumber')"
              @handleKeyupInput="removeError('PhoneNumber')"
              :error="Error['PhoneNumber']"
            ></base-input>
          </div>
          <div class="t-row-right mgl-16">
            <div class="t-lable mgb-8 flex">
              <div class="t-lable-title">Email</div>
              <div class="required">
                <span class="t-required"> &nbsp;*</span>
              </div>
            </div>
            <base-input
              classInput="misa-input"
              class="misa-input-secondary mgb-8"
              :required="true"
              :maxlength="50"
              :tabindex="5"
              v-model="user.Email"
              @handleBlurInput="validate('Email')"
              @handleKeyupInput="removeError('Email')"
              :error="Error['Email']"
            ></base-input>
          </div>
        </div>
        <div class="t-row-block mgb-16">
          <div class="t-lable mgb-8 flex">
            <div class="t-lable-title">Khoa</div>
            <div class="required">
              <span class="t-required"> &nbsp;*</span>
            </div>
          </div>
          <BaseDropdownbox
            :required="true"
            classDropdownbox="drop-down-utc "
            :dataSource="dataDepartment"
            optionName="DepartmentName"
            optionValue="DepartmentID"
            :isSearch="true"
            :height="34"
            :tabindex="6"
            placeholder="Chọn khoa"
            v-model:value="user.DepartmentID"
            @onValueChange="onValueChangeDepartment"
            @handleBlurInput="validate('DepartmentID')"
            @handleKeyupInput="removeError('DepartmentID')"
            :error="Error['DepartmentID']"
          ></BaseDropdownbox>
        </div>
        <div class="t-row-block">
          <div class="t-lable mgb-8 flex">
            <div class="t-lable-title">Vai trò</div>
            <div class="required">
              <span class="t-required"> &nbsp;*</span>
            </div>
          </div>
          <BaseDropdownbox
            :required="true"
            classDropdownbox="drop-down-utc "
            :dataSource="dataRole"
            optionName="RoleName"
            optionValue="RoleID"
            v-model:value="user.RoleID"
            :isSearch="true"
            :tabindex="7"
            :height="34"
            placeholder="Chọn vai trò"
            @onValueChange="onValueChangeRole"
            @handleBlurInput="validate('RoleID')"
            @handleKeyupInput="removeError('RoleID')"
            :error="Error['RoleID']"
          ></BaseDropdownbox>
        </div>
      </template>
      <template #buttonPopup>
        <BaseButton
          :tabindex="8"
          lableButton="Lưu"
          classButton="misa-button-normal w-86 misa-button-primary "
          @click="beforeSaveData()"
        ></BaseButton>
        <BaseButton
          @keyup="handleKeyup"
          classButton="w-0"
          :tabindex="9"
        ></BaseButton>
      </template>
    </BasePopup>
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
  </div>
</template>

<script>
import UserApi from '@/apis/UserApi'
import BaseDropdownbox from '@/components/base/BaseDropdownbox.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BasePopup from '@/components/base/BasePopup.vue'
import Enum from '@/commons/Enum'
import Resource from '@/commons/Resource'
import PopupNotice from '@/components/popup/PopupNotice.vue'
import { v4 as uuidv4 } from 'uuid'
import { mapActions, mapState } from 'vuex'
import ObjectFunction from '@/commons/CommonFuction'
export default {
  name: ' ',
  components: {
    BaseDropdownbox,
    BaseInput,
    BaseButton,
    BasePopup,
    PopupNotice,
  },
  emits: ['onCloseForm', 'onLoadData', 'onShowLoading'],
  props: {
    userID: {
      type: Object,
    },
    popupMode: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      UserCode: '',
      UserName: '',
      Capacity: 0,
      Enum: Enum,
      focus: true,
      user: {
        UserID: this.userID || uuidv4(),
        UserCode: '',
        FullName: '',
        RoleID: '',
        DepartmentID: '',
        PhoneNumber: '',
        Email: '',
      },
      /**Mảng chứa lỗi */
      validateErrorList: [],
      /**Trạng thái của popup */
      popupNoticeMode: -1,
      Error: {},
      titlePopup: 'Thêm người dùng',
    }
  },

  methods: {
    // Gọi hàm load data từ store
    ...mapActions({
      loadDataDepartments: 'dictionary/loadDataDepartments',
      loadDataRoles: 'dictionary/loadDataRoles',
    }),
    /** Mô tả: Gửi sự kiện đóng form
     * CreatedBy: PTTAM
     */
    onCloseForm() {
      this.$emit('onCloseForm')
    },
    /**
     * Sự kiện thay đổi khoa
     * @param {*} value
     * PTTAM
     */
    onValueChangeDepartment(value) {
      this.user.DepartmentID = value
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
     * Sự kiện thay đổi khoa
     * @param {*} value
     * PTTAM
     */
    onValueChangeRole(value) {
      this.user.RoleID = value
    },
    /** Mô tả: Hiển thị popup
     * @param
     * CreatedBy: PTTAM
     */
    showPopup(iconPopup, contentPopup) {
      this.classIconPopup = iconPopup
      this.contentPopup = contentPopup
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
     * Close popup lỗi và focus và input lỗi đầu tiên
     * PTTAM
     */
    onClickClosePopup() {
      this.popupNoticeMode = -1
      if (this.validateErrorList.length > 0) {
        this.$refs.popupDictionary
          .querySelector('.misa-input-required input[tabindex]')
          .focus()
      }
    },
    /**
     * Mô tả : sự kiện nhấn vào nút lưu
     * @Createdby: PTTAM
     */
    beforeSaveData() {
      this.validateErrorList = [] // Gán lại array = []
      // Lấy danh sách các trường (fields) của object bookingRoomData
      const fields = Object.keys(this.user)

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
    /**
     * Validate
     * PTTAM
     */
    validate(fieldName) {
      try {
        if (!this.user[fieldName] && fieldName != 'Address') {
          let field = ''
          if (fieldName == 'FullName') {
            field = 'Tên giảng viên'
          } else if (fieldName == 'PhoneNumber') {
            field = 'Số điện thoại'
          } else if (fieldName == 'Email') {
            field = 'Email'
          } else if (fieldName == 'DepartmentID') {
            field = 'Khoa'
          } else if (fieldName == 'RoleID') {
            field = 'Vai trò'
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
      if (this.user[fieldName]) {
        this.Error[fieldName] = ''
      }
    },
    /**
     * Lưu dữ liệu
     */
    saveData() {
      if (this.popupMode == Enum.PopupMode.EditMode) {
        try {
          UserApi.updated(this.userID, this.user).then((res) => {
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
          this.user.AvartarColor = ObjectFunction.generateRandomColor()
          this.user.Password = Resource.PassWordDefault
          UserApi.insert(this.user).then((res) => {
            if (res && res.data) {
              ObjectFunction.toastMessage(
                Resource.Messenger.InsertSucces,
                Resource.Messenger.Success,
              )
              this.$emit('onShowLoading')
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
    /**
     * Lấy mã giảng viên mới từ server
     * PTTAM 1/05/2023
     */
    getNewUserCode() {
      UserApi.getNewUserCode().then((res) => {
        if (res) {
          this.user.UserCode = res.data
        }
      })
    },

    /**
     * Lấy đối tượng user theo khóa chính
     * PTTAM 1/05/2023
     */
    getUserByID() {
      UserApi.getByID(this.userID).then((res) => {
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
        }
      })
    },
  },
  computed: {
    // Gán data
    ...mapState({
      dataDepartment: (state) => state.dictionary.dataDepartment,
      dataRole: (state) => state.dictionary.dataRole,
    }),
  },
  /**
   * Thực hiện gọi api để lấy dữ liệu phòng ban, vai trò
   * PTTAM 02.04.2023
   */
  async created() {},
  async mounted() {
    try {
      await this.loadDataDepartments()
      await this.loadDataRoles()
    } catch (error) {
      console.error(error)
    }
    if (this.popupMode == Enum.PopupMode.AddMode) {
      this.getNewUserCode()
      this.titlePopup = 'Thêm người dùng'
    } else if (this.popupMode == Enum.PopupMode.EditMode) {
      this.getUserByID()
      this.titlePopup = 'Cập nhật người dùng'
    }
  },
}
</script>

<style scoped>
.t-row {
  margin: 10px;
  height: 38px;
}
.t-row-left {
  width: 40%;
}
.t-row-right {
  width: 60%;
}
.t-row-block {
  width: 100%;
  height: 56px;
}
</style>
