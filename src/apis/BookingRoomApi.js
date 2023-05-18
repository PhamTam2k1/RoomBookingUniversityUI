import BaseAPIConfig from './BaseApiConfig'

class BookingRoomAPI {
  controller = 'BookingRooms'

  /**
   * Mô tả : Lấy toàn bộ dữ liệu phòng ban từ api
   * @Createdby: PTTAM
   * Created date: 21:33 1/09/2022
   */
  getAll() {
    return BaseAPIConfig.get(`${this.controller}/getAll`)
  }

  /**
   * Mô tả : gọi Api paging
   * @param {Object} param
   * - pageIndex - trang hiện tại
   * - pageSize - sô bản ghi / trang
   * - keyword - từ khóa tìm kiếm
   * - type - loại phòng (1: trống, 2: đang sử dụng, 3: cả 2)
   * - roomID
   * - buildingID
   * - timeSlotID
   * - weekID  - tuần
   * @Createdby: PTTAM
   */
  async getPaging(param) {
    return await BaseAPIConfig.post(`${this.controller}/pagingScheduler`, param)
  }

  /**
   * Mô tả : gọi Api paging
   * @param {Object} param
   * - pageIndex - trang hiện tại
   * - pageSize - sô bản ghi / trang
   * - keyword - từ khóa tìm kiếm
   * - WeekID - Tuần
   * @Createdby: PTTAM
   */
  async getPagingRequest(param) {
    return await BaseAPIConfig.post(
      `${this.controller}/pagingRequestBooking`,
      param,
    )
  }
  /**
   * Mô tả : gọi Api paging history
   * @param {Object} param
   * - pageIndex - trang hiện tại
   * - pageSize - sô bản ghi / trang
   * - keyword - từ khóa tìm kiếm
   * @Createdby: PTTAM
   */
  async getPagingHistory(param) {
    return await BaseAPIConfig.post(
      `${this.controller}/pagingHistoryBooking`,
      param,
    )
  }
  /**
   * Mô tả: Thực hiện insert
   * @param: đối tượng
   */
  insert(entity) {
    return BaseAPIConfig.post(`${this.controller}/insertBookingRequest`, entity)
  }
  /**
   * Mô tả: Thực hiện gửi email chờ duyệt
   * @param: đối tượng
   */
  sendEmailPending(entity) {
    return BaseAPIConfig.post(`${this.controller}/sendEmailPending`, entity)
  }
  /**
   * Thực hiện phê duyệt yêu cầu đặt phòng
   * @param {*} param
   * BookingRequest - entity
   * option - 1 - đồng ý, 2- từ chối
   * @returns
   */
  async approveRequest(param) {
    return await BaseAPIConfig.post(
      `${this.controller}/requestBookingRoom`,
      param,
    )
  }
  /**
   * Thực hiện gửi email phê duyệt yêu cầu đặt phòng
   * @param {*} param
   * BookingRequest - entity
   * option - 1 - đồng ý, 2- từ chối
   * @returns
   */
  async sendingEmailAproveOrReject(param) {
    return await BaseAPIConfig.post(
      `${this.controller}/sendingEmailAproveOrReject`,
      param,
    )
  }
  /**
   * Lấy đối tượng theo khóa chính
   * @param {*} id
   * @returns
   */
  getByID(id) {
    return BaseAPIConfig.get(`${this.controller}/getById/${id}`)
  }
  /**
   * Lấy đối tượng theo khóa chính
   * @param {*} id
   * @returns
   */
  cancelBookingRequest(id) {
    return BaseAPIConfig.put(
      `${this.controller}/cancelBookingRequestNomal/${id}`,
    )
  }
  /**
   * Thực hiện gửi email hủy lịch đặt phòng
   * @param {*} id
   * @returns
   */
  sendingEmailCancel(id) {
    return BaseAPIConfig.put(`${this.controller}/sendingEmailCancel/${id}`)
  }
  /**
   * Update lịch đặt
   * @param {*} id - khóa chính
   * @param {*} entity - vai trò
   * @returns
   */
  updated(id, entity) {
    return BaseAPIConfig.put(
      `${this.controller}/updateBookingRequest/${id}`,
      entity,
    )
  }
  /**
   * Thực hiên gửi email khi update lịch đặt
   * @param {*} id - khóa chính
   * @param {*} entity - vai trò
   * @returns
   */
  sendingEmailUpdate(id, entity) {
    return BaseAPIConfig.put(
      `${this.controller}/sendingEmailUpdate/${id}`,
      entity,
    )
  }
}
export default new BookingRoomAPI()
