<template>
  <div @keydown="eventFormDictionary" ref="popupDictionary">
    <BasePopup
      class="misa-dialog"
      titlePopup="Thêm phòng học"
      classPopup="popup-dictionary-room-detail"
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
        <div class="t-row">
          <base-input
            lable="Mã phòng"
            classInput="misa-input"
            :focus="focus"
            class="misa-input-secondary mgb-8"
            :required="true"
            :maxlength="20"
            :tabindex="1"
          ></base-input>
        </div>
        <div class="t-row">
          <base-input
            lable="Tên phòng"
            classInput="misa-input"
            class="misa-input-secondary mgb-8"
            :required="true"
            :maxlength="255"
            :tabindex="1"
          ></base-input>
        </div>
        <div class="t-row">
          <base-input
            lable="Sức chứa"
            classInput="misa-input"
            class="misa-input-secondary mgb-8"
            :required="true"
            type="Number"
            :tabindex="1"
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
            placeholder="Chọn phòng"
            @onValueChange="onValueChangeRoom"
          ></BaseDropdownbox>
        </div>
        <div class="t-row">
          <BaseDropdownbox
            lable="Chọn người phụ trách"
            classDropdownbox="drop-down-utc "
            :dataSource="dataRoom"
            optionName="RoomName"
            optionValue="RoomID"
            :isSearch="true"
            :height="34"
            placeholder="Chọn phòng"
            @onValueChange="onValueChangeRoom"
          ></BaseDropdownbox>
        </div>
        <div class="t-row">
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
        </div>
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

  <DxToast
    v-model:visible="toastVisible"
    v-model:message="message"
    v-model:type="type"
  />
</template>

<script>
import BuildingApi from '@/apis/BuildingApi'
import { DxToast } from 'devextreme-vue/toast'
import BaseDropdownbox from '@/components/base/BaseDropdownbox.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BasePopup from '@/components/base/BasePopup.vue'
export default {
  name: ' ',
  components: {
    DxToast,
    BaseDropdownbox,
    BaseInput,
    BaseButton,
    BasePopup,
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
      toastVisible: false,
      message: '',
      equipment: [
        { EquipmentID: 1, EquipmentName: 'điều hòa' },
        { EquipmentID: 2, EquipmentName: 'quạt' },
      ],
      items: [1],
    }
  },

  methods: {
    /** Mô tả: Gửi sự kiện đóng form
     * CreatedBy: PTTAM
     */
    onCloseForm() {
      this.$emit('onCloseForm')
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
     * Lưu dữ liệu
     */
    saveData() {
      var data = {
        BuildingCode: this.BuildingCode,
        BuildingName: this.BuildingName,
      }

      if (this.isEdit) {
        try {
          BuildingApi.updated(this.roomData.BuildingID, data).then((res) => {
            if (res && res.IsSuccess) {
              this.toastVisible = true
              this.message = 'Cập nhật thành công'
              this.$emit('closePopup', false)
            } else {
              this.toastVisible = true
              this.message = 'Cập nhật thất bại'
            }
          })
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          BuildingApi.insert(data).then((res) => {
            if (res && res.IsSuccess) {
              this.toastVisible = true
              this.message = 'Lưu thành công'
              this.$emit('closePopup', false)
            } else {
              this.toastVisible = true
              this.message = 'Lưu thất bại'
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
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
  },
}
</script>

<style scoped>
.t-row {
  margin: 10px;
  height: 38px;
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
