import BaseAPIConfig from "./BaseApiConfig";

class BookingRoomAPI {
    controller = "BookingRooms";
   
    /**
    * Mô tả : Lấy toàn bộ dữ liệu phòng ban từ api
    * @Createdby: PTTAM
    * Created date: 21:33 1/09/2022
    */
     getAll() {
        return BaseAPIConfig.get(`${this.controller}/getAll`);
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
      
        return await BaseAPIConfig.post(`${this.controller}/pagingScheduler`,param);
       
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
      
        return await BaseAPIConfig.post(`${this.controller}/pagingRequestBooking`,param);
       
    }
     /**
     * Mô tả: Thực hiện insert 
     * @param: đối tượng 
     */
     insert(entity){
        return BaseAPIConfig.post(`${this.controller}/insertBookingRequest`,entity);
    }
    /**
     * Thực hiện phê duyệt yêu cầu đặt phòng
     * @param {*} param 
     * BookingRequest - entity
     * option - 1 - đồng ý, 2- từ chối
     * @returns 
     */
    async approveRequest(param) {
      
        return await BaseAPIConfig.post(`${this.controller}/requestBookingRoom`,param);
       
    }
      
}
export default new  BookingRoomAPI();