<template>
  <div
    class="dx-field-value misa-selectbox flex"
    :class="{ 'misa-input-required': error != '', tooltip: error != '' }"
    :data_title="error"
  >
    <div class="lable-input t-title-lable flex" v-if="lable">
      {{ lable }}
      <div v-if="required" :class="{ requiredField: required }">
        <span class="t-required"> &nbsp;(*)</span>
      </div>
    </div>
    <DxTagBox
      item-template="customItem"
      :data-source="dataSource"
      :class="[{ 'misa-input-required': error != '' }, classDropdownbox]"
      :display-expr="optionName"
      :value-expr="optionValue"
      :placeholder="placeholder"
      @option-changed="onOptionChange"
      :value="value"
      :width="width"
      :showDropDownButton="true"
      drop-down-button-template="iconDropdown"
      :tabIndex="tabindex"
      :searchEnabled="true"
      stylingMode="outlined"
      :validationStatus="isError"
      @focusOut="validateError"
      :opened="opened"
      @enterKey="handleEnterkey"
      @focusIn="handleFocusIn"
      :disabled="isDisable"
      :multiline="false"
    >
      <template #iconDropdown="{}">
        <div class="misa-icon misa-icon-dropdown misa-icon-24"></div>
      </template>
      <template #customItem="{ data }">
        <el-tooltip
          :content="data[optionName].toString()"
          placement="top"
          :hide-after="50"
        >
          <div>{{ data[optionName] }}</div>
        </el-tooltip>
      </template></DxTagBox
    >
  </div>
</template>
<script>
import DxTagBox from 'devextreme-vue/tag-box'

export default {
  components: {
    DxTagBox,
  },
  props: {
    /**Chiều rộng */
    width: {
      type: Number,
    },

    /**Chiều cao */
    height: {
      type: Number,
    },

    /**Tên class */
    classDropdownbox: {
      type: String,
      default: '',
    },

    /**Placholder */
    placeholder: {
      type: String,
      default: '',
    },
    /**Mảng data */
    dataSource: Object,

    /**Tên */
    optionName: {
      type: String,
      default: '',
    },

    /**Giá trị */
    optionValue: {
      type: String,
      default: '',
    },
    value: {
      type: Object,
    },

    /**Tabindex của popup */
    tabindex: {
      type: Number,
      default: -1,
    },
    /** lỗi của input trong trường required*/
    error: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    lable: {
      type: String,
      default: '',
    },
    /**Disable  */
    isDisable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**biến check lỗi của select tag box: không có lỗi - valid, có lỗi - invalid */
      isError: 'valid',
      opened: false,
    }
  },
  methods: {
    /** Mô tả: Gửi sự kiện khi có sự thay đổi giá trị
     * CreatedBy: PTTAM
     */
    onOptionChange(e) {
      if (e.name == 'selectedItems' && e.value.length > 0) {
        this.$emit('onOptionChange', e.value)
      }
      if (e.name == 'selectedItems' && e.value.length <= 0) {
        this.$emit('onOptionChange', [])
      }
    },
    /**
     * Mô tả : Focus vào input
     * @Createdby: PTTAM
     */
    autoFocus() {
      let input = this.$refs['dropdown'].$el.querySelector(
        '.dx-texteditor-input',
      )
      input.focus()
    },

    /** Mô tả: Sự kiện enter
     * CreatedBy: PTTAM
     */
    handleEnterkey() {
      this.opened = true
    },
    /** Mô tả: Gửi sự kiện focus
     * CreatedBy: PTTAM
     */
    handleFocusIn() {
      this.opened = true
      this.$emit('handleKeyupInput')
    },
    /** Mô tả: sự kiện focus out của select box
     * CreatedBy: PTTAM
     */
    validateError() {
      this.opened = false
      this.$emit('handleBlurInput')
    },
  },
}
</script>
<style scoped>
@import url(../../styles/components/dropdown-box.css);
@import url(../../styles/components/icon.css);
.drop-down.dx-show-invalid-badge.dx-tagbox.dx-selectbox.dx-textbox.dx-texteditor.dx-dropdowneditor-button-visible.dx-editor-outlined.dx-texteditor-empty.dx-widget.dx-tagbox-default-template.dx-dropdowneditor.dx-dropdowneditor-field-clickable.dx-invalid {
  border: 1px solid #f7453b;
  margin-bottom: 4px;
}

.drop-down-utc {
  width: 70%;
}
.lable-input {
  font-size: 14px;
  width: 30%;
  padding-top: 5px;
}
.tooltip:after {
  content: attr(data_title);
  background: #393a3d;
  position: absolute;
  color: #fff;
  width: auto;
  white-space: nowrap;
  padding: 0px 6px;
  font-size: 12px;
  height: 24px;
  z-index: 99;
  line-height: 24px;
  display: none;
  margin-top: -15px;
  margin-left: 40%;
  /* font-family: Notosans; */
  font-weight: 100;
}

.tooltip:hover:after {
  display: block;
}
</style>
