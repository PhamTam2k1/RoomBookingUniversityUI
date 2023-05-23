const Enum = Object.freeze({
  /**Trạng thái của người dùng */
  ActiveStatus: {
    /**Chờ xác nhận */
    WaitComfirm: 0,

    /**Đang hoạt động */
    IsActived: 1,

    /**Chưa kích hoạt */
    NotActived: 2,

    /**Ngừng hoạt động */
    Deactivated: 3,
  },

  /**Trạng thái của vai trò khi sửa */
  BookingStatus: {
    // Chờ duyệt
    Pending: 1,
    // Đồng ý
    Approve: 2,
    // Từ chối
    Reject: 3,
    //Hủy
    Cancel: 4,
    // Mở cửa
    OpenDoor: 5,
  },
  /**Trạng thái lọc lịch họp */
  SchedulerConnection: {
    /**tất cả */
    ALL: 1,

    /**Còn trống */
    Me: 2,
  },
  /**Vai trò người dùng */
  RoleOption: {
    /**Người dùng */
    User: 1,
    /**Quản trị viên */
    Admin: 2,
    /**Người hỗ trợ */
    Supporter: 3,
  },

  OptionRequest: {
    // Chờ duyệt
    Await: 1,
    // Đồng ý
    Approve: 2,
    // Từ chối
    Reject: 3,
    //Hủy
    Cancel: 4,
    // Mở cửa
    OpenDoor: 5,
  },
  /**Trạng thái mở popup */
  PopupMode: {
    /**Trạng thái thêm mới */
    AddMode: 0,

    /**Trạng thái sửa */
    EditMode: 1,

    /**Trạng thái xóa */
    DeleteMode: 2,

    /**Trạng thái thông báo */
    NotifyMode: 3,
    /**Trạng thái phê duyệt */
    ApproveMode: 4,
    /**Trạng thái từ chôi */
    RefuseMode: 5,
    /**
     * Chờ phê duyệt
     */
    PendingMode: 6,
    /**
     * Chờ phê duyệt
     */
    HistoryMode: 6,
  },
})
export default Enum
