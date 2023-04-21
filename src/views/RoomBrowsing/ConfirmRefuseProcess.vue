<template>
  <base-popup
    class="misa-dialog"
    titlePopup="Từ chối phê duyệt"
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
        Bạn có chắc chắn muốn từ chối lịch họp này không?
        <base-input
          placeholder="Lý do từ chối"
          classInput="misa-input"
          class="misa-input-secondary mgb-8"
          :maxlength="20"
          :tabindex="1"
          v-model="reson"
        ></base-input>
      </div>

    </template>
    <template #buttonPopup>
      <base-button
        @click="onClickAcceptRefuse"
        lableButton="Từ chối"
        classButton="misa-button-normal w-80 misa-btn-danger"
      ></base-button>
    </template>
  </base-popup>
</template>

<script>
import Resource from "@/commons/Resource";
import BasePopup from '@/components/base/BasePopup.vue';
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
export default {
  components:{
    BasePopup,
    BaseButton,
    BaseInput
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
      reson: "",
    };
  },
  methods: {
    /** Mô tả: Gửi sự kiện đóng popup
     * @param
     * @return
     * CreatedBy: PTTAM
     * Created Date: 06-09-2022 00:09:14
     */
    onClickClosePopup() {
      this.$emit("onClickClosePopup");
    },
    /** Mô tả: Sự kiện nhấn vào nút xóa người dùng
     * CreatedBy: PTTAM
     * Created Date: 03-09-2022 07:04:16
     */
    async onClickAcceptRefuse() {
      this.$emit("refuseClick", this.reson);
    },
  },
};
</script>