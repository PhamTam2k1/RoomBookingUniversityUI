import { ElMessage } from 'element-plus'
const CommonFunction = Object.freeze({
  /** Mô tả: Thực hiên lấy mã màu ngẫu nhiên
   * @return {string} mã màu
   * CreatedBy: PTTAM
   * Created Date: 04-09-2022 23:30:11
   */
  generateRandomColor() {
    let maxVal = 0xffffff // 16777215
    let randomNumber = Math.random() * maxVal
    randomNumber = Math.floor(randomNumber)
    randomNumber = randomNumber.toString(16)
    let randColor = randomNumber.padStart(6, 0)
    return `#${randColor.toUpperCase()}`
  },

  /** Mô tả: Thực hiện tách chuỗi lấy 2 kí tự
   * @param {string} fullName Tên người dùng
   * @return {string} 2 kí tự
   * CreatedBy: PTTAM
   * Created Date: 04-09-2022 23:30:58
   */
  splitFullName(fullName) {
    if (fullName) {
      fullName = fullName.trim()
      var firstName = fullName.split(' ').slice(0, -1).join(' ')
      var lastName = fullName.split(' ').slice(-1).join(' ')
      if (firstName == '') return fullName[0]
      return firstName[0] + lastName[0]
    }
  },

  /**
   * Mô tả : Chuẩn hóa bảng ASCII sang NFD
   * @param {input} - chuỗi nhập vào
   * @return
   * @Createdby: PTTAM
   * Created date: 00:03 12/09/2022
   */
  normalizeString(input) {
    return input
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
  },
  /**
   * Mô tả : Thực hiện toast dữ liệu
   * @param {message} --nội dung của toast msg
   * @param {type}  -- kiểu của toast msg
   * @Createdby: PTTAM
   * Created date: 10:21 02/09/2022
   */
  toastMessage(message, type) {
    ElMessage({
      message: message,
      type: type,
      duration: 3000,
    })
  },
  // value.replace(/[A-Za-z-]+/g, '')

  sortArray(array, field) {
    return array.sort((a, b) => {
      let fa = a[field].toLowerCase(),
        fb = b[field].toLowerCase()

      if (fa > fb) {
        return -1
      }
      if (fa < fb) {
        return 1
      }
      return 0
    })
  },
  /**
   * Mô tả : Validate Email
   * @param {email} - email
   * @return true: email đúng định dang, false: email sai định dạng
   * @Createdby: PTTAM
   * Created date: 18:56 30/08/2022
   */
  validateEmail(email) {
    /* eslint-disable */

    if (
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)
    )
      return true

    return false
  },
})
export default CommonFunction
