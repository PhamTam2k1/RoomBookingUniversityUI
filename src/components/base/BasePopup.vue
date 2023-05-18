<template>
  <div>
    <div class="misa-dialog-content" :class="classPopup">
      <div class="misa-dialog-close" :class="classIconPopup">
        <slot name="iconPopup"></slot>
      </div>
      <div class="misa-dialog-header misa-title">
        <div class="title">
          <b> {{ titlePopup }}</b>
        </div>
        <slot name="customPopup"></slot>
      </div>
      <div class="misa-dialog-body">
        <slot name="contentPopup"></slot>
      </div>
      <div class="misa-dialog-footer">
        <BaseButton
          :lableButton="lableButton"
          classButton="misa-button-normal w-80"
          @click="onClickClosePopup"
          :tabindex="tabindex"
          v-if="buttonCancel"
        ></BaseButton>
        <slot name="buttonPopup"></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url(../../styles/components/dialog.css);
</style>

<script>
import BaseButton from './BaseButton.vue'
export default {
  components: {
    BaseButton,
  },
  props: {
    /**Tên class popup*/
    classPopup: {
      type: String,
      default: '',
    },

    /**Tên icon popup */
    classIconPopup: {
      type: String,
      default: '',
    },

    /**Title của popup */
    titlePopup: {
      type: String,
      default: '',
    },
    /**Title của popup */
    lableButton: {
      type: String,
      default: 'Hủy',
    },
    /**Trạng thái của popup */
    popupMode: {
      type: Number,
      default: 0,
    },

    /**Hiển thị button hủy */
    buttonCancel: {
      type: Boolean,
      default: true,
    },
    tabindex: {
      type: Number,
      default: -1,
    },
  },
  methods: {
    /** Mô tả: Gửi sự kiện đóng popup
     * CreatedBy: PTTAM
     * Created Date: 11-09-2022 08:08:15
     */
    onClickClosePopup() {
      this.$emit('onClickClosePopup')
    },
  },
}
</script>
