<template>
  <div
    class="div flex"
    :data_title="data_title"
    :class="{ tooltip: isTooltip }"
  >
    <div class="lable-input t-title-lable flex" v-if="lable">
      {{ lable }}
      <div v-if="required" :class="{ requiredField: required }">
        <span class="t-required"> &nbsp;(*)</span>
      </div>
    </div>
    <el-date-picker
      class="date"
      @change="changeDate"
      type="date"
      format="DD/MM/YYYY"
      placeholder="DD/MM/YYYY"
      size="default"
      v-model="valueDate"
      @blur="validateBlur"
      :class="{ error: isErrorDate }"
      :tabindex="tabindex"
      ref="date"
      :picker-options="{ disabledDate: disabledDate }"
    />
  </div>
</template>
<style scoped>
@import url(../../styles/components/date-picker.css);
</style>
<script>
export default {
  props: {
    modelValue: {
      // giá trị của input
      type: [String, Date],
    },
    data_title: {
      // title của input
      type: String,
      default: '',
    },
    errMsg: {
      // lỗi của input trong trường required
      type: String,
      default: '',
    },
    tabindex: {
      // tabindex của input
      type: Number,
    },
    lable: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabledDate: {
      type: Function,
      required: true,
    },
  },
  watch: {
    /**
     * Mô tả : Theo dõi sự thay đổi giá trị của ngày
     * @param {Date} valNew Ngày sinh
     * Created by: PTTAM
     * Created date: 16:47 21/08/2022
     */
    modelValue(valNew) {
      this.valueDate = valNew
    },
  },
  data() {
    return {
      /** giá trị ngày */
      valueDate: '',

      /**true: thêm border đỏ vào input, false: ngược lại*/
      isErrorDate: false,

      /**true: hiiển thị tooltip, false: ẩn tooltip*/
      isTooltip: false,
    }
  },
  methods: {
    /**
     * Mô tả : Sự kiện change: khi thay đổi ngày
     * @param
     * @return
     * Created by: PTTAM
     * Created date: 16:48 21/08/2022
     */
    changeDate() {
      this.isErrorDateInput(false)
      this.autoFocus()
      this.$emit('change-date', this.valueDate)
    },

    /**
     * Mô tả : Hàm focus vào input date
     * @param
     * @return
     * Created by: PTTAM
     */
    autoFocus() {
      this.$refs.date.focus()
    },

    /**
     * Mô tả : Hàm validate blur của input date
     * @param
     * @return
     * Created by: PTTAM
     */
    validateBlur() {
      // if (!Common.validateDate(this.modelValue)) {
      //   this.isErrorDateInput(true);
      // } else {
      //   this.isErrorDateInput(false);
      // }
    },
    /**
     * Mô tả : Hàm thêm hoặc xóa error
     * @param {Boolean} isErr -- true: thêm lỗi, false: xóa lỗi
     * Created by: PTTAM
     */
    isErrorDateInput(isErr) {
      this.isErrorDate = isErr
      this.isTooltip = isErr
    },
  },
}
</script>
<style scoped>
.t-required {
  color: #ff4747;
}

.date {
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
