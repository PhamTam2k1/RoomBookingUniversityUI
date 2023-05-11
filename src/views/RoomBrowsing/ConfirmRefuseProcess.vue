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
        <textarea
          id="reson"
          name="w3review"
          v-model="reson"
          rows="4"
          placeholder="Lý do từ chối"
        >
        </textarea>
      </div>
    </template>
    <template #buttonPopup>
      <base-button
        @click="onClickAcceptRefuse"
        lableButton="Từ chối"
        classButton="misa-button-normal w-120 misa-btn-danger"
      ></base-button>
    </template>
  </base-popup>
</template>

<script>
import Resource from '@/commons/Resource'
import BasePopup from '@/components/base/BasePopup.vue'
import BaseButton from '@/components/base/BaseButton.vue'
// import BaseInput from "@/components/base/BaseInput.vue";
export default {
  components: {
    BasePopup,
    BaseButton,
    // BaseInput
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
    async onClickAcceptRefuse() {
      this.$emit('refuseClick', this.reson)
    },
  },
}
</script>
<style scoped>
#reson {
  margin: 10px 6px 10px 6px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #969696;
  width: 100%;
}
#reson:focus {
  outline: none; /* loại bỏ đường viền màu xanh nhạt mặc định trên Firefox */
  border-color: #ccc; /* thiết lập màu xám cho khung viền khi tập trung */
}
</style>
