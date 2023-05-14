<template>
  <el-popover
    v-if="hidePopup || isShowPopup"
    :visible="isShowPopup"
    placement="bottom"
    trigger="click"
    width="400"
    height="300"
    popper-class="my-popper-class"
    style="transform: translateX(-50%)"
  >
    <div class="t-header-setting flex">
      <div class="t-title">Bộ lọc</div>
      <el-tooltip content="Đóng" placement="bottom">
        <div
          class="misa-icon misa-icon-close misa-icon-24"
          @click="onClickClosePopup"
        ></div>
      </el-tooltip>
    </div>
    <div class="t-content-setting">
      <div class="t-row">
        <div class="t-lable-row mgb-8">Thiết bị</div>
        <BaseSelectTagBox
          :dataSource="dataEquipment"
          :height="34"
          :width="350"
          classDropdownbox="drop-down-utc"
          optionName="EquipmentName"
          optionValue="EquipmentID"
          placeholder="Chọn thiết bị"
          :value="Equipment"
          @onOptionChange="onOptionChangeEquipment"
        >
        </BaseSelectTagBox>
      </div>
      <div class="t-row mgt-8">
        <div class="t-lable-row mgb-8">Sức chứa</div>
        <div class="t-row-group flex">
          <div class="t-row-capacityMin">
            <BaseInput
              placeholder="Tối thiểu"
              classInput="misa-input"
              class="misa-input-secondary"
              :tabindex="1"
              type="Number"
              v-model="valueFilter.CapacityMin"
            ></BaseInput>
          </div>
          <div class="t-div mgl-8p mgt-8">-</div>
          <div class="t-row-capacityMax mgl-8p">
            <base-input
              placeholder="Tối đa"
              classInput="misa-input"
              class="misa-input-secondary"
              :tabindex="2"
              type="Number"
              v-model="valueFilter.CapacityMax"
            ></base-input>
          </div>
        </div>
      </div>
    </div>
    <div class="t-footer-popup">
      <div class="t-footer-setting flex">
        <BaseButton
          lableButton="Lấy lại mặc định"
          classButton="misa-button-normal w-150"
          @click="handleGetDefaultFilter"
        ></BaseButton>
        <base-button
          @click="handleClickFilter"
          lableButton="Áp dụng"
          class="btn-cancel"
          classButton="misa-button-normal w-120 misa-button-primary "
        ></base-button>
      </div>
    </div>
  </el-popover>
</template>

<script>
import BaseInput from '@/components/base/BaseInput.vue'
import Resource from '@/commons/Resource'
import BaseSelectTagBox from '@/components/base/BaseSelectTagBox.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    BaseInput,
    BaseSelectTagBox,
    BaseButton,
  },
  props: {
    /**Mảng chứa data */
    dataSource: {
      type: Object,
    },
    isShowPopup: {
      type: Boolean,
    },
  },
  computed: {
    // Gán data
    ...mapState({
      dataBuilding: (state) => state.dictionary.dataBuilding,
      dataEquipment: (state) => state.dictionary.dataEquipment,
      dataRoom: (state) => state.dictionary.dataRoom,
    }),
  },
  data() {
    return {
      /**object chứa resource */
      Resource: Resource,
      /**Từ khóa tìm kiếm cột */
      keyword: '',
      valueFilter: {
        CapacityMin: null,
        CapacityMax: null,
        EquipmentIDs: null,
      },
      Equipment: [],
      hidePopup: true,
    }
  },
  methods: {
    // Gọi hàm load data từ store
    ...mapActions({
      loadDataBuildings: 'dictionary/loadDataBuildings',
      loadDataEquipments: 'dictionary/loadDataEquipments',
      loadDataRooms: 'dictionary/loadDataRooms',
    }),
    handleClickFilter() {
      this.$emit('valueFilterRoom', this.valueFilter)
    },
    handleGetDefaultFilter() {
      this.valueFilter.EquipmentIDs = null
      this.valueFilter.CapacityMin = null
      this.valueFilter.CapacityMax = null
      this.hidePopup = false
      this.$emit('valueFilterRoom', this.valueFilter)
      this.onClickClosePopup()
    },
    /**
     * Sự kiện thay đổi lọc thiết bị trong phòng học
     * @param {*} values
     */
    onOptionChangeEquipment(values) {
      if (values) {
        let ids = '['

        values?.forEach((element) => {
          console.log(element)

          // ids += '"' + element.EquipmentID.trim() + '",'
          ids += `"${element.EquipmentID.trim()}",`
        })
        ids = ids.slice(0, -1) + ']'
        this.valueFilter.EquipmentIDs = ids
      }
    },
    /** Mô tả: Gửi sự kiện đóng popup
     * CreatedBy: PTTAM
     * Created Date: 06-09-2022 00:09:14
     */
    onClickClosePopup() {
      this.$emit('onClickClosePopup')
    },
  },
  async mounted() {
    await this.loadDataEquipments()
  },
}
</script>

<style scoped>
.t-header-setting {
  font-size: 18px;
  font-weight: 600;

  padding: 18px;
  border-bottom: 1px solid #e8e2e2;
}
.t-row {
  height: 70px;
  font-size: 14px;
}
.t-content-setting {
  padding: 18px;
}
.t-lable-row {
  font-weight: 600;
}
.t-footer-setting {
  border-top: 1px solid #e8e2e2;
  padding: 18px 20px;
  font-size: 14px;
}
.t-footer-setting .btn-cancel,
.misa-icon {
  position: absolute;
  right: 0;
  margin-right: 20px;
}
.t-footer-popup {
  background-color: #f1f5f9;
}
</style>
