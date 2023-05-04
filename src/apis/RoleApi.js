import BaseAPIConfig from './BaseApiConfig'

class RoleAPI {
  controller = 'Roles'

  /**
   * Mô tả : Lấy toàn bộ dữ liệu phòng ban từ api
   * @Createdby: PTTAM
   * Created date: 21:33 1/09/2022
   */
  getAll() {
    return BaseAPIConfig.get(`${this.controller}/getAll`)
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
   * Lấy đối tượng theo khóa chính
   * @param {*} id
   * @returns
   */
  getByID(id) {
    return BaseAPIConfig.get(`${this.controller}/getById/${id}`)
  }
}
export default new RoleAPI()
