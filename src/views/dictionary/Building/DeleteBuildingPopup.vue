<template>
  <BasePopup
    class="misa-dialog"
    titlePopup="Xóa tòa nhà"
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
        {{ Resource.Messenger.requestMsgDelete }} tòa
        <b> {{ buildingData.BuildingName }}</b>
        {{ Resource.Messenger.requestConfilmDelete }}
      </div>
    </template>
    <template #buttonPopup>
      <BaseButton
        @click="onClickAcceptDeleteUser"
        lableButton="Xóa"
        classButton="misa-button-normal w-80 misa-btn-danger"
      ></BaseButton>
    </template>
  </BasePopup>
</template>

<script>
import Resource from '@/commons/Resource'
import ObjectFunction from '@/commons/CommonFuction'
import BuildingApi from '@/apis/BuildingApi'
import BasePopup from '@/components/base/BasePopup.vue'
import BaseButton from '@/components/base/BaseButton.vue'
export default {
  components: {
    BasePopup,
    BaseButton,
  },
  props: {
    /**Đối tượng tòa nhà  */
    buildingData: {
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
    }
  },
  methods: {
    /** Mô tả: Gửi sự kiện đóng popup
     * @param
     * @return
     * CreatedBy: PTTAM
     */
    onClickClosePopup() {
      this.$emit('onClickClosePopup')
    },
    /** Mô tả: Sự kiện nhấn vào nút xóa tòa nhà
     * CreatedBy: PTTAM
     */
    async onClickAcceptDeleteUser() {
      try {
        let currentThis = this
        currentThis.$emit('onShowLoading') // hiển thị loading
        await BuildingApi.delete(currentThis.buildingData.BuildingID).then(
          () => {
            // toast thông báo xóa thành công
            ObjectFunction.toastMessage(
              'Xóa tòa nhà thành công',
              Resource.Messenger.Success,
            )
            currentThis.onClickClosePopup() // đóng popup
            currentThis.$emit('onLoadData') // load lại dữ liệu
          },
          (err) => {
            ObjectFunction.toastMessage(
              'Xóa tòa nhà thất bại',
              Resource.Messenger.Error,
            )
            console.log(err)
          },
        )
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
