<template>
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
  >
    <DxValidator>
      <DxRequiredRule />
    </DxValidator>
    <template #iconDropdown="{}">
      <div class="icon-sibar icon-date misa-icon-24"></div>
    </template>
  </DxDateBox>
</template>

<script>
import { DxValidator, DxRequiredRule } from 'devextreme-vue/validator'
import DxDateBox from 'devextreme-vue/date-box'
export default {
  name: 'MsDate',
  components: {
    DxDateBox,
    DxValidator,
    DxRequiredRule,
  },
  props: {
    value: {
      type: [String, Date],
      default: null,
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
</style>
