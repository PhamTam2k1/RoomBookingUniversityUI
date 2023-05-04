import BaseAPIConfig from './BaseApiConfig'

class RoomAPI {
  controller = 'Rooms'

  /**
   * Mô tả : Lấy tất cả dữ liệu
   * @Createdby: PTTAM
   *Created date: 13:40 03/09/2022
   */
  async getAll() {
    return BaseAPIConfig.get(`${this.controller}/getAll`)
  }

  /**
   * Mô tả : gọi Api paging
   * @param {Object} param
   * - pageIndex - trang hiện tại
   * - pageSize - sô bản ghi / trang
   * - keyword - từ khóa tìm kiếm
   * @Createdby: PTTAM
   */
  async getPaging(param) {
    return await BaseAPIConfig.post(`${this.controller}/paging`, param)
  }

  /**
   * Mô tả : Hàm lấy mã Người dùng mới
   * @Createdby: PTTAM
   */
  async getNewCode() {
    return await BaseAPIConfig.get(`${this.controller}/newCode`)
  }

  /**
   * Mô tả: Thực hiện insert
   * @param: đối tượng
   */
  insert(entity) {
    return BaseAPIConfig.post(`${this.controller}/insert`, entity)
  }

  /**
   * Mô tả: Thực hiện delete
   * @param: entityID - khóa chính vai trò
   */
  delete(entityID) {
    return BaseAPIConfig.delete(`${this.controller}/delete/${entityID}`)
  }

  /**
   * Update vai trò
   * @param {*} id - khóa chính
   * @param {*} entity - vai trò
   * @returns
   */
  updated(id, entity) {
    return BaseAPIConfig.put(`${this.controller}/update/${id}`, entity)
  }

  /**
   * Lấy đối tượng theo khóa chính
   * @param {*} id
   * @returns
   */
  getByID(id) {
    return BaseAPIConfig.get(`${this.controller}/getById/${id}`)
  }
}
export default new RoomAPI()
