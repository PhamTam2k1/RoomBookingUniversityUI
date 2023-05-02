<template>
  <div @keydown="eventFormDictionary" ref="popupDictionary">
    <BasePopup
      class="misa-dialog"
      titlePopup="Đặt phòng"
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
        <div class="t-row">
          <base-input
            :focus="true"
            lable="Tiêu đề"
            classInput="misa-input"
            class="misa-input-secondary mgb-8"
            :required="true"
            :maxlength="20"
            :tabindex="1"
            v-model="bookingRoomData.Subject"
            @handleBlurInput="validate('Subject')"
            @handleKeyupInput="removeError('Subject')"
            :error="Error['Subject']"
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
            :isSearch="true"
            :height="34"
            :tabindex="2"
            placeholder="Chọn phòng"
            @onValueChange="onValueChangeRoom"
            @handleBlurInput="validate('RoomID')"
            @handleKeyupInput="removeError('RoomID')"
            :error="Error['RoomID']"
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
              {{ this.roomChoose.ListEquipment }}
            </div>
          </div>
        </div>
        <div class="t-row">
          <BaseDatePicker
            @change-date="changeDate"
            lable="Ngày bắt đầu"
            :tabindex="3"
            :disabledDate="disabledDate(bookingRoomData.StartDate)"
            :modelValue="bookingRoomData.StartDate"
          ></BaseDatePicker>
        </div>
        <div class="t-row">
          <BaseDatePicker
            :disabledDate="disabledDate"
            @change-date="changeDate"
            lable="Ngày kết thúc"
            :tabindex="4"
            :modelValue="bookingRoomData.EndDate"
          ></BaseDatePicker>
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
            @onValueChange="onValueChangeRoom"
            @handleBlurInput="validate('TimeSlots')"
            @handleKeyupInput="removeError('TimeSlots')"
            :error="Error['TimeSlots']"
          >
          </BaseSelectTagBox>
        </div>

        <div class="t-row flex" style="height: 100px">
          <!-- <base-input
            lable="Lý do đặt"
            classInput="misa-input"
            :focus="focus"
            class="misa-input-secondary mgb-8"
            :required="true"
            :maxlength="20"
            :tabindex="6"
            v-model="bookingRoomData.Description"
            @handleBlurInput="validate('Description')"
            @handleKeyupInput="removeError('Description')"
            :error="Error['Description']"
          ></base-input> -->
          <div class="t-lable-texarea">Lý do đặt</div>
          <div class="content-reson">
            <textarea
              id="reson"
              v-model="bookingRoomData.Description"
              rows="4"
              tabindex="6"
              cols="70"
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
            :maxlength="20"
            :tabindex="7"
            v-model="bookingRoomData.Quantity"
            @handleBlurInput="validate('Quantity')"
            @handleKeyupInput="removeError('Quantity')"
            :error="Error['Quantity']"
            type="Number"
          ></base-input>
        </div>
      </template>
      <template #buttonPopup>
        <BaseButton
          :tabindex="8"
          lableButton="Đặt phòng"
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

  <DxToast
    v-model:visible="toastVisible"
    v-model:message="message"
    v-model:type="type"
  />
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
import BookingRoomApi from '@/apis/BookingRoomApi'
import { DxToast } from 'devextreme-vue/toast'
import BaseDropdownbox from '@/components/base/BaseDropdownbox.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BasePopup from '@/components/base/BasePopup.vue'
import BaseSelectTagBox from '@/components/base/BaseSelectTagBox.vue'
import BaseDatePicker from '@/components/base/BaseDatePicker.vue'
import { mapActions, mapState } from 'vuex'
import Enum from '@/commons/Enum'
import Resource from '@/commons/Resource'
import PopupNotice from '@/components/popup/PopupNotice.vue'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: ' ',
  components: {
    DxToast,
    BaseDropdownbox,
    BaseInput,
    BaseButton,
    BasePopup,
    BaseSelectTagBox,
    BaseDatePicker,
    PopupNotice,
  },
  emits: ['onCloseForm', 'onLoadData', 'onShowLoading'],
  props: {
    popupMode: {
      type: Number,
      default: 0,
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
      Error: {},
      bookingRoomData: {
        BookingRoomID: uuidv4(),
        UserID: JSON.parse(localStorage.getItem('user')).UserID,
        RoomID: null,
        TimeSlots: null,
        Subject: '',
        StartDate: new Date(),
        EndDate: new Date(),
        Quantity: 0,
        Description: '',
      },
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
    showPopup(iconPopup, contentPopup) {
      this.classIconPopup = iconPopup
      this.contentPopup = contentPopup
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
    disabledDate(time) {
      const today = new Date()
      return time.getTime() < today.setHours(0, 0, 0, 0)
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
        if (!this.bookingRoomData[fieldName]) {
          let field = ''
          if (fieldName == 'RoomID') {
            field = 'Phòng'
          } else if (fieldName == 'TimeSlots') {
            field = 'Ca học'
          } else if (fieldName == 'Subject') {
            field = 'Tiêu đề'
          } else if (fieldName == 'Description') {
            field = 'Lý do'
          } else if (fieldName == 'Quantity') {
            field = 'Số lượng người tham gia'
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
      if (this.bookingRoomData[fieldName]) {
        this.Error[fieldName] = ''
      }
    },
    /**
     * Thực hiện lưu form
     */
    saveData() {
      // this.$emit("onShowLoading"); // hiển thị loading
      if (this.popupMode == Enum.PopupMode.AddMode) {
        try {
          this.bookingRoomData.Quantity = parseInt(
            this.bookingRoomData.Quantity,
          )
          BookingRoomApi.insert(this.bookingRoomData).then((res) => {
            if (res && res.data) {
              this.toastVisible = true
              this.message = 'Lưu thành công'
              this.$emit('onCloseForm')
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
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
}
.t-row-infor {
  margin-left: 30%;
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
.content-reson {
  box-sizing: border-box;
  width: 70%;
}
#reson {
  padding: 10px;
  border-radius: 3px;
  border: 1px solid #969696;
}
#reson:focus {
  outline: none; /* loại bỏ đường viền màu xanh nhạt mặc định trên Firefox */
  border-color: #ccc; /* thiết lập màu xám cho khung viền khi tập trung */
}
</style>
