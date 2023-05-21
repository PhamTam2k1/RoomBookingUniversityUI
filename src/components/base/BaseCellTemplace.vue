<template>
  <div class="wrap-text">
    <div @click="onClickShowPopupEdit(data.data[id])">
      <div
        :title="data.value"
        v-if="
          dataField != 'FullName' &&
          dataField != 'AdminName' &&
          dataField != 'SupporterName' &&
          (dataField != 'StatusBooking') & (dataField != '')
        "
        class="wrap-text"
      >
        {{ data.value }}
      </div>
      <div v-if="dataField == 'FullName'" :title="data.value">
        <div class="misa-full-name-avatar-table flex">
          <div
            class="misa-cell-avatar-color"
            :style="{ backgroundColor: data.data.AvartarColor }"
          >
            {{ CommonFunction.splitFullName(data.value) }}
          </div>
          <div class="misa-cell-FullName">{{ data.value }}</div>
        </div>
      </div>
      <div v-if="dataField == 'SupporterName'" :title="data.value">
        <div class="misa-full-name-avatar-table flex">
          <div
            class="misa-cell-avatar-color"
            :style="{ backgroundColor: data.data.AvartarSupporter }"
          >
            {{ CommonFunction.splitFullName(data.value) }}
          </div>
          <div class="misa-cell-FullName">{{ data.value }}</div>
        </div>
      </div>
      <div v-if="dataField == 'AdminName'" :title="data.value">
        <div class="misa-full-name-avatar-table flex">
          <div
            class="misa-cell-avatar-color"
            :style="{ backgroundColor: data.data.AvartarAdmin }"
          >
            {{ CommonFunction.splitFullName(data.value) }}
          </div>
          <div class="misa-cell-FullName">{{ data.value }}</div>
        </div>
      </div>
      <div v-if="dataField == 'StatusBooking'">
        <div class="misa-active-status-table flex">
          <div
            class="misa-cell-active-color"
            :style="{ backgroundColor: data.data.BookingStatusColor }"
          ></div>

          <div
            class="misa-cell-active-text"
            :style="{ color: data.data.BookingStatusColor }"
          >
            {{ data.data.BookingStatusName }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="dataField == 'Approve' && (isAdmin || isSupporter)">
      <div class="display-none">
        <div class="flex">
          <div class="misa-icon-style" title="Phê duyệt">
            <div
              @click="onClickShowPopupApprove(data.data[id])"
              class="icon-sibar icon-approve misa-icon-24"
            ></div>
          </div>
          <div class="misa-icon-style" title="Từ chối" v-if="isAdmin">
            <div
              @click="onClickShowPopupReject(data.data[id])"
              class="icon-sibar icon-reject misa-icon-24"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dataField == ''">
      <div class="display-none">
        <div class="flex">
          <div class="misa-icon-style" title="Sửa">
            <div
              @click="onClickShowPopupEdit(data.data[id])"
              class="misa-icon misa-icon-pencil misa-icon-24"
            ></div>
          </div>
          <div class="misa-icon-style" title="Xóa">
            <div
              @click="onClickShowPopupDelete(data.data[id], data.data.FullName)"
              class="misa-icon-navbar misa-icon-delete-custom misa-icon-24"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dataField == 'detail'">
      <div class="display-none">
        <div class="flex detail">
          <div @click="onClickShowPopupEdit(data.data[id])">Chi tiết</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonFunction from '@/commons/CommonFuction'

export default {
  components: {},
  data() {
    return {
      /**Tên trường */
      dataField: '',

      /**Object chứa các hàm dùng chung */
      CommonFunction: CommonFunction,
    }
  },
  props: {
    /**Dữ liệu  */
    data: Object,
    /**Tên */
    id: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isSupporter: {
      type: Boolean,
      default: false,
    },
    /**Giá trị */
    name: {
      type: String,
      default: '',
    },
  },
  methods: {
    /** Mô tả: Sự kiện click vào icon xóa
     * @param {string} id Mã người dùng
     * @param {string} name Tên người dùng
     * CreatedBy: PTTAM
     * Created Date: 02-09-2022 13:57:55
     */
    onClickShowPopupDelete(id, name) {
      this.$emit('onClickShowPopupDelete', id, name)
    },

    /** Mô tả: Sự kiện click vào icon sửa
     * @param
     * @return
     * CreatedBy: PTTAM
     * Created Date: 02-09-2022 13:59:04
     */
    onClickShowPopupEdit(id) {
      this.$emit('onClickShowPopupEdit', id)
    },
    /**
     * Mô tả: Sự kiện click vào icon approve
     * PTTAM2 09/04/2023
     */
    onClickShowPopupApprove(id) {
      this.$emit('onClickShowPopupApprove', id)
    },
    /**
     * Mô tả: Sự kiện click vào icon reject
     * PTTAM2 09/04/2023
     */
    onClickShowPopupReject(id) {
      this.$emit('onClickShowPopupReject', id)
    },
  },
  mounted() {
    this.dataField = this.data.column.dataField
  },
}
</script>
<style scoped>
@import url(../../styles/components/icon.css);
@import url(../../styles/components/table.css);
@import url(../../styles/components/dialog.css);
@import url(../../styles/components/avatarUser.css);

tr.dx-row.dx-data-row.dx-column-lines:hover .display-none {
  display: block !important;
}
.display-none {
  display: none;
}
.btn {
  text-decoration: none !important;
}
.approve {
  color: #4cae4c !important;
  padding-right: 5px !important;
}

.refuse {
  color: red !important;
}
.detail {
  color: rgb(10, 143, 143);
  font-style: italic;
}
.detail:hover {
  color: rgb(5, 80, 80);
  text-decoration: underline;
}
</style>
