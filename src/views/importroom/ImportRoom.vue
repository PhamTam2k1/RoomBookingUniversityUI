<template>
  <base-popup
    class="misa-dialog"
    titlePopup="Nhập khẩu lịch học"
    classPopup="popup-import-scheduler"
    @onClickClosePopup="onClickClosePopup"
  >
    <template #iconPopup>
      <el-tooltip content="Đóng" placement="top">
        <div class="misa-icon-popup" @click="onClickClosePopup">
          <div class="misa-icon1 misa-icon-close misa-icon-24"></div>
        </div>
      </el-tooltip>
    </template>
    <template #contentPopup>
      <div class="import-container">
        <div class="popup-content">
          <div class="step-container" id="pnStep">
            <div class="step-area">
              <div
                class="step-item"
                :class="{ active: step == 1 }"
                data-step="1"
              >
                <div class="prc-icon">
                  <div class="step-number">1</div>
                </div>
              </div>
              <div class="line-space"></div>
              <div
                class="step-item"
                :class="{ active: step == 2 }"
                data-step="2"
              >
                <div class="prc-icon">
                  <div class="step-number">2</div>
                </div>
              </div>
              <div class="line-space"></div>
              <div
                class="step-item"
                :class="{ active: step == 3 }"
                data-step="3"
              >
                <div class="prc-icon">
                  <div class="step-number">3</div>
                </div>
              </div>
            </div>
            <div class="step-info">
              <div class="step-info-item" data-step="1" v-show="step == 1">
                <div class="title">Bước 1: Chọn tệp nguồn</div>
                <div class="detail">
                  Đưa dữ liệu cần nhập khẩu vào tệp mẫu và tải tệp dữ liệu lên
                  chương trình
                </div>
              </div>
              <div class="step-info-item" data-step="2" v-show="step == 2">
                <div class="title">Bước 2: Kiểm tra dữ liệu</div>
                <div class="detail">
                  Kiểm tra dữ liệu tệp nhập khẩu tải lên chương trình
                </div>
              </div>
              <div class="step-info-item" data-step="3" v-show="step == 3">
                <div class="title">Bước 3: Kết quả nhập khẩu</div>
                <div class="detail">
                  Kết quả nhập khẩu dữ liệu lên chương trình
                </div>
              </div>
            </div>
          </div>
          <div class="content-container" id="pnContent">
            <div class="content-state p-absolute-0">
              <div
                class="step-content step-one"
                data-step="1"
                v-show="step == 1"
              >
                <div class="choose-container p-absolute-0">
                  <div class="choose-state">
                    <div class="state-left">
                      <div class="wrap-title">
                        <div class="title-large">Tải tệp mẫu</div>
                      </div>
                      <div class="suggest-container">
                        <div class="content">
                          <div class="ic-download-template"></div>
                          <div style="text-align: center; font-style: italic">
                            Bạn chưa có tệp mẫu, vui lòng tải
                          </div>
                          <div
                            class="text-download"
                            id="btnDownTempFile"
                            title="Bấm vào đây để tải tệp"
                          >
                            <a
                              href=" https://mily.misa.vn/download-file-nhap-khau"
                              download="NhapKhau.xlsx"
                              >NhapKhau.xlsx</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="state-right">
                      <div class="wrap-title">
                        <div class="title-large">Đính kèm tệp</div>
                        <div class="suggest-file">
                          <div class="size">Dung lượng tối đa 2MB</div>
                        </div>
                      </div>
                      <div class="container-import" id="areaImportFile">
                        <div class="drop-file p-absolute-0">
                          <div class="bg-icon"></div>
                          <div
                            class="text-file"
                            id="ctnImportFile"
                            v-show="!fileUpload"
                          >
                            <span class="up-file text-link">
                              Tải lên tệp
                              <input
                                type="file"
                                class="txt-file-import p-absolute-0"
                                id="txtFileImport"
                                title="Chọn file đính kèm"
                                @change="uploadFileImport"
                              />
                            </span>
                            hoặc kéo thả tệp dữ liệu cần nhập khẩu vào đây
                          </div>
                        </div>
                        <div
                          class="import-file p-absolute-0"
                          v-show="fileUpload"
                        >
                          <div class="file-item">
                            <div class="text-link-style">
                              {{ fileUpload?.name }}
                            </div>
                            <div
                              class="delete-file"
                              @click="deleteFileUpload"
                            ></div>
                          </div>
                        </div>
                        <div
                          class="wrap-notify noti-success"
                          v-show="showSucces"
                        >
                          <div
                            class="toastr-notify toastr-success d-flex justify-content-sm-between"
                          >
                            <div class="left-toastr d-flex align-items-center">
                              <div
                                class="icon-toastr misa-icon ic-success-toastr"
                              ></div>
                              <div class="">Tải lên thành công</div>
                            </div>
                            <div
                              class="icon-close-toastr align-self-center misa-icon ic-close-toastr"
                              @click="this.showSucces = null"
                            ></div>
                          </div>
                        </div>
                        <div class="wrap-notify noti-error" v-show="showError">
                          <div
                            class="toastr-notify toastr-error d-flex justify-content-sm-between"
                          >
                            <div class="left-toastr d-flex align-items-center">
                              <div
                                class="icon-toastr misa-icon ic-error-toastr"
                              ></div>
                              <div class="align-self-center">
                                Tải tệp mẫu không đúng định dạng
                              </div>
                            </div>
                            <div
                              class="icon-close-toastr align-self-center misa-icon ic-close-toastr"
                              @click="this.showError = null"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="step-content step-two"
                data-step="2"
                v-show="step == 2"
              >
                <div class="checking-container p-absolute-0">
                  <div class="wrap-container p-absolute-0">
                    <div class="fixed-column-left">
                      <div class="wrap-record mg-bt-20">
                        <div
                          class="wrap-icon misa-icon ic-status-record ic-invalid"
                        ></div>
                        <div class="invalid-record record-text">
                          <span class="total-invalid">{{ successImport }}</span>
                          <span>&nbsp;</span> bản ghi hợp lệ
                        </div>
                      </div>
                      <!-- <div class="wrap-record mg-bt-20">
                        <div
                          class="wrap-icon misa-icon ic-status-record ic-has-data"
                        ></div>
                        <div class="hasdata-record record-text">
                          <span class="total-exits">0</span>
                          <span>&nbsp;</span> bản ghi đã có dữ liệu
                        </div>
                      </div> -->
                      <div class="wrap-record">
                        <div
                          class="wrap-icon misa-icon ic-status-record ic-valid"
                        ></div>
                        <div class="valid-record record-text">
                          <span class="total-valid">{{ errorImport }}</span>
                          <span>&nbsp;</span> bản ghi không hợp lệ
                        </div>
                      </div>
                      <!-- <div class="download-file">
                        <div class="d-flex justify-content-end">
                          <div
                            class="d-flex download-link text-link"
                            id="btnDownFileChecking"
                          >
                            <div
                              class="ic-download misa-icon"
                              style="margin-right: 8px"
                            ></div>
                            <span>Tải tệp kiểm tra </span>
                          </div>
                          <span>&nbsp;</span>
                          <span>để xem chi tiết lỗi</span>
                        </div>
                      </div> -->
                    </div>
                    <div class="fixed-column-right">
                      <div class="total-record">
                        <span>
                          <span class="text-bold" id="totalErrorData">{{
                            errorCount
                          }}</span>
                          bản ghi lỗi </span
                        >/
                        <span
                          >Tổng số:
                          <span class="text-bold" id="totalCompareData">{{
                            sumaryData
                          }}</span>
                          bản ghi
                        </span>
                      </div>
                      <div class="grid-list grid-list-container">
                        <DxDataGrid
                          id="gridContainer"
                          :data-source="dataSource"
                          key-expr="Error"
                          :show-borders="true"
                          noDataText="Không có dữ liệu"
                        >
                          <DxColumn data-field="Error" caption="TÌNH TRẠNG" />
                          <DxColumn
                            data-field="DescriptionError"
                            caption="CHI TIẾT LỖI"
                          />
                          <DxScrolling mode="infinite" />
                          <DxPaging :enabled="false" />
                        </DxDataGrid>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="step-content step-three"
                data-step="3"
                v-show="step == 3"
              >
                <div class="result-container p-absolute-0">
                  <div class="wrap-image">
                    <img src="../../assets/images/not-released.png" />
                  </div>
                  <div class="record-container">
                    <div>
                      <div class="wrap-record" style="margin-bottom: 20px">
                        <div
                          class="wrap-icon misa-icon ic-status-record ic-invalid"
                        ></div>
                        <div class="invalid-record record-text">
                          <span class="valid-total"
                            >{{ successCount }}/{{ sumaryData }}</span
                          >
                          <span>&nbsp;</span> bản ghi nhập thành công
                        </div>
                      </div>
                      <!-- <div class="wrap-record">
                        <div
                          class="wrap-icon misa-icon ic-status-record ic-valid"
                        ></div>
                        <div class="valid-record record-text">
                          <span class="not-valid-total"
                            >{{
                              successCount == 0 ? sumaryData : successCount
                            }}/{{ sumaryData }}</span
                          >
                          <span>&nbsp;</span> bản ghi nhập không thành công
                        </div>
                      </div> -->
                      <!-- <div class="download-file">
                        <div class="d-flex justify-content-end">
                          <div
                            class="d-flex download-link text-link"
                            id="btnDownFileResult"
                          >
                            <div
                              class="ic-download misa-icon"
                              style="margin-right: 8px"
                            ></div>
                            <span>Tải tệp kiểm tra </span>
                          </div>
                          <span>&nbsp;</span>
                          <span> để xem chi tiết lỗi</span>
                        </div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="popup-footer d-flex justify-content-between">
          <div class="footer-left">
            <DxButton
              text="Quay lại"
              v-show="step != 1"
              style="width: 90px"
              @click="backStep"
            />
          </div>
          <div class="footer-right">
            <DxButton
              text="Tiếp tục"
              style="
                width: 90px;
                color: #fff !important;
                background-color: #337ab7;
              "
              @click="nextStep"
            />
          </div>
        </div>
      </div>
    </template>
  </base-popup>
  <BaseLoading :isShowLoading="isShowLoading"></BaseLoading>
</template>

<script>
/* eslint-disable */
import { DxPopup, DxPosition, DxToolbarItem } from 'devextreme-vue/popup'
import notify from 'devextreme/ui/notify'
import { DxButton } from 'devextreme-vue/button'
import axios from 'axios'
import BasePopup from '@/components/base/BasePopup.vue'
import ObjectFunction from '@/commons/CommonFuction'
import Resource from '@/commons/Resource'
import {
  DxDataGrid,
  DxScrolling,
  DxColumn,
  DxPaging,
} from 'devextreme-vue/data-grid'
import BaseLoading from '@/components/base/BaseLoading.vue'
export default {
  components: {
    DxPopup,
    DxPosition,
    DxToolbarItem,
    DxButton,
    DxDataGrid,
    DxScrolling,
    DxColumn,
    DxPaging,
    BasePopup,
    BaseLoading,
  },
  props: {
    isShowPopupImport: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dataSource: [],
      step: 1,
      fileUpload: null,
      showSucces: null,
      showError: null,
      errorCount: 0,
      successCount: 0,
      sumaryData: 0,
      isSuccess: true,
      isShowLoading: false,
    }
  },

  methods: {
    /**
     * Next
     */
    async nextStep() {
      if (this.fileUpload) {
        if (this.step < 5) {
          this.step++
        }
        switch (this.step) {
          case 2:
            this.isShowLoading = true
            const formData = new FormData()
            formData.append('file', this.fileUpload)
            const response = await axios.post(
              'http://34.96.176.17:8888/api/v1/BookingRooms/excel',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            )
            this.dataSource = response.data.Data
            this.errorCount = this.dataSource.length
            this.sumaryData = response.data.Count
            if (response.data.IsSuccess) {
              this.successCount = this.sumaryData
              this.isShowLoading = false
              ObjectFunction.toastMessage(
                'Nhập khẩu thành công',
                Resource.Messenger.Success,
              )
              this.$emit('onLoadData')
            } else {
              this.isShowLoading = false
              this.isSuccess = false
            }
            break
          case 4:
            this.isShowLoading = false
            this.$emit('onCloseForm')

            break
          default:
            break
        }
      } else {
        notify(
          {
            message: `Chưa tải lên file nhập khẩu!`,
            width: 270,
          },
          'error',
          2000,
        )
      }
    },
    /**
     * Back
     */
    backStep() {
      if (this.step > 1) {
        this.step--
      }
    },
    /**
     * Xử lý khi upload File
     */
    uploadFileImport(e) {
      let file = e.target.files
      if (file) {
        this.fileName = file[0].name
        this.validateFile(file[0])
      }
    },
    /**
     * Validate file
     */
    validateFile(file) {
      const allowedTypes = ['xlsx', 'xls']
      const maxSize = 2 * 1024 * 1024 // 2MB
      if (!allowedTypes.includes(this.getFileExtension(file.name))) {
        this.showError = true
        this.showSucces = false
      } else if (file.size > maxSize) {
        notify(
          {
            message: `Kích thước file vượt quá 2MB`,
            width: 270,
          },
          'error',
          2000,
        )
        this.showError = true
        this.showSucces = false
        return false
      } else {
        this.fileUpload = file
        this.showSucces = true
        this.showError = false
      }
    },
    /**
     * Xóa file đã upload
     */
    deleteFileUpload() {
      this.showSucces = null
      this.showError = null
      this.fileUpload = null
    },
    /**
     * Get file Extension
     */
    getFileExtension(filename) {
      return filename.split('.').pop()
    },
    /**
     * Đóng Popup
     */
    onClickClosePopup() {
      this.$emit('onCloseForm')
    },
  },
  computed: {
    errorImport() {
      return this.errorCount
    },
    successImport() {
      return this.successCount
    },
  },
}
</script>
<style lang="scss" scoped>
/*Style nhập khẩu*/
.p-absolute-0 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.misa-icon {
  background: url(../../assets/images/misa-bm_icon_sprites.svg) center no-repeat;
}
.ic-invalid {
  background-position: -215px -276px;
}
.misa-icon.ic-status-record.ic-has-data {
  background-position: -251px -276px;
}
.misa-icon.ic-status-record.ic-valid {
  background-position: -178px -276px;
}
.misa-icon.ic-close-toastr {
  background-position: -316px -76px;
  width: 16px;
  height: 16px;
}
.misa-icon.ic-success-toastr {
  background-position: -292px -148px;
  width: 16px;
  height: 16px;
}
.misa-icon.ic-error-toastr {
  background-position: -292px -220px;
  width: 16px;
  height: 16px;
}
.align-items-center {
  align-items: center !important;
}
.align-self-center {
  align-self: center !important;
}
.d-flex {
  display: flex;
}
.justify-content-end {
  justify-content: flex-end !important;
}
.justify-content-sm-between {
  justify-content: space-between !important;
}
.import-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  // box-shadow: rgba(0, 0, 0, 0.4) -1px 3px 10px;
  padding: 0 !important;
  background-color: #fff !important;
}
.popup-content {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;

  width: 80vw;
  height: 78vh;

  padding: 16px 20px 20px;
  overflow: auto;
  .step-container {
    height: 190px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
  }
  .step-info {
    text-align: center;
    .step-info-item {
      .title {
        font-size: 31px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .detail {
        font-size: 20px;
      }
    }
  }
  .step-area {
    margin: auto;
    display: flex;
    .step-item {
      text-align: center;
      min-width: 150px;
      max-width: 150px;
      z-index: 1;
      .prc-icon {
        height: 60px;
        width: 60px;
        margin: auto;
        border-radius: 50%;
        background: #fff;
        margin-bottom: 10px;
        border: 1px solid #f5f5f5;
        background-color: #e0e0e0;
        .step-number {
          color: #fff;
          font-family: Roboto-Medium;
          font-size: 35px;
          font-weight: 900;
          vertical-align: middle;
          height: 50px;
          line-height: 57px;
        }
      }
      .prc-text {
        color: #212529;
      }
    }
    .step-item.active {
      .prc-icon {
        border: 2px solid #337ab7;
        background-color: #fff;
        .step-number {
          color: #337ab7;
        }
      }
    }
    .step-item.done {
      .prc-icon {
        background: #337ab7;
        .step-number {
          color: transparent;
          height: 12px;
          width: 8px;
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          margin: 16px 0px 0px 20px;
          transform: rotate(225deg);
        }
      }
      + {
        .line-space {
          background: #337ab7;
        }
      }
    }
    .line-space {
      height: 2px;
      width: 120px;
      background: #f5f5f5;
      margin: 25px -45px 0 -45px;
    }
  }
  #pnContent {
    position: relative;
    flex: 1;
  }
  .content-state {
    .step-content {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: #fff;
    }
    .step-content.active {
      display: block !important;
      z-index: 3;
    }
    .choose-container {
      display: flex;
      margin: auto;
      .choose-state {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
      }
      .suggest-container {
        border: 1px solid #e0e0e0;
        width: 376px;
        padding: 20px;
        height: 200px;
        .content {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          flex-direction: column;
          .ic-download-template {
            background: url('../../assets../../assets/images/Icon_BusmasBBN.svg')
              center no-repeat;
            width: 48px;
            height: 48px;
            background-position: 2px -480px;
            margin-bottom: 8px;
            filter: invert(46%) sepia(100%) saturate(2147%) hue-rotate(182deg)
              brightness(70%) contrast(85%);
          }
          #btnDownTempFile {
            text-align: center;
            cursor: pointer;
            color: #429df2;
            font-style: italic;
          }
        }
        .step-tutorial {
          display: flex;
          margin-bottom: 20px;
          .icon-step {
            align-self: center;
            margin-right: 20px;
          }
          .text-tutorial {
            .text-download {
              color: #429df2;
              cursor: pointer;
            }
          }
        }
      }
      .state-left {
        margin-right: 32px;
      }
      .state-right {
        .wrap-title {
          display: flex;
          justify-content: space-between;
        }
      }
      .suggest-file {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-style: italic;
        .template-file {
          display: flex;
          align-items: center;
          cursor: pointer;
          .icon {
            width: 22px;
            height: 24px;
            // background: url("../../assets../../assets/images/misa-bm_icon_sprites.svg") center no-repeat;
            background-position: -313px -144px;
            margin-right: 8px;
            filter: invert(46%) sepia(100%) saturate(2147%) hue-rotate(182deg)
              brightness(70%) contrast(85%);
          }
        }
      }
      .container-import {
        width: 700px;
        height: 200px;
        border: 1px dashed #e0e0e0;
        font-size: 15px;
        color: #373737;
        position: relative;
        .wrap-notify {
          // display: none;
        }
        .toastr-notify {
          position: absolute;
          width: 100%;
          height: 36px;
          color: #fff;
          font-size: 13px;
          border-radius: 4px;
          padding: 0 10px 0 20px;
          .icon-toastr {
            margin-right: 16px;
          }
          .icon-close-toastr {
            cursor: pointer;
          }
        }
        .toastr-success {
          background-color: #15ab15;
          z-index: 2;
        }
        .toastr-error {
          background-color: #ff5252;
        }
        .drop-file {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .up-file {
          position: relative;
          width: 90px;
          color: #429df2;
          cursor: pointer;
          .txt-file-import {
            opacity: 0;
            width: 100%;
            cursor: pointer;
          }
        }
        .text-file {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          text-align: center;
        }
        .bg-icon {
          background: url('../../assets../../assets/images/Icon_BusmasBBN.svg')
            center no-repeat;
          width: 48px;
          height: 48px;
          background-position: -148px -480px;
          margin-bottom: 8px;
          filter: invert(46%) sepia(100%) saturate(2147%) hue-rotate(182deg)
            brightness(70%) contrast(85%);
        }
        .import-file {
          padding: 15px;
        }
        .file-item {
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          .file-icon {
            margin-right: 18px;
            width: 30px;
            min-width: 30px;
            height: 32px;
            background: url('../../assets/images/misa-bm_icon_sprites.svg')
              center no-repeat;
            background-position: -76px -243px;
            filter: invert(46%) sepia(100%) saturate(2147%) hue-rotate(182deg)
              brightness(70%) contrast(85%);
          }
          .delete-file {
            width: 19px;
            min-width: 19px;
            height: 20px;
            background: url('../../assets/images/misa-bm_icon_sprites.svg')
              center no-repeat;
            background-position: -291px -74px;
            cursor: pointer;
            margin-left: 18px;
          }
        }
      }
    }
    .text {
      font-size: 13px;
      color: #373737 !important;
    }
    .text-bold {
      font-weight: 700;
      color: #333333;
    }
    .text-link {
      color: #429df2;
    }
    .title-large {
      font-size: 20px;
      font-weight: 700;
      color: #333333;
    }
    .title-normal {
      font-size: 18px;
      font-weight: 700;
      color: #333333;
      margin-bottom: 20px;
    }
    .row-content {
      display: flex;
    }
    .m-lr-20px {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
  .pairing-container {
    margin: 0 130px;
    .fixed-column-left {
      min-width: 214px;
      max-width: 310px;
      margin-right: 20px;
      .title-parring {
        span {
          font-size: 18px;
          color: #454f63;
          font-weight: bold;
        }
      }
      .ic-search {
        background: url('../../assets../../assets/images/misa-bm_icon_sprites.svg')
          center no-repeat;
        background-position: -28px -4px;
        position: absolute;
        width: 16px;
        height: 16px;
        margin: 8px;
        right: 0;
      }
    }
  }
  .wrap-container {
    display: flex;
    bottom: 15px;
  }
  .checking-container {
    left: 15px;
    right: 15px;
    .fixed-column-left {
      min-width: 285px;
      max-width: 350px;
      margin-right: 20px;
      padding-top: 27px;
    }
    .fixed-column-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
    }
  }
  .wrap-record {
    height: 64px;
    border: 1px solid #dee2e6;
    display: flex;
    padding: 0 16px;
    font-size: 18px;
    font-weight: bold;
    .invalid-record {
      color: #33b369;
    }
    .valid-record {
      color: #ff7575;
    }
    .hasdata-record {
      color: #ffcb62;
    }
    .record-text {
      display: flex;
      line-height: 62px;
      white-space: nowrap;
    }
    .wrap-icon {
      margin-right: 16px;
      width: 37px;
      height: 36px;
      align-self: center;
    }
  }
  .wrap-record.mg-bt-20 {
    margin-bottom: 20px;
  }
  .download-file {
    margin-top: 8px;
    .download-link {
      font-style: italic;
      cursor: pointer;
    }
    .ic-download {
      width: 20px;
      height: 20px;
      background: url('../../assets../../assets/images/Icon_BusmasBBN.svg')
        center no-repeat !important;
      background-position: -49px -363px !important;
    }
  }
  .result-container {
    padding: 0 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    .wrap-image {
      display: flex;
      align-items: center;
      margin-right: 60px;
    }
  }
  .grid-list-container {
    flex: 1;
    padding: 0 !important;
    position: absolute;
    top: 27px;
    left: 0;
    right: 0;
    bottom: 0;
    tr {
      th.requeried {
        .th-inner {
          &:after {
            content: '';
            width: 14px;
            height: 19px;
            background: url('../../assets../../assets/images/misa-bm_icon_sprites.svg')
              center no-repeat;
            background-position: -317px -99px;
            display: block;
          }
        }
      }
    }
    .fixed-table-container {
      border: 1px solid #dee2e6 !important;
    }
    .fixed-table-header {
      border-top: none !important;
    }
    .fixed-table-border {
      display: none;
    }
    td.col-medium {
      background-color: #f5f5f5;
    }
  }
  .text-link-style {
    color: #429df2;
    font-style: italic;
  }
}
.popup-footer {
  position: relative;
  height: 65px;
  padding: 18px 0px;
  display: flex;
  justify-content: space-between;
  z-index: 100;
}
.text-valid {
  color: #33b369;
}
.text-exits {
  color: #ffcb62;
}
.text-not-valid {
  color: #ff7575;
}
#gridContainer {
  height: 300px;
}
// @import url(../../styles/components/import.scss);
</style>
