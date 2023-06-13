<template>
  <div @keydown="eventFormDictionary" ref="popupDictionary">
    <BasePopup
      class="misa-dialog"
      :titlePopup="titlePopupBooking"
      classPopup="popup-room-detail"
      @onClickClosePopup="onCloseForm"
      :tabindex="9"
      :lableButton="
        isUserBooking && popupMode != Enum.PopupMode.HistoryMode
          ? 'Hủy'
          : 'Đóng'
      "
    >
      <template #iconPopup>
        <div class="flex">
          <el-tooltip
            class="box-item"
            effect="dark"
            placement="bottom"
            :visible="isShowPoperEdit"
          >
            <div
              v-if="popupMode == Enum.PopupMode.EditMode && isUserBooking"
              class="misa-icon misa-icon-pencil misa-icon-24"
              @click="onClickUpdate"
            ></div>
            <template #content>
              <div class="t-line" @click="onClickEditEvent(1)">
                Sửa ngày đang chọn
              </div>
              <div class="t-line" @click="onClickEditEvent(2)">
                Chỉnh sửa toàn bộ sự kiện
              </div>
            </template>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            placement="bottom"
            :visible="isShowPoperCancel"
          >
            <div
              v-if="popupMode == Enum.PopupMode.EditMode && isUserBooking"
              class="misa-icon-navbar misa-icon-delete-custom misa-icon-24 mgl-8p"
              @click="onClickCancel"
            ></div>
            <template #content>
              <div class="t-line" @click="onClickCancelEvent(1)">
                Xóa ngày đang chọn
              </div>
              <div class="t-line" @click="onClickCancelEvent(2)">
                Xóa toàn bộ sự kiện
              </div>
            </template>
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
        <div class="t-content-popup flex">
          <div class="t-left-content">
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
                <div class="t-content mgl-16">
                  {{ this.roomChoose.Capacity }}
                </div>
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
                :min="currentDate"
                :disabled="disableStartDate"
                :isError="isErrorStartDate"
                :content="contentErrStartDate"
              ></BaseDate>
            </div>
            <div class="t-row flex">
              <div class="t-lable-date">Ngày kết thúc</div>
              <BaseDate
                width="165"
                class="mt-16"
                :labelMode="'hidden'"
                :stylingMode="'outlined'"
                @onValueChanged="onStartDateChanged"
                lable=""
                :tabindex="3"
                :value="bookingRoomData.StartDate"
                :min="currentDate"
                :disabled="disableStartDate"
                :content="contentErrStartDate"
              ></BaseDate>
            </div>

            <div class="t-row">
              <BaseSelectTagBox
                lable="Chọn ca học"
                :dataSource="dataTime"
                :height="34"
                :tabindex="5"
                :required="true"
                classDropdownbox="drop-down-utc"
                optionName="NameTime"
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
              <BaseDropdownbox
                lable="Lặp lại"
                :required="false"
                classDropdownbox="drop-down-utc "
                :dataSource="reapeatTimes"
                optionName="Text"
                optionValue="Value"
                :value="bookingRoomData.RepeatValue"
                :isSearch="false"
                :height="34"
                :tabindex="2"
                :width="142"
                @onValueChange="onValueChangeRepeatValue"
                :isDisable="isDisable || !isUserBooking"
              ></BaseDropdownbox>
            </div>
            <div class="t-row" v-if="bookingRoomData.RepeatValue != 'NONE'">
              <base-input
                lable="Chu kì lặp"
                classInput="misa-input "
                class="misa-input-secondary mgb-8"
                :required="true"
                :tabindex="7"
                v-model="bookingRoomData.RepeatFreq"
                @handleBlurInput="validate('RepeatFreq')"
                @handleKeyupInput="removeError('RepeatFreq')"
                :error="Error['RepeatFreq']"
                type="Number"
                :isDisable="isDisable || !isUserBooking"
              ></base-input>
            </div>
            <div
              class="t-row flex"
              v-if="bookingRoomData.RepeatValue != 'NONE'"
            >
              <div class="t-lable-date">Cho đến ngày:</div>
              <BaseDate
                width="165"
                class="mt-16"
                :labelMode="'hidden'"
                :stylingMode="'outlined'"
                @onValueChanged="onEndDateChanged"
                lable=""
                :tabindex="4"
                :value="bookingRoomData.EndDate"
                :min="currentDate"
                :disabled="disableEndDate"
                :isError="isErrorEndDate"
                :content="contentErrEndDate"
              ></BaseDate>
            </div>
            <!-- <div class="t-row">
              <div class="demo-button-style">
                <el-checkbox-group v-model="checkboxGroup1">
                  <el-checkbox-button
                    v-for="day in weeks"
                    :key="day"
                    :label="day"
                    >{{ day }}</el-checkbox-button
                  >
                </el-checkbox-group>
              </div>
            </div> -->
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
          </div>
          <div class="t-right-content mgl-16">
            <div class="t-contact mgb-8 flex">
              <div class="icon-sibar t-infomation-room misa-icon-24"></div>
              <div class="t-lable-contact">Thông tin liên quan</div>
            </div>
            <div class="t-admin">
              <div class="t-title-tooltip font-italic mgb-8">
                Người phê duyệt
              </div>
              <div class="misa-full-name-avatar-table flex">
                <div
                  class="misa-cell-avatar-color"
                  :style="{
                    backgroundColor: roomChoose.AvartarAdmin,
                  }"
                >
                  {{ ObjectFunction.splitFullName(roomChoose.AdminName) }}
                </div>
                <div class="t-content">
                  <div class="misa-cell-FullName font-weight">
                    {{ roomChoose.AdminName }}
                  </div>
                  <div class="">
                    {{ roomChoose.AdminEmail }}
                  </div>
                </div>
              </div>
            </div>
            <div class="t-admin">
              <div class="t-title-tooltip font-italic mgb-8">
                Phụ trách phòng
              </div>
              <div class="misa-full-name-avatar-table flex">
                <div
                  class="misa-cell-avatar-color"
                  :style="{
                    backgroundColor: roomChoose.AvartarSupporter,
                  }"
                >
                  {{ ObjectFunction.splitFullName(roomChoose.SupporterName) }}
                </div>
                <div class="t-content">
                  <div class="misa-cell-FullName font-weight">
                    {{ roomChoose.SupporterName }}
                  </div>
                  <div class="">
                    {{ roomChoose.SupporterEmail }}
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="
                popupMode == Enum.PopupMode.HistoryMode &&
                bookingRoomData.RefusalReason != ''
              "
            >
              <div class="t">
                <div class="flex">
                  <div class="icon-sibar t-information-red misa-icon-24"></div>
                  <div class="t-lable mgb-8 font-weight">Lý do từ chối</div>
                </div>

                <div class="content t-admin" style="color: red">
                  {{ bookingRoomData.RefusalReason }}
                  <!-- <textarea
                    id="reson"
                    :disabled="isDisable || !isUserBooking"
                    v-model="bookingRoomData.RefusalReason"
                    rows="4"
                    tabindex="6"
                    style="width: 100%"
                  > -->
                  <!-- </textarea> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #buttonPopup>
        <div class="t-button-footer">
          <div
            class="t--is-admin flex"
            v-if="
              popupMode == Enum.PopupMode.PendingMode &&
              popupMode != Enum.PopupMode.HistoryMode &&
              isAdmin
            "
          >
            <BaseButton
              v-if="popupMode == Enum.PopupMode.PendingMode"
              @click="RejectRequest()"
              lableButton="Từ chối"
              classButton="misa-button-normal w-120 misa-btn-danger"
            ></BaseButton>
            <BaseButton
              :tabindex="8"
              lableButton="Phê duyệt"
              classButton="w-120 misa-button-primary "
              @click="ApproveRequest()"
            ></BaseButton>
          </div>
          <div class="is-not-admin" v-else>
            <BaseButton
              v-if="isUserBooking && popupMode != Enum.PopupMode.HistoryMode"
              :tabindex="8"
              :lableButton="lableButtonBooking"
              classButton="w-120 misa-button-primary "
              @click="beforeSaveData()"
            ></BaseButton>
            <!-- <BaseButton
           
              :tabindex="8"
              :lableButton="lableButtonBooking"
              classButton="w-120 misa-button-primary "
              @click="beforeSaveData()"
            ></BaseButton> -->
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
  <!--End Popup Notice Error -->
  <ConfirmRefuseProcess
    @refuseClick="(reson) => refuseClick(reson)"
    @onClickClosePopup="popupModeRefuse = -1"
    :popupMode="popupModeRefuse"
    v-if="popupModeRefuse == Enum.PopupMode.RefuseMode"
  />
  <BaseLoading :isShowLoading="isShowLoading"></BaseLoading>
</template>

<script>
// import 'element-plus/dist/index.css'
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
import ConfirmRefuseProcess from '@/views/RoomBrowsing/ConfirmRefuseProcess.vue'
import BaseLoading from '@/components/base/BaseLoading.vue'
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
    ConfirmRefuseProcess,
    BaseLoading,
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
  },

  data() {
    return {
      RoomCode: '',
      RoomName: '',
      Capacity: 0,
      showIcon: false,
      message: '',
      roomChoose: {},
      /**Mảng chứa lỗi */
      validateErrorList: [],
      /**Trạng thái của popup */
      popupNoticeMode: -1,
      titlePopup: '',
      Error: {},
      ObjectFunction: ObjectFunction,
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
        RepeatValue: 'NONE',
        RepeatFreq: 1,
      },
      isShowPoperEdit: false,
      isShowPoperCancel: false,
      isDisable: false,
      isUserBooking: true,
      lstTime: [],
      isAdminApproveRoom: false,
      lableButtonBooking: '',
      titlePopupBooking: '',
      popupModeRefuse: -1,
      isAdmin: false,
      /** Biến show loading: true- show, false - hide*/
      isShowLoading: false,
      currentDate: new Date(),
      isErrorEndDate: false,
      isErrorStartDate: false,
      disableStartDate: true,
      disableEndDate: true,
      contentErrStartDate: 'Ngày bắt đầu không được lớn hơn ngày lặp lại',
      contentErrEndDate: 'Ngày lặp lại không được nhỏ hơn ngày bắt đầu',
      /**mảng chứa số bản ghi trên 1 trang */
      reapeatTimes: Resource.RepeatTime,
      isUpdateAll: false,
      isCancelAll: false,
    }
  },

  methods: {
    // Gọi hàm load data từ store
    // PTTAM
    ...mapActions({
      loadDataRooms: 'dictionary/loadDataRooms',
      loadDataBuildings: 'dictionary/loadDataBuildings',
      loadDataTimes: 'dictionary/loadDataTimes',
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
     * Sự kiện thay đổi phòng
     * @param {*} value
     * PTTAM
     */
    onValueChangeRepeatValue(value) {
      if (value == 'NONE') {
        this.bookingRoomData.EndDate = this.bookingRoomData.StartDate
      }
      this.bookingRoomData.RepeatValue = value
    },
    /**
     * Mô tả : Hàm show/hide loading
     * @param {Boolean} isShow true: hiển thị loading, false: ẩn loading
     * @Createdby: PTTAM
     */
    showLoading(isShow) {
      this.isShowLoading = isShow
    },
    /**
     * Sự kiện thay đổi ca học
     * @param {*} value
     * PTTAM
     */
    onValueChangeTimeSlot(values) {
      if (values) {
        // var dates = []
        let ids = ''
        // let year = this.bookingRoomData.StartDate.getYear()
        // let month = this.bookingRoomData.StartDate.getMonth() + 1
        // let day = this.bookingRoomData.StartDate.getDate()
        // for (let i = 0; i < values.length; i++) {
        //   let time = this.dataTime.find(
        //     (x) => x.TimeSlotID == values[i].TimeSlotID,
        //   )
        //   switch (time.TimeSlotName) {
        //     case 1:
        //       dates.push(new Date(year, month, day, 7))
        //       break
        //     case 2:
        //       dates.push(new Date(year, month, day, 9, 35))
        //       break
        //     case 3:
        //       dates.push(new Date(year, month, day, 13))
        //       break
        //     case 4:
        //       dates.push(new Date(year, month, day, 15, 35))

        //       break
        //     case 5:
        //       dates.push(new Date(year, month, day, 18, 5))
        //       break
        //     default:
        //       break
        //   }
        // }
        // dates.forEach((element) => {
        //   if (new Date() > new Date(element)) {
        //     this.Error['TimeSlots'] = 'Đã quá thời gian đặt'
        //     this.validateErrorList.push('TimeSlots')
        //     return
        //   }
        // })
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
      this.showLoading(true)
      this.validateErrorList = [] // Gán lại array = []
      // Lấy danh sách các trường (fields) của object bookingRoomData
      const fields = Object.keys(this.bookingRoomData)

      // Lặp qua danh sách các trường để lấy tên của các trường
      fields.forEach((field) => {
        this.validate(field)
      })
      // Nếu mảng chứa lỗi không chứa lỗi
      if (
        this.validateErrorList.length <= 0 &&
        !this.isErrorEndDate &&
        !this.isErrorStartDate
      ) {
        // Thêm mới user
        this.saveData()
      } else {
        this.showLoading(false)
        // Ngược lại
        this.showPopup(
          'misa-icon-notice',
          Resource.ErrForm.ErrorInput,
          'Dữ liệu không hợp lệ',
        ) // Hiển thị popup
        this.popupNoticeMode = Enum.PopupMode.NotifyMode
      }
    },
    /**
     * Thực hiện mở popup hủy đặt phòng
     */
    onClickShowCacel() {
      this.showPopup(
        't-question-nocation',
        'Bạn có muốn hủy lịch đặt phòng này không?',
        'Hủy đặt phòng',
      ) // Hiển thị popup
      this.popupNoticeMode = Enum.PopupMode.DeleteMode
    },
    /**
     * Validate
     * PTTAM
     */
    validate(fieldName) {
      try {
        if (
          !this.bookingRoomData[fieldName] &&
          fieldName != 'Description' &&
          fieldName != 'RefusalReason'
        ) {
          let field = ''

          if (fieldName == 'RoomID') {
            field = 'Phòng'
          } else if (fieldName == 'TimeSlots') {
            field = 'Ca học'
          } else if (fieldName == 'Subject') {
            field = 'Tiêu đề'
          } else if (fieldName == 'Quantity') {
            field = 'Số lượng người tham gia'
          } else if (fieldName == 'RepeatFreq') {
            field = 'Chu kì lặp'
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
      let me = this
      let bookingData = {}
      if (me.popupMode == Enum.PopupMode.AddMode) {
        try {
          me.bookingRoomData.StartDate = moment(
            this.bookingRoomData.StartDate,
          ).format('YYYY/MM/DD')
          me.bookingRoomData.EndDate = moment(
            me.bookingRoomData.EndDate,
          ).format('YYYY/MM/DD')
          BookingRoomApi.insert(me.bookingRoomData).then((res) => {
            if (res) {
              if (res.data.IsSucess) {
                bookingData = res.data.BookingData
                me.$emit('onCloseForm')

                me.$emit('onLoadData')
                if (me.isAdmin) {
                  ObjectFunction.toastMessage(
                    'Đặt phòng thành công.',
                    Resource.Messenger.Success,
                  )
                } else {
                  ObjectFunction.toastMessage(
                    'Yêu cầu đặt phòng đã được gửi đến quản trị viên phê duyệt.',
                    Resource.Messenger.Success,
                  )
                }
                me.$emit('onShowLoading') // hiển thị loading
                me.$emit('isSuccess', {
                  popupMode: me.popupMode,
                  bookingRoomData: bookingData,
                })
              } else {
                me.showLoading(false)
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

          // Nếu chọn update all bản ghi
          if(this.isUpdateAll){ BookingRoomApi.updated(me.bookingID, me.bookingRoomData).then(
            (res) => {
              if (res) {
                if (res.data.IsSucess) {
                  bookingData = res.data.BookingData
                  me.$emit('onCloseForm')

                  me.$emit('onLoadData')
                  if (me.isAdmin) {
                    ObjectFunction.toastMessage(
                      'Cập nhật phòng thành công.',
                      Resource.Messenger.Success,
                    )
                  } else {
                    ObjectFunction.toastMessage(
                      'Yêu cầu đặt phòng đã được gửi đến quản trị viên phê duyệt.',
                      Resource.Messenger.Success,
                    )
                  }
                  me.$emit('onShowLoading') // hiển thị loading
                  me.$emit('isSuccess', {
                    popupMode: me.popupMode,
                    bookingRoomData: bookingData,
                  })
                } else {
                  me.showLoading(false)
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
            },
          )}else{
            // Gọi api update 1 bản ghi theo BookingRoomID
          }
         
        } catch (error) {
          console.log(error)
        }
        this.$emit('isSuccess', {
          popupMode: this.popupMode,
          bookingRoomData: this.bookingRoomData,
          bookingID: this.bookingID,
        })
      }
    },
    /**
     * Lấy đối tượng user theo khóa chính
     * PTTAM 3/05/2023
     */
    async getBookingRoomByID() {
      let me = this
      me.showLoading(true)
      await BookingRoomApi.getByID(this.bookingID).then((res) => {
        if (res) {
          let data = res.data
          me.bookingRoomData = {
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
            RefusalReason: data.RefusalReason,
            RepeatFreq: data.RepeatFreq,
            RepeatValue: data.RepeatValue,
          }
          me.lstTime = me.bookingRoomData.TimeSlots.split(',').map((id) =>
            id.trim(),
          )
          // console.log(this.lstTime)
          // this.lstTime1 = this.lstTime
          me.isDisable = me.bookingRoomData.StatusBooking == 1 ? true : true
          me.roomChoose = me.dataRoom.find((x) => x.RoomID == data.RoomID)
          me.bookingRoomData.AdminID = me.roomChoose.AdminID
          me.bookingRoomData.AdminEmail = me.roomChoose.AdminEmail
          me.isUserBooking =
            me.bookingRoomData.UserID ==
            JSON.parse(localStorage.getItem('user')).UserID
              ? true
              : false
          me.showLoading(false)
        }
      })
    },
    onClickUpdate() {
      this.isShowPoperEdit = !this.isShowPoperEdit
    },
    onClickEditEvent(number) {
      this.isShowPoperEdit = !this.isShowPoperEdit
      this.isDisable = false
      if (number == 1) {
        // Chỉnh sửa sự kiện duy nhất
        this.isUpdateAll = false
      } else {
        this.isUpdateAll = true
        // Chỉnh sửa toàn bộ sự kiện
      }
    },
    onClickCancel() {
      this.isShowPoperCancel = !this.isShowPoperCancel
    },
    onClickCancelEvent(number) {
      this.isShowPoperCancel = !this.isShowPoperCancel
      this.onClickShowCacel()
      if (number == 1) {
        this.isCancelAll = false
        // Chỉnh sửa sự kiện duy nhất
      } else {
        this.isCancelAll = true
        // Chỉnh sửa toàn bộ sự kiện
      }
    },
    // cập nhật lại ngày khi chọn lại
    onStartDateChanged(item) {
      this.bookingRoomData.StartDate = item.value
      if (this.bookingRoomData.RepeatValue != 'NONE') {
        if (new Date(this.bookingRoomData.EndDate) < new Date(item.value)) {
          this.isErrorStartDate = true
          this.disableStartDate = false
        } else {
          this.isErrorStartDate = false
          this.disableStartDate = true
          this.isErrorEndDate = false
          this.disableEndDate = true
        }
      }
    },
    // cập nhật lại ngày khi chọn lại
    onEndDateChanged(item) {
      this.bookingRoomData.EndDate = item.value
      if (
        new Date(this.bookingRoomData.EndDate) <
        new Date(this.bookingRoomData.StartDate)
      ) {
        this.isErrorEndDate = true
        this.disableEndDate = false
      } else {
        this.isErrorEndDate = false
        this.disableEndDate = true
        this.isErrorStartDate = false
        this.disableStartDate = true
      }
    },
    /**
     * Thực hiện phê duyệt
     */
    async ApproveRequest() {
      try {
        let me = this
        const res = await BookingRoomApi.approveRequest({
          bookingRoomID: me.bookingID,
          option: Enum.OptionRequest.Approve,
        })

        if (res && res.data) {
          me.$emit('onShowLoading')
          me.$emit('onCloseForm')
          me.$emit('onLoadData')
          ObjectFunction.toastMessage(
            'Phê duyệt thành công',
            Resource.Messenger.Success,
          )
          me.$emit('isSuccess', {
            bookingID: me.bookingID,
            option: Enum.OptionRequest.Approve,
          })
        } else {
          me.$emit('onCloseForm')
          ObjectFunction.toastMessage(
            'Phê duyệt thất bại',
            Resource.Messenger.Error,
          )
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * Hiển thị popup từ chối phê duyệt
     */
    RejectRequest() {
      this.popupModeRefuse = Enum.PopupMode.RefuseMode
    },
    /**
     * Từ chối duyệt
     */
    refuseClick(reson) {
      try {
        let me = this
        BookingRoomApi.approveRequest({
          bookingRoomID: me.bookingID,
          refusalReason: reson,
          option: Enum.OptionRequest.Reject,
        }).then((res) => {
          if (res && res.data) {
            me.$emit('onShowLoading')
            me.$emit('onCloseForm')
            me.$emit('onLoadData')
            me.popupModeRefuse = -1
            ObjectFunction.toastMessage(
              'Từ chối thành công',
              Resource.Messenger.Success,
            )
            me.$emit('isSuccess', {
              bookingID: me.bookingID,
              option: Enum.OptionRequest.Reject,
            })
          } else {
            me.$emit('onCloseForm')
            me.popupModeRefuse = -1
            ObjectFunction.toastMessage(
              'Từ chối thất bại',
              Resource.Messenger.Success,
            )
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * Hủy lịch đặt phòng
     */
    onClickCancelBooking() {
      try {
        let me = this
        // Nếu chọn xóa 1 sự lịch đăt
        if (!this.isCancelAll) {
          BookingRoomApi.cancelBookingRequest(me.bookingID).then((res) => {
            if (res && res.data.IsSusses) {
              me.$emit('onShowLoading')
              me.$emit('onCloseForm')
              me.$emit('onLoadData')
              me.popupNoticeMode = -1
              me.$emit('isSuccess', {
                popupMode: 9,
                bookingID: me.bookingID,
              })
              ObjectFunction.toastMessage(
                'Hủy đặt phòng thành công',
                Resource.Messenger.Success,
              )
            } else {
              me.$emit('onCloseForm')
              me.popupNoticeMode = -1
              ObjectFunction.toastMessage(
                'Hủy đặt phòng thất bại',
                Resource.Messenger.Success,
              )
            }
          })
        } else {
          // Gọi api xóa theo event ID
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  async mounted() {
    try {
      await this.loadDataBuildings()
      await this.loadDataTimes()
      await this.loadDataRooms()
    } catch (error) {
      console.error(error)
    }
    this.isAdmin =
      localStorage.getItem('roleOption') - 0 == Enum.RoleOption.Admin
        ? true
        : false
    if (this.popupMode == Enum.PopupMode.AddMode) {
      this.bookingRoomData.RoomID = this.roomID
      this.titlePopupBooking = 'Đặt phòng'
      this.lableButtonBooking = 'Đặt phòng'
      debugger
      this.roomChoose = this.dataRoom.find((x) => x.RoomID == this.roomID)
      this.bookingRoomData.AdminID = this.roomChoose.AdminID
      this.bookingRoomData.AdminEmail = this.roomChoose.AdminEmail
    } else if (
      this.popupMode == Enum.PopupMode.EditMode ||
      this.popupMode == Enum.PopupMode.PendingMode ||
      this.popupMode == Enum.PopupMode.HistoryMode
    ) {
      this.getBookingRoomByID()
      this.titlePopupBooking = 'Chi tiết đặt phòng'
      this.lableButtonBooking = 'Cập nhật'
    }
  },
  computed: {
    // Gán data
    ...mapState({
      dataRoom: (state) => state.dictionary.dataRoom,
      dataBuilding: (state) => state.dictionary.dataBuilding,
      dataTime: (state) => state.dictionary.dataTime,
    }),
    // Đăng ký đối tượng Enum trong phạm vi của component
    Enum() {
      return Enum
    },
    repeatText() {
      let value = ''
      switch (this.bookingRoomData.RepeatValue) {
        case 'DAY':
          value = 'ngày'
          break
        case 'WEEK':
          value = 'tuần'
          break
        case 'MONTH':
          value = 'tháng'
          break
        default:
          value = 'NONE'
          break
      }
      return value
    },
  },
}
</script>

<style scoped>
.t-row {
  margin: 10px;
  height: 38px;
  width: 100%;
}
.t-row2,
.t-row3 {
  height: 38px;
  /* width: 50%; */
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
.t-lable-date2 {
  margin-top: 10px;
  margin-left: 20px;
  width: 13%;
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
.t-left-content {
  width: 65%;
}
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
.t-right-content {
  border-left: 1px solid rgba(221, 221, 221, 0.6);
  padding: 0px 0px 20px 20px;
  margin: 10px 0px 10px 0px;
}
.t-left-content {
  margin-right: 20px;
}
.t-lable-contact {
  font-weight: 600;
}

.icon-sibar.misa-icon-24.t-infomation-room,
.icon-sibar.misa-icon-24.t-information-red {
  margin-top: 4px;
}

.font-weight {
  font-weight: 600;
}
.font-italic {
  font-style: italic;
}
.t-admin {
  padding-left: 28px;
  margin-bottom: 20px;
}
.demo-button-style {
  margin-top: 24px;
}
.t-line:hover {
  /* background-color: rgba(255, 255, 255, 0.1); */
  cursor: pointer;
}
.t-line {
  font-size: 15px;
  margin: 10px;
}
</style>
