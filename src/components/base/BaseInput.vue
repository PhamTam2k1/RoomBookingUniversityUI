<template>
  <div
    class="base-input"
    ref="title"
    :class="{
      'misa-input-required': error != '' && !isDisable,
      tooltip: error != '' && !isDisable,
    }"
    :data_title="error"
  >
    <div class="lable-input t-title-lable flex" v-if="lable">
      {{ lable }}
      <div v-if="required" :class="{ requiredField: required }">
        <span class="t-required"> &nbsp;*</span>
      </div>
    </div>
    <slot></slot>
    <input
      ref="input"
      :type="type"
      :class="classInput"
      :placeholder="placeholder"
      :value="modelValue"
      @input="input"
      :tabindex="tabindex"
      @blur="handleBlur"
      @keyup="handleKeyup"
      :maxlength="maxlength"
      :disabled="isDisable"
    />
  </div>
</template>

<script>
import Resource from '@/commons/Resource'
import CommonFunction from '@/commons/CommonFuction'

export default {
  emits: ['update:modelValue', 'handleBlurInput', 'handleKeyupInput'],
  props: {
    /**placholder của input */
    placeholder: {
      type: String,
      default: '',
    },
    /**biến focus*/
    focus: Boolean,

    /**giá trị của input */
    modelValue: {
      type: [String, Number],
    },

    /**Tên class của input */
    classInput: {
      type: String,
      default: '',
    },
    tabindex: {
      type: Number,
      default: -1,
    },
    /**required các trường input bắt buộc */
    required: {
      type: Boolean,
      default: false,
    },
    /** lỗi của input trong trường required*/
    error: {
      type: String,
      default: '',
    },
    /**Chiều dài max */
    maxlength: {
      type: Number,
    },
    lable: String,
    /**Viết hoa  */
    isCapitaLable: {
      type: Boolean,
      default: false,
    } /**Viết hoa  */,
    isDisable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: [String, Number],
      default: 'text',
      validator: (value) =>
        ['text', 'number', 'password'].includes(value.toLowerCase()),
    },
  },
  data() {
    return {
      /** true: hiiển thị tooltip, false: ẩn tooltip */
      isTooltip: false,

      /**Object chứa Resource */
      Resource: Resource,

      /**Biến check lỗi require để add classs */
      isErrorInputReqired: false,

      /**Biến check lỗi để hiển thị dòng lỗi ở dưới input */
      isError: false,

      /**Object chứa các hàm dùng chung */
      CommonFunction: CommonFunction,
    }
  },
  methods: {
    /** Mô tả: Gửi giá trị của input
     * CreatedBy: PTTAM
     * Created Date: 09-09-2022 08:26:02
     */
    input(event) {
      if (this.isCapitaLable) {
        event.target.value = CommonFunction.memberCasingText(event.target.value)
      }
      this.$emit('update:modelValue', event.target.value)
    },

    /**
     * Mô tả : Sự kiện blur bắt lỗi các trường bắt buộc nhập
     * @Createdby: PTTAM
     * Created date: 08:25 03/09/2022
     */
    handleBlur() {
      this.$emit('handleBlurInput')
    },
    /** Mô tả: Sự kiện keyup xóa lỗi
     * CreatedBy: PTTAM
     * Created Date: 14-09-2022 19:17:54
     */
    handleKeyup() {
      this.$emit('handleKeyupInput')
    },
    /**
     * Mô tả : Focus vào input
     * @Createdby: PTTAM
     */
    autoFocus() {
      this.$refs['input'].focus()
    },
  },
  watch: {
    /** Mô tả: Thei dõi focus của input
     * CreatedBy: PTTAM
     * Created Date: 09-09-2022 08:27:11
     */
    focus() {
      this.$refs.input.focus()
    },
  },
  mounted() {
    if (this.focus) this.$refs.input.focus()
  },
}
</script>
<style scoped>
@import url('../../styles/components/input.css');
.base-input {
  display: flex;
}

.t-input-required {
  border: 1px solid #ff4747 !important ;
}
.t-required {
  color: #ff4747;
}

/* .misa-input {
  width: 70%;
} */
.lable-input {
  width: 30%;
  padding-top: 5px;
  font-size: 14px;
  white-space: nowrap;
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
.misa-input:disabled {
  color: #585959;
  background-color: #f5f5f5;
}
.tooltip:hover:after {
  display: block;
}
</style>
