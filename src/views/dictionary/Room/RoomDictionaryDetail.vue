<template>
  <div @keydown="eventFormDictionary" ref="popupDictionary">
    <BasePopup
      class="misa-dialog"
      :titlePopup="titlePopup"
      classPopup="popup-dictionary-room-detail"
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
              <div class="t-lable-title">Mã phòng</div>
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
              v-model="room.RoomCode"
              @handleBlurInput="validate('RoomCode')"
              @handleKeyupInput="removeError('RoomCode')"
              :error="Error['RoomCode']"
            ></base-input>
          </div>
          <div class="t-row-right mgl-16">
            <div class="t-lable mgb-8 flex">
              <div class="t-lable-title">Tên phòng</div>
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
              v-model="room.RoomName"
              @handleBlurInput="validate('RoomName')"
              @handleKeyupInput="removeError('RoomName')"
              :error="Error['RoomName']"
            ></base-input>
          </div>
        </div>
        <div class="t-row-group flex mgt-16">
          <div class="t-row-left">
            <div class="t-lable mgb-8 flex">
              <div class="t-lable-title">Sức chứa</div>
              <div class="required">
                <span class="t-required"> &nbsp;*</span>
              </div>
            </div>

            <base-input
              classInput="misa-input"
              class="misa-input-secondary mgb-8 input-user-code"
              :required="true"
              :maxlength="20"
              :tabindex="3"
              v-model="room.Capacity"
              @handleBlurInput="validate('Capacity')"
              @handleKeyupInput="removeError('Capacity')"
              :error="Error['Capacity']"
              type="Number"
            ></base-input>
          </div>
          <div class="t-row-right mgl-16">
            <div class="t-lable mgb-8 flex">
              <div class="t-lable-title">Địa điểm</div>
              <div class="required">
                <span class="t-required"> &nbsp;*</span>
              </div>
            </div>
            <BaseDropdownbox
              :required="true"
              classDropdownbox="drop-down-utc "
              :dataSource="dataBuilding"
              optionName="BuildingName"
              optionValue="BuildingID"
              :isSearch="true"
              :height="34"
              :tabindex="4"
              placeholder="Chọn địa điểm"
              @onValueChange="onValueChangeBuilding"
              v-model:value="room.BuildingID"
              @handleBlurInput="validate('BuildingID')"
              @handleKeyupInput="removeError('BuildingID')"
              :error="Error['BuildingID']"
            ></BaseDropdownbox>
          </div>
        </div>
        <div class="t-row-group flex mgt-16">
          <div class="t-row-left">
            <div class="t-lable mgb-8 flex">
              <div class="t-lable-title">Người phê duyệt</div>
              <div class="required">
                <span class="t-required"> &nbsp;*</span>
              </div>
            </div>

            <BaseDropdownbox
              :required="true"
              classDropdownbox="drop-down-utc "
              :dataSource="userAdmin"
              optionName="FullName"
              optionValue="UserID"
              :isSearch="true"
              :height="34"
              :tabindex="5"
              placeholder="Chọn người phê duyệt"
              @onValueChange="onValueChangeAdminRoom"
              v-model:value="room.AdminID"
              @handleBlurInput="validate('AdminID')"
              @handleKeyupInput="removeError('AdminID')"
              :error="Error['AdminID']"
            ></BaseDropdownbox>
          </div>
          <div class="t-row-right mgl-16">
            <div class="t-lable mgb-8 flex">
              <div class="t-lable-title">Phụ trách phòng</div>
              <div class="required">
                <span class="t-required"> &nbsp;*</span>
              </div>
            </div>
            <BaseDropdownbox
              :required="true"
              classDropdownbox="drop-down-utc "
              :dataSource="userSupporter"
              optionName="FullName"
              optionValue="UserID"
              :isSearch="true"
              :height="34"
              :tabindex="6"
              placeholder="Chọn người phụ trách"
              @onValueChange="onValueChangeSupporterRoom"
              v-model:value="room.SupporterID"
              @handleBlurInput="validate('SupporterID')"
              @handleKeyupInput="removeError('SupporterID')"
              :error="Error['SupporterID']"
            ></BaseDropdownbox>
          </div>
        </div>
        <div class="t-row-block mgt-16">
          <div class="t-lable mgb-8 flex">
            <div class="t-lable-title">Chọn loại phòng</div>
            <div class="required">
              <span class="t-required"> &nbsp;*</span>
            </div>
          </div>
          <BaseDropdownbox
            :required="true"
            classDropdownbox="drop-down-utc "
            :dataSource="dataRoomType"
            optionName="RoomTypeName"
            optionValue="RoomTypeID"
            :isSearch="true"
            :height="34"
            :tabindex="6"
            placeholder="Chọn loại phòng"
            @onValueChange="onValueChangeRoomType"
            v-model:value="room.RoomTypeID"
            @handleBlurInput="validate('RoomTypeID')"
            @handleKeyupInput="removeError('RoomTypeID')"
            :error="Error['RoomTypeID']"
          ></BaseDropdownbox>
        </div>
        <div class="t-row-block mgt-16">
          <div class="t-lable mgb-8 flex">
            <div class="t-lable-title">Chọn thiết bị</div>
            <div class="required">
              <span class="t-required"> &nbsp;*</span>
            </div>
          </div>
          <BaseSelectTagBox
            :dataSource="dataEquipment"
            :height="34"
            classDropdownbox="drop-down-utc"
            optionName="EquipmentName"
            optionValue="EquipmentID"
            placeholder="Chọn thiết bị"
            :value="Equipment"
            :tabindex="7"
            @onOptionChange="onOptionChangeEquipment"
            @handleBlurInput="validate('ListEquipmentID')"
            @handleKeyupInput="removeError('ListEquipmentID')"
            :error="Error['ListEquipmentID']"
          >
          </BaseSelectTagBox>
        </div>
        <!-- <div class="t-row">
          <div class="t-lable-equipment">Chọn thiết bị</div>
          <div class="equipment" v-for="item in items" :key="item">
            <div class="flex">
              <BaseDropdownbox
                :required="true"
                classDropdownbox="drop-down-utc "
                :dataSource="dataRoom"
                optionName="RoomName"
                optionValue="RoomID"
                :isSearch="true"
                :height="34"
                :width="350"
                placeholder="Chọn thiết bị"
                @onValueChange="onValueChangeRoom"
              ></BaseDropdownbox>
              <div class="delete" v-if="showIcon">
                <div class="misa-icon-style" title="Xóa">
                  <div
                    @click="deleteEquipment()"
                    class="misa-icon-navbar misa-icon-delete-custom misa-icon-24"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="action">
            <div class="flex misa-add" @click="addEquipment">
              <div class="misa-icon-navbar misa-icon-plus misa-icon-24"></div>
              <div class="text">Thêm thiết bị</div>
            </div>
          </div>
        </div> -->
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
  </div>
  <!--Begin Popup Notice Error -->
  <PopupNotice
    :titlePopup="titlePopup"
    :contentPopup="contentPopup"
    :classIcon="classIconPopup"
    @onClickClosePopup="onClickClosePopup"
    v-if="
      popupNoticeMode == Enum.PopupMode.NotifyMode ||
      popupNoticeMode == Enum.PopupMode.DeleteMode
    "
  >
    <BaseButton
      :tabindex="1"
      :initFocus="true"
      @keydown.enter="onClickClosePopup"
      @click="onClickClosePopup"
      lableButton="Đóng"
      classButton="misa-button-normal w-80 misa-btn-nomarl"
    ></BaseButton>
    <BaseButton
      v-if="popupNoticeMode == Enum.PopupMode.DeleteMode"
      :tabindex="1"
      @click="onClickCancelBooking"
      lableButton="Hủy đặt"
      classButton="misa-button-normal w-120 misa-btn-danger"
    ></BaseButton>
  </PopupNotice>
</template>
<script>
import BaseDropdownbox from '@/components/base/BaseDropdownbox.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BasePopup from '@/components/base/BasePopup.vue'
import { mapActions, mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import Enum from '@/commons/Enum'
import BaseSelectTagBox from '@/components/base/BaseSelectTagBox.vue'
import Resource from '@/commons/Resource'
import PopupNotice from '@/components/popup/PopupNotice.vue'
import RoomApi from '@/apis/RoomApi'
import ObjectFunction from '@/commons/CommonFuction'
export default {
  name: ' ',
  components: {
    BaseDropdownbox,
    BaseInput,
    BaseButton,
    BasePopup,
    BaseSelectTagBox,
    PopupNotice,
  },
  emits: ['onCloseForm', 'onLoadData', 'onShowLoading'],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    roomData: {
      type: Object,
    },
    isEdit: {
      type: Boolean,
    },
    /**Trạng thái của popup */
    popupMode: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    // Gán data
    ...mapState({
      dataBuilding: (state) => state.dictionary.dataBuilding,
      dataEquipment: (state) => state.dictionary.dataEquipment,
      dataUser: (state) => state.dictionary.dataUser,
      dataRole: (state) => state.dictionary.dataRole,
      dataRoomType: (state) => state.dictionary.dataRoomType,
    }),
    // Đăng ký đối tượng Enum trong phạm vi của component
    Enum() {
      return Enum
    },
  },
  data() {
    return {
      positionOf: '',
      emailButtonOptions: {
        text: 'Lưu',
        onClick: () => {
          this.saveData()
        },
      },
      closeButtonOptions: {
        text: 'Hủy bỏ',
        onClick: () => {
          this.$emit('closePopup', false)
          this.items = [1]
        },
      },
      RoomCode: '',
      RoomName: '',
      Capacity: 0,
      showIcon: false,
      message: '',
      Equipment: [],
      items: [1],
      userAdmin: [],
      userSupporter: [],
      listEquipmentID: {},
      focus: true,
      Resource: Resource,
      room: {
        RoomID: this.roomData.RoomID || uuidv4(),
        BuildingID: this.roomData.BuildingID || '',
        RoomCode: this.roomData.RoomCode || '',
        RoomTypeID: this.roomData.RoomTypeID || '',
        RoomName: this.roomData.RoomName || '',
        Capacity: this.roomData.Capacity || '',
        AdminID: this.roomData.AdminID || '',
        AdminName: this.roomData.AdminName || '',
        AdminEmail: this.roomData.AdminEmail || '',
        SupporterID: this.roomData.SupporterID || '',
        SupporterName: this.roomData.SupporterName || '',
        SupporterEmail: this.roomData.SupporterEmail || '',
        AvartarAdmin: this.roomData.AvartarAdmin || '',
        AvartarSupporter: this.roomData.AvartarSupporter || '',
        ListEquipmentID: this.roomData.ListEquipmentID || '',
        ListEquipmentName: this.roomData.ListEquipmentName || '',
      },
      /**Mảng chứa lỗi */
      validateErrorList: [],
      /**Trạng thái của popup */
      popupNoticeMode: -1,
      Error: {},
      titlePopup: 'Thêm phòng học',
    }
  },

  methods: {
    // Gọi hàm load data từ store
    ...mapActions({
      loadDataBuildings: 'dictionary/loadDataBuildings',
      loadDataEquipments: 'dictionary/loadDataEquipments',
      loadDataUsers: 'dictionary/loadDataUsers',
      loadDataRoles: 'dictionary/loadDataRoles',
      loadDataRoomTypes: 'dictionary/loadDataRoomTypes',
    }),
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
    /** Mô tả: Gửi sự kiện đóng form
     * CreatedBy: PTTAM
     */
    onCloseForm() {
      this.$emit('onCloseForm')
    },
    /**
     * Validate
     * PTTAM
     */
    validate(fieldName) {
      try {
        if (
          !this.room[fieldName] &&
          fieldName != 'ListEquipmentName' &&
          fieldName != 'AvartarSupporter' &&
          fieldName != 'AvartarAdmin' &&
          fieldName != 'SupporterEmail' &&
          fieldName != 'SupporterName' &&
          fieldName != 'AdminEmail' &&
          fieldName != 'AdminName' &&
          fieldName != 'RoomEquipment' &&
          fieldName != 'RoomStatus'
        ) {
          let field = ''
          if (fieldName == 'RoomCode') {
            field = 'Mã phòng'
          } else if (fieldName == 'RoomName') {
            field = 'Tên phòng'
          } else if (fieldName == 'BuildingID') {
            field = 'Địa điểm'
          } else if (fieldName == 'ListEquipmentID') {
            field = 'Thiết bị'
          } else if (fieldName == 'Capacity') {
            field = 'Sức chứa'
          } else if (fieldName == 'AdminID') {
            field = 'Người phê duyệt'
          } else if (fieldName == 'SupporterID') {
            field = 'Phụ trách phòng'
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
      if (this.room[fieldName]) {
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
        //   this.beforeSaveData();
      }
    },
    /**
     * Mô tả : sự kiện nhấn vào nút lưu
     * @Createdby: PTTAM
     */
    beforeSaveData() {
      this.validateErrorList = [] // Gán lại array = []
      // Lấy danh sách các trường (fields) của object equipment
      const fields = Object.keys(this.room)

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
     * Lưu dữ liệu
     */
    saveData() {
      if (this.popupMode == Enum.PopupMode.EditMode) {
        try {
          RoomApi.updated(this.roomData.RoomID, this.room).then((res) => {
            if (res && res.data) {
              ObjectFunction.toastMessage(
                Resource.Messenger.UpdateSucces,
                Resource.Messenger.Success,
              )
              this.$emit('onShowLoading')
              this.$emit('onCloseForm')
              this.$emit('onLoadData')
            } else {
              this.message = 'Lưu thất bại'
            }
          })
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          RoomApi.insert(this.room).then((res) => {
            if (res && res.data) {
              ObjectFunction.toastMessage(
                Resource.Messenger.InsertSucces,
                Resource.Messenger.Success,
              )
              this.$emit('onShowLoading')
              this.$emit('onCloseForm')
              this.$emit('onLoadData')
            } else {
              this.message = 'Lưu thất bại'
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
    },

    /** Mô tả: Hiển thị popup
     * @param
     * CreatedBy: PTTAM
     */
    showPopup(iconPopup, contentPopup, titlePopup) {
      this.classIconPopup = iconPopup
      this.contentPopup = contentPopup
      this.titlePopup = titlePopup
    },
    /**
     * Thêm dòng thiết bị
     */
    addEquipment() {
      this.showIcon = true
      this.items.push(2)
    },
    /**
     * Xóa dòng thiết bị
     */
    deleteEquipment() {
      this.items.pop()
      if (this.items.length === 1) {
        this.showIcon = false
      }
    },
    /**
     * Sự kiện thay đổi thiết bị
     */
    onOptionChangeEquipment(values) {
      if (values) {
        let ids = ''
        let name = ''
        values?.forEach((element) => {
          ids += '' + element.EquipmentID.trim() + ','
          name += '' + element.EquipmentName.trim() + ' + '
        })
        ids = ids.slice(0, -1)
        name = name.slice(0, -2)
        this.room.ListEquipmentID = ids
        this.room.ListEquipmentName = name
        console.log(name)
      }
    },
    /**
     * Sự kiện thay đổi tòa nhà
     */
    onValueChangeBuilding(value) {
      this.room.BuildingID = value
    },
    /**
     * Sự kiện thay đổi tòa nhà
     */
    onValueChangeSupporterRoom(value) {
      let user = this.dataUser.find((x) => x.UserID == value)
      this.room.SupporterID = value
      this.room.SupporterName = user.FullName
      this.room.SupporterEmail = user.Email
      this.room.AvartarSupporter = user.AvartarColor
    },
    /**
     * Sự kiện thay đổi tòa nhà
     */
    onValueChangeAdminRoom(value) {
      let user = this.dataUser.find((x) => x.UserID == value)
      this.room.AdminID = value
      this.room.AdminName = user.FullName
      this.room.AdminEmail = user.Email
      this.room.AvartarAdmin = user.AvartarColor
    },
    onValueChangeRoomType(value) {
      this.room.RoomTypeID = value
    },
    /**
     * Lấy đối tượng user theo khóa chính
     * PTTAM 1/05/2023
     */
    getRoomByID() {
      let me = this
      RoomApi.getByID(this.roomData.RoomID).then((res) => {
        if (res) {
          let data = res.data
          me.room = data
          me.Equipment = me.room.ListEquipmentID.split(',').map((id) =>
            id.trim(),
          )
          // this.user = {
          //   UserID: data.UserID,
          //   UserCode: data.UserCode,
          //   FullName: data.FullName,
          //   DepartmentID: data.DepartmentID,
          //   RoleID: data.RoleID,
          //   Email: data.Email,
          //   PhoneNumber: data.PhoneNumber,
          //   Address: data.Address,
          // }
        }
      })
    },
  },
  async mounted() {
    try {
      await this.loadDataBuildings()
      await this.loadDataEquipments()
      await this.loadDataUsers()
      await this.loadDataRoles()
      await this.loadDataRoomTypes()
    } catch (error) {
      console.error(error)
    }
    let roleAdmin = this.dataRole.find(
      (x) => x.RoleValue == Enum.RoleOption.Admin,
    )
    let roleSupporter = this.dataRole.find(
      (x) => x.RoleValue == Enum.RoleOption.Supporter,
    )
    this.userAdmin = this.dataUser.filter((x) => x.RoleID == roleAdmin.RoleID)
    this.userSupporter = this.dataUser.filter(
      (x) => x.RoleID == roleSupporter.RoleID,
    )
    if (this.popupMode == Enum.PopupMode.EditMode) {
      this.getRoomByID()
      this.titlePopup = 'Cập nhật phòng'
    } else if (this.popupMode == Enum.PopupMode.AddMode) {
      this.titlePopup = 'Thêm phòng học'
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
  width: 50%;
}
.t-row-right {
  width: 50%;
}
.t-row-block {
  width: 100%;
  height: 56px;
}
.t-lable-equipment {
  margin-bottom: -20px;
  font-size: 14px;
}
.equipment {
  margin-left: 30%;
  align-items: center;
  margin-bottom: 10px;
}

.equipment > .dx-field {
  width: 100% !important;
}

.equipment > .delete {
  margin-left: 10px;
  margin-bottom: 10px;
}

.action {
  margin-left: 30%;
  margin-bottom: 10px;
  margin-top: 10px;
}
.misa-add {
  font-weight: 500;
  color: rgb(12, 156, 221);
  cursor: pointer;
  align-items: center;
}
.delete > .dx-icon-trash {
  color: red;
}

.action > .dx-button {
  color: #337ab7;
  border: none;
}

.person > .dx-field-label {
  width: 20% !important;
}
</style>
