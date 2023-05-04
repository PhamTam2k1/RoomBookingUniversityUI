<template>
  <!-- Begin Paging -->
  <div class="misa-paging flex">
    <div class="paging-total">
      {{ Resource.Pagging.totalRecord }} <b>{{ totalRecord }}</b>
    </div>
    <div class="page-size-selector flex">
      <div class="page-size-infor">
        {{ Resource.Pagging.totalRecordOfPage }}
      </div>
      <div class="paging-dropdown">
        <BaseDropdownbox
          @onValueChange="selectedPageSize"
          classDropdownbox="dropdown-pageSize "
          :dataSource="pageSizes"
          :height="34"
          :width="80"
          optionName="Text"
          optionValue="Value"
          :value="pageSizes[0].Value"
        >
          <div class="misa-icon misa-icon-check misa-icon-24 mgl-8"></div
        ></BaseDropdownbox>
      </div>

      <div class="page-infor">
        <b>{{ startRecord }}</b> - <b>{{ endRecord }}</b> bản ghi
      </div>
    </div>
    <div class="pagingation">
      <el-pagination
        :page-size="selectedSize"
        :total="totalRecord"
        layout="prev, next"
        @current-change="changeCurrentPage"
        :current-page="currentPage"
      />
    </div>
  </div>
</template>
<style scoped>
@import url('../../styles/components/paging.css');
@import url('../../styles/components/icon.css');
.mgl-8 {
  margin-left: 8px;
  margin-bottom: 8px;
}
</style>

<script>
import Resource from '@/commons/Resource'
import BaseDropdownbox from './BaseDropdownbox.vue'
export default {
  components: {
    BaseDropdownbox,
  },
  data() {
    return {
      /**mảng chứa số bản ghi trên 1 trang */
      pageSizes: Resource.PageSizes,
      /**Bản ghi được chọn */
      selectedSize: 15,
      /**Object chứa resource */
      Resource: Resource,
    }
  },
  props: {
    /** tổng số bản ghi */
    totalRecord: {
      type: Number,
      required: true,
    },
    /** trang hiện tại*/
    currentPage: {
      type: Number,
      required: false,
    },
    /** trang hiện tại*/
    startRecord: {
      type: Number,
    },
    /** trang hiện tại*/
    endRecord: {
      type: Number,
    },
  },
  methods: {
    /**
     * Mô tả : Sự kiện select pageSize và gửi size đã chọn để tiến hành phân trang
     * @param {Object} option đối tượng pageSize khi chọn
     * @Createdby: PTTAM
     * Created date: 17:35 03/09/2022
     */
    selectedPageSize(option) {
      this.selectedSize = option
      this.$emit('pageSizeSelected', option)
    },
    /**
     * Mô tả : Gửi page đã chọn để tiến hành phân trang
     * @param {Number} val index phân trang
     * @Createdby: PTTAM
     * Created date: 17:36 03/09/2022
     */
    changeCurrentPage(val) {
      this.$emit('currentPage', val)
    },
  },
}
</script>
<style scoped>
.paging-dropdown {
  margin-top: 4px;
}
</style>
