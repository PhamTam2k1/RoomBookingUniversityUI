<template>
  <div @keydown="eventFormDictionary" ref="popupDictionary">
    <BasePopup
      class="misa-dialog"
      :titlePopup="titlePopupBooking"
      classPopup="popup-dictionary-room-detail"
      @onClickClosePopup="onCloseForm"
      :tabindex="9"
    >
      <template #iconPopup>
        <div class="flex">
          <el-tooltip content="Sửa" placement="bottom">
            <div
              v-if="popupMode == Enum.PopupMode.EditMode || isDisable == true"
              class="misa-icon misa-icon-pencil misa-icon-24"
              @click="onClickUpdate"
            ></div>
          </el-tooltip>
          <el-tooltip content="Xóa" placement="bottom">
            <div
              v-if="popupMode == Enum.PopupMode.EditMode"
              class="misa-icon-navbar misa-icon-delete-custom misa-icon-24 mgl-8p"
              @click="onClickDelete"
            ></div>
          </el-tooltip>
          <el-tooltip content="Đóng" placement="bottom">
            <div
              class="misa-icon misa-icon-close misa-icon-24 mgl-8p"
              @click="onCloseForm"
            ></div>
          </el-tooltip>
        </div>
      </template>
      <template #contentPopup>
        <div class="t-row">
          <base-input
            :focus="true"
            lable="Tiêu đề"
            classInput="misa-input"
            class="misa-input-secondary mgb-8"
            :required="true"
            :tabindex="1"
            v-model="bookingRoomData.Subject"
            @handleBlurInput="validate('Subject')"
            @handleKeyupInput="removeError('Subject')"
            :error="Error['Subject']"
            :isDisable="isDisable || !isUserBooking"
          ></base-input>
        </div>
        <div class="t-row">
          <BaseDropdownbox
            lable="Chọn địa điểm"
            :required="true"
            classDropdownbox="drop-down-utc "
            :dataSource="dataRoom"
            optionName="RoomName"
            optionValue="RoomID"
            v-model:value="bookingRoomData.RoomID"
            :isSearch="true"
            :height="34"
            :tabindex="2"
            placeholder="Chọn phòng"
            @onValueChange="onValueChangeRoom"
            @handleBlurInput="validate('RoomID')"
            @handleKeyupInput="removeError('RoomID')"
            :error="Error['RoomID']"
            :isDisable="isDisable || !isUserBooking"
          ></BaseDropdownbox>
        </div>
        <div v-if="this.bookingRoomData.RoomID" class="t-row t-row-infor">
          <div class="t-infor-item flex mgb-10">
            <div class="t-lable-infor">Sức chứa:</div>
            <div class="t-content mgl-16">{{ this.roomChoose.Capacity }}</div>
          </div>

          <div class="t-infor-item flex">
            <div class="t-lable-info">Thiết bị:</div>
            <div class="t-content mgl-16">
              {{ this.roomChoose.ListEquipmentName }}
            </div>
          </div>
        </div>
        <div class="t-row flex">
          <div class="t-lable-date">Ngày bắt đầu</div>
          <BaseDate
            width="165"
            class="mt-16"
            :labelMode="'hidden'"
            :stylingMode="'outlined'"
            @onValueChanged="onStartDateChanged"
            lable=""
            :tabindex="3"
            :value="bookingRoomData.StartDate"
          ></BaseDate>
        </div>
        <div class="t-row flex">
          <div class="t-lable-date">Ngày kết thúc</div>
          <BaseDate
            width="165"
            class="mt-16"
            :labelMode="'hidden'"
            :stylingMode="'outlined'"
            @onValueChanged="onEndDateChanged"
            lable=""
            :tabindex="4"
            :value="bookingRoomData.EndDate"
          ></BaseDate>
        </div>

        <div class="t-row">
          <BaseSelectTagBox
            lable="Chọn ca học"
            :dataSource="dataTime"
            :height="34"
            :tabindex="5"
            classDropdownbox="drop-down-utc"
            optionName="TimeSlotName"
            optionValue="TimeSlotID"
            placeholder="Chọn 1 hoặc nhiều ca học"
            @onOptionChange="onValueChangeTimeSlot"
            :value="lstTime"
            @handleBlurInput="validate('TimeSlots')"
            @handleKeyupInput="removeError('TimeSlots')"
            :error="Error['TimeSlots']"
            :isDisable="isDisable || !isUserBooking"
          >
          </BaseSelectTagBox>
        </div>

        <div class="t-row flex" style="height: 120px">
          <div class="t-lable-texarea">Lý do đặt</div>
          <div class="content-reson">
            <textarea
              id="reson"
              :disabled="isDisable || !isUserBooking"
              v-model="bookingRoomData.Description"
              rows="4"
              tabindex="6"
              placeholder="Lý do"
            >
            </textarea>
          </div>
        </div>
        <div class="t-row">
          <base-input
            lable="Số người tham gia"
            classInput="misa-input"
            class="misa-input-secondary mgb-8"
            :required="true"
            :tabindex="7"
            v-model="bookingRoomData.Quantity"
            @handleBlurInput="validate('Quantity')"
            @handleKeyupInput="removeError('Quantity')"
            :error="Error['Quantity']"
            type="Number"
            :isDisable="isDisable || !isUserBooking"
          ></base-input>
        </div>
      </template>
      <template #buttonPopup>
        <div class="t-button-footer">
          <div
            class="t--is-admin flex"
            v-if="popupMode == Enum.PopupMode.PendingMode && isAdmin"
          >
            <BaseButton
              @click="onClickAcceptRefuse"
              lableButton="Từ chối"
              classButton="misa-button-normal w-120 misa-btn-danger"
            ></BaseButton>
            <BaseButton
              :tabindex="8"
              lableButton="Phê duyệt"
              classButton="w-120 misa-button-primary "
              @click="beforeSaveData()"
            ></BaseButton>
          </div>
          <div class="is-not-admin" v-else>
            <BaseButton
              :tabindex="8"
              :lableButton="lableButtonBooking"
              classButton="w-120 misa-button-primary "
              @click="beforeSaveData()"
            ></BaseButton>
          </div>
        </div>

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
    v-if="this.popupNoticeMode == Enum.PopupMode.NotifyMode"
  >
    <BaseButton
      :tabindex="1"
      :initFocus="true"
      @keydown.enter="onClickClosePopup"
      @click="onClickClosePopup"
      lableButton="Đóng"
      classButton="misa-button-normal w-80 misa-btn-nomarl"
    ></BaseButton>
  </PopupNotice>
  <!--End Popup Notice Error -->
</template>

<script>
import BookingRoomApi from '@/apis/BookingRoomApi'
import BaseDropdownbox from '@/components/base/BaseDropdownbox.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BasePopup from '@/components/base/BasePopup.vue'
import BaseSelectTagBox from '@/components/base/BaseSelectTagBox.vue'
import { mapActions, mapState } from 'vuex'
import Enum from '@/commons/Enum'
import Resource from '@/commons/Resource'
import PopupNotice from '@/components/popup/PopupNotice.vue'
import { v4 as uuidv4 } from 'uuid'
import ObjectFunction from '@/commons/CommonFuction'
import BaseDate from '@/components/base/BaseDate.vue'
import moment from 'moment'
export default {
  name: ' ',
  components: {
    BaseDropdownbox,
    BaseInput,
    BaseButton,
    BasePopup,
    BaseSelectTagBox,
    PopupNotice,
    BaseDate,
  },
  emits: ['onCloseForm', 'onLoadData', 'onShowLoading'],
  props: {
    popupMode: {
      type: Number,
      default: 0,
    },
    roomID: {
      type: String,
      default: null,
    },
    bookingID: {
      type: String,
      default: null,
    },
    dateBooking: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      RoomCode: '',
      RoomName: '',
      Capacity: 0,
      showIcon: false,
      message: '',
      Enum: Enum,
      roomChoose: {},
      /**Mảng chứa lỗi */
      validateErrorList: [],
      /**Trạng thái của popup */
      popupNoticeMode: -1,
      titlePopup: '',
      Error: {},
      bookingRoomData: {
        BookingRoomID: uuidv4(),
        UserID: JSON.parse(localStorage.getItem('user')).UserID,
        RoomID: null,
        TimeSlots: null,
        Subject: '',
        StartDate: this.dateBooking,
        EndDate: this.dateBooking,
        Quantity: null,
        Description: '',
      },
      isDisable: false,
      isUserBooking: true,
      lstTime: [],
      isAdminApproveRoom: false,
      lableButtonBooking: '',
      titlePopupBooking: '',
    }
  },

  methods: {
    // Gọi hàm load data từ store
    // PTTAM
    ...mapActions({
      loadDataBuildings: 'dictionary/loadDataBuildings',
      loadDataTimes: 'dictionary/loadDataTimes',
      loadDataRooms: 'dictionary/loadDataRooms',
    }),
    /**
     * Sự kiện thay đổi phòng
     * @param {*} value
     * PTTAM
     */
    onValueChangeRoom(value) {
      this.bookingRoomData.RoomID = value
      this.roomChoose = this.dataRoom.find((x) => x.RoomID == value)
    },
    /**
     * Sự kiện thay đổi ca học
     * @param {*} value
     * PTTAM
     */
    onValueChangeTimeSlot(values) {
      if (values) {
        let ids = ''

        values?.forEach((element) => {
          ids += '' + element.TimeSlotID.trim() + ','
        })
        ids = ids.slice(0, -1)
        this.bookingRoomData.TimeSlots = ids
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
    /** Mô tả: Gửi sự kiện đóng form
     * CreatedBy: PTTAM
     */
    onCloseForm() {
      this.$emit('onCloseForm')
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
    // disabledDate(time) {
    //   const today = new Date();
    //   return time.getTime() < today.setHours(0, 0, 0, 0);
    // },
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
      // Lấy danh sách các trường (fields) của object bookingRoomData
      const fields = Object.keys(this.bookingRoomData)

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
        this.showPopup('misa-icon-notice', Resource.ErrForm.ErrorInput, '') // Hiển thị popup
        this.popupNoticeMode = Enum.PopupMode.NotifyMode
      }
    },
    /**
     * Validate
     * PTTAM
     */
    validate(fieldName) {
      try {
        if (!this.bookingRoomData[fieldName] && fieldName != 'Description') {
          let field = ''

          if (fieldName == 'RoomID') {
            field = 'Phòng'
          } else if (fieldName == 'TimeSlots') {
            field = 'Ca học'
          } else if (fieldName == 'Subject') {
            field = 'Tiêu đề'
          } else if (fieldName == 'Quantity') {
            field = 'Số lượng người tham gia'
          }

          this.Error[fieldName] = field + ' ' + Resource.ErrForm.IsNotEmpty
          this.validateErrorList.push(fieldName)
        } else {
          if (fieldName == 'Quantity') {
            let quantity = this.bookingRoomData[fieldName] - 0
            if (quantity > this.roomChoose.Capacity) {
              this.Error[fieldName] =
                'Số lượng người tham gia không được lớn hơn sức chứa của phòng'
              this.validateErrorList.push(fieldName)
            }
          }
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
      if (this.bookingRoomData[fieldName]) {
        this.Error[fieldName] = ''
      }
    },
    /**
     * Thực hiện lưu form
     */
    saveData() {
      if (this.popupMode == Enum.PopupMode.AddMode) {
        try {
          this.bookingRoomData.StartDate = moment(
            this.bookingRoomData.StartDate,
          ).format('YYYY/MM/DD')
          this.bookingRoomData.EndDate = moment(
            this.bookingRoomData.EndDate,
          ).format('YYYY/MM/DD')
          BookingRoomApi.insert(this.bookingRoomData).then((res) => {
            if (res) {
              if (res.data.IsSucess) {
                this.$emit('onCloseForm')
                this.$emit('onShowLoading') // hiển thị loading

                this.$emit('onLoadData')
                ObjectFunction.toastMessage(
                  'Yêu cầu đặt phòng đã được gửi đến quản trị viên phê duyệt.',
                  Resource.Messenger.Success,
                )
              } else {
                let data = res.data.Data
                let message = `Hiện có <span style="font-weight:bold">${data.length}</span> lịch khác trùng với lịch đặt phòng của bạn:<br>`
                message += data
                  .map(
                    (item, index) =>
                      `<span style="display:block;margin-top:10px">${
                        index + 1
                      }. ${item.DescriptionError}</span>`,
                  )
                  .join('')
                this.showPopup('t-infomation', message, 'Đặt phòng bị trùng')

                this.popupNoticeMode = Enum.PopupMode.NotifyMode
              }
            }
          })
        } catch (error) {
          console.log(error)
        }
      } else if (this.popupMode == Enum.PopupMode.EditMode) {
        try {
          this.bookingRoomData.StartDate = moment(
            this.bookingRoomData.StartDate,
          ).format('YYYY/MM/DD')
          this.bookingRoomData.EndDate = moment(
            this.bookingRoomData.EndDate,
          ).format('YYYY/MM/DD')
          BookingRoomApi.updated(this.bookingID, this.bookingRoomData).then(
            (res) => {
              if (res && res.data) {
                if (res.data.IsSusses) {
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
              }
            },
          )
        } catch (error) {
          console.log(error)
        }
      }
    },
    /**
     * Lấy đối tượng user theo khóa chính
     * PTTAM 3/05/2023
     */
    async getBookingRoomByID() {
      await BookingRoomApi.getByID(this.bookingID).then((res) => {
        if (res) {
          let data = res.data
          this.bookingRoomData = {
            BookingRoomID: data.BookingRoomID,
            UserID: data.UserID,
            RoomID: data.RoomID,
            StatusBooking: data.StatusBooking,
            Subject: data.Subject,
            Description: data.Description,
            TimeSlots: data.TimeSlots,
            StartDate: data.StartDate,
            EndDate: data.EndDate,
            Quantity: data.Quantity,
          }
          this.lstTime = this.bookingRoomData.TimeSlots.split(',').map((id) =>
            id.trim(),
          )
          // console.log(this.lstTime)
          // this.lstTime1 = this.lstTime
          this.isDisable =
            this.bookingRoomData.StatusBooking == 1 ? false : true

          this.isUserBooking =
            this.bookingRoomData.UserID ==
            JSON.parse(localStorage.getItem('user')).UserID
              ? true
              : false
        }
      })
    },
    onClickUpdate() {
      this.isDisable = false
    },
    // cập nhật lại ngày khi chọn lại
    onStartDateChanged(item) {
      this.bookingRoomData.StartDate = item.value
    },
    // cập nhật lại ngày khi chọn lại
    onEndDateChanged(item) {
      this.bookingRoomData.EndDate = item.value
    },
  },
  async created() {
    try {
      await this.loadDataBuildings()
      await this.loadDataTimes()
      await this.loadDataRooms()
    } catch (error) {
      console.error(error)
    }
  },
  mounted() {
    if (this.popupMode == Enum.PopupMode.AddMode) {
      this.bookingRoomData.RoomID = this.roomID
      this.titlePopupBooking = 'Đặt phòng'
      this.lableButtonBooking = 'Đặt phòng'
    } else if (
      this.popupMode == Enum.PopupMode.EditMode ||
      this.popupMode == Enum.PopupMode.PendingMode
    ) {
      this.getBookingRoomByID()
      this.titlePopupBooking = 'Chi tiết đặt phòng'
      this.lableButtonBooking = 'Cập nhật'
    }
  },
  computed: {
    // Gán data
    ...mapState({
      dataBuilding: (state) => state.dictionary.dataBuilding,
      dataTime: (state) => state.dictionary.dataTime,
      dataRoom: (state) => state.dictionary.dataRoom,
    }),
  },
}
</script>

<style scoped>
.t-row {
  margin: 10px;
  height: 38px;
  width: 100%;
}
.t-row-infor {
  margin-left: 33%;
  height: 60px !important;
  opacity: 0.5;
}
.mgb-10 {
  margin-bottom: 10px;
}
.t-lable-texarea {
  width: 30%;
  font-size: 14px;
}
.t-lable-date {
  width: 30%;
  font-size: 14px;
}
.content-reson {
  box-sizing: border-box;
  width: 70%;
}
#reson {
  padding: 10px;
  border-radius: 3px;
  border: 1px solid #969696;
  width: 100%;
}
#reson:disabled {
  color: #585959;
  background-color: #f5f5f5;
  border: 1px solid var(--border-color) !important;
}
#reson:focus {
  outline: none;
  border-color: #ccc;
}
</style>
