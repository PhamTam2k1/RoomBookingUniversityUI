<template>
  <base-popup
    class="misa-dialog"
    :titlePopup="isAdmin ? 'Phê duyệt' : 'Mở cửa'"
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
      <div class="content-popup-delete">
        <div v-if="isAdmin">
          Bạn có chắc chắn muốn phê duyệt lịch họp này không?
        </div>
        <div v-else>Bạn có muốn chọn mở cửa phòng cho lịch họp này không?</div>
      </div>
    </template>
    <template #buttonPopup>
      <base-button
        v-if="isAdmin"
        @click="onClickAcceptApprove"
        lableButton="Phê duyệt"
        classButton="misa-button-normal w-120 misa-button-primary "
      ></base-button>
      <base-button
        v-else
        @click="onClickAcceptApprove"
        lableButton="Có"
        classButton="misa-button-normal w-120 misa-button-primary "
      ></base-button>
    </template>
  </base-popup>
</template>

<script>
import Resource from '@/commons/Resource'
import BasePopup from '@/components/base/BasePopup.vue'
import BaseButton from '@/components/base/BaseButton.vue'
export default {
  components: {
    BasePopup,
    BaseButton,
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**Object chứa resource */
      Resource: Resource,
      reson: '',
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
    async onClickAcceptApprove() {
      this.$emit('approveClick')
    },
  },
}
</script>
