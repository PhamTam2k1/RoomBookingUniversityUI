<template>
  <div class="div">
    <el-tooltip :disabled="disabled" :content="content" placement="top">
      <DxDateBox
        class="ms-date-box"
        :styling-mode="stylingMode"
        :label-mode="labelMode"
        :width="'100%'"
        drop-down-button-template="iconDropdown"
        :value="value"
        :display-format="displayFormat"
        placeholder="Chọn ngày và tháng"
        label="Tiêu đề"
        @value-changed="onValueChanged"
        :class="['ms-date-box', { errorDate: isError }]"
      >
        <template #iconDropdown="{}">
          <div class="icon-sibar icon-date misa-icon-24"></div>
        </template>
      </DxDateBox>
    </el-tooltip>
  </div>
</template>

<script>
import DxDateBox from 'devextreme-vue/date-box'
export default {
  name: 'MsDate',
  components: {
    DxDateBox,
  },
  props: {
    value: {
      type: [String, Date],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    labelMode: {
      type: String,
      required: false,
      default: 'static',
      note: 'mode hiển thị label ', // [ 'static', 'floating', 'hidden' ]
    },
    stylingMode: {
      type: String,
      required: false,
      default: 'outlined',
      note: 'mode hiển thị loại style datebox ', // [ 'outlined', 'filled', 'underlined' ]
    },

    displayFormat: {
      type: String,
      default: 'dd/MM/yyyy',
      note: 'mode hiển thị loại ngày datebox ',
    },
    isError: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {
    /**
     * khi giá trị datebox thay đổi
     * @param {*} e event thay đổi
     */
    onValueChanged(e) {
      this.$emit('onValueChanged', e)
    },
  },
}
</script>

<style lang="scss" scoped>
@import url(../../styles/components/dropdown-box.css);
@import url(../../styles/components/icon.css);
.icon-sibar.icon-date.misa-icon-24.dx-template-wrapper.dx-button-content {
  margin: 8px 0 0 5px;
}
.ms-date-box {
  border-radius: 3px;
  border: 1px solid var(--border-color);
  width: 150px !important;
}
.ms-date-box.errorDate {
  border: 1px solid #f7453b;
  width: 150px !important;
}
</style>
