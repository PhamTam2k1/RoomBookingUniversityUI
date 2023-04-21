<template>
  <div class="button">
    <div :class="iconButton" v-if="iconButton"></div>
    <button
      class="misa-button"
      :class="classButton"
      :tabindex="tabindex"
      :disabled="disabled"
      ref="button"
    >
      <div class="misa-button-text">{{ lableButton }}</div>
    </button>
  </div>
</template>
<style scoped>
@import url('../../styles/components/button.css');
</style>
<script>
export default {
  props: {
    /**Nhãn của button */
    lableButton: {
      type: String,
      default: '',
    },

    /**Tên class icon của button */
    iconButton: {
      typeo: String,
      default: '',
    },

    /**Tên class của button */
    classButton: {
      type: String,
      default: '',
    },

    /**Tabindex của button */
    tabindex: {
      type: Number,
      default: -1,
    },

    /**Thuộc tính disable */
    disabled: {
      type: Boolean,
      default: false,
    },

    // Khởi tạo focus
    initFocus: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.initFocus) {
      this.$refs.button.focus()
    }
  },
}
</script>
