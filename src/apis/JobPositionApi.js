import BaseAPIConfig from './BaseApiConfig'

class JobPositionAPI {
  controller = 'JobPositions'

  /**
   * Mô tả : Lấy toàn bộ dữ liệu phòng ban từ api
   * @Createdby: PTTAM
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
}
export default new JobPositionAPI()
