<template>
  <BasePopup
    :buttonCancel="false"
    class="misa-dialog"
    classPopup="misa-popup-notice"
    :popupMode="popupMode"
    @onClickClosePopup="onClickClosePopup"
  >
    <template #contentPopup>
      <div class="content-popup-notice">
        <div class="t-content-body flex">
          <div class="t-dialog-icon">
            <div class="misa-icon-navbar misa-icon-24" :class="classIcon"></div>
          </div>
          <div class="t-dialog-text">{{ contentPopup }}</div>
        </div>
      </div>
    </template>
    <template #buttonPopup>
      <slot></slot>
    </template>
  </BasePopup>
</template>

<script>
import Resource from '@/commons/Resource'
import BasePopup from '../base/BasePopup.vue'
export default {
  components: {
    BasePopup,
  },
  props: {
    /**Mode của popup */
    popupMode: {
      type: Number,
    },

    /**Nội dung của popup */
    contentPopup: {
      type: String,
    },

    /**Icon của popup */
    classIcon: {
      type: String,
    },
  },
  data() {
    return {
      /**Object chứa resource */
      Resource: Resource,
    }
  },
  methods: {
    /** Mô tả: Gửi sự kiện đóng popup
     * CreatedBy: PTTAM
     * Created Date: 06-09-2022 00:09:14
     */
    onClickClosePopup() {
      this.$emit('onClickClosePopup')
    },
  },
}
</script>
<style scoped>
.t-dialog-icon {
  margin-right: 15px;
}
</style>
