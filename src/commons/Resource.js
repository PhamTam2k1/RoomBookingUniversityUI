import Enum from './Enum'
const Resource = Object.freeze({
  ErrForm: {
    IsNotEmpty: 'không được để trống',

    IsEmailErr: 'Email không đúng định dang.',

    ErrorInput: 'Dữ liệu đầu vào không hợp lệ, vui lòng kiểm tra lại!',

    IsDuplicateCode: 'Mã nhân viên đã tồn tại.',
  },
  Messenger: {
    // resource msg
    requestMsgDelete: 'Bạn có chắc chắn muốn xóa ',
    requestConfilmDelete: ' khỏi ứng dụng quản lý phòng học không?',
    ConfilmMultiDelete:
      'Bạn có thực sự muốn xóa những nhân viên đã chọn không?',
    ChangeData: 'Dữ liệu đã bị thay đổi. Bạn có muốn lưu không?',
    IsNotChangeData: 'Dữ liệu không có gì thay đổi.',
    UpdateSucces: 'Cập nhật thành công.',
    InsertSucces: 'Thêm mới thành công.',
    DeleteSucces: 'Xóa thành công.',
    Success: 'success',
    Error: 'error',
    Warning: 'warning',
  },
  Pagging: {
    totalRecord: 'Tổng số bản ghi:',
    totalRecordOfPage: 'Số bản ghi/trang',
    record: 'bản ghi',
  },

  Popup: {
    TitlePopupDelete: 'Xóa người dùng',
    TitlePopupEdit: 'Sửa người dùng',
    TitlePopupCustomiseColumn: 'Tùy chỉnh cột',
  },
  /** Mảng Header của table */
  UserHeader: [
    {
      dataField: 'UserCode',
      width: 150,
      caption: 'Mã nhân viên',
      visible: true,
      disable: true,
    },
    {
      dataField: 'FullName',
      width: 200,
      caption: 'Họ và tên',
      visible: true,
      disable: true,
    },
    {
      dataField: 'DepartmentName',
      width: 250,
      caption: 'Phòng ban',
      visible: true,
      disable: false,
    },
    {
      dataField: 'JobPositionName',
      width: 200,
      caption: 'Vị trí công việc',
      visible: true,
      disable: false,
    },
    {
      dataField: 'Email',
      width: 170,
      caption: 'Email',
      visible: true,
      disable: false,
    },
    {
      dataField: 'RoleNames',
      width: 200,
      caption: 'Vai trò',
      visible: true,
      disable: false,
    },

    {
      dataField: 'ActiveStatus',
      width: 170,
      caption: 'Trạng thái',
      visible: true,
      disable: false,
    },
    {
      dataField: '',
      caption: '',
      width: 100,
      visible: true,
    },
    {
      dataField: 'AvartarColor',
      caption: '',
      width: 0,
      visible: false,
    },
    {
      dataField: 'ActiveStatusColor',
      caption: '',
      width: 0,
      visible: false,
    },
  ],
  /**Mảng chứa số bản ghi/trang */
  PageSizes: [
    {
      Text: '15',
      Value: 15,
    },
    {
      Text: '25',
      Value: 25,
    },
    {
      Text: '50',
      Value: 50,
    },
    {
      Text: '100',
      Value: 100,
    },
  ],
  /**Mảng chứa số bản ghi/trang */
  SchedulerConnection: [
    {
      Text: 'Tất cả lịch đặt',
      Value: Enum.SchedulerConnection.ALL,
    },
    {
      Text: 'Lịch đặt của tôi',
      Value: Enum.SchedulerConnection.Me,
    },
  ],
  /**Mảng chứa Header của table */
  HeaderTableAdding: [
    {
      caption: 'Mã nhân viên',
      class: 'text-align-left w-120 pd-16 border-box',
    },
    {
      caption: 'Họ và tên',
      class: 'text-align-left w-200 pd-16 border-box',
    },
    {
      caption: 'Phòng ban',
      class: 'text-align-left w-200 pd-16 border-box',
    },
    {
      caption: 'Vị trí công việc',
      class: 'text-align-left w-200 pd-16 border-box',
    },
    {
      caption: 'Email',
      class: 'text-align-left w-200 pd-16 border-box',
    },
    {
      caption: 'Vai trò',
      class: 'text-align-left w-200 pd-16 border-box',
    },

    {
      caption: 'Trạng thái',
      class: 'text-align-left w-220 pd-16 border-box',
    },
  ],

  /**Mảng chứa trạng thái của người dùng */
  // BookingStatus: [
  //   {
  //     StatusName: 'Tất cả',
  //     StatusValue: Enum.BookingStatus.ALL,
  //   },
  //   {
  //     StatusName: 'Còn trống',
  //     StatusValue: Enum.BookingStatus.IsEmpty,
  //   },
  //   {
  //     StatusName: 'Đang sử dụng',
  //     StatusValue: Enum.BookingStatus.IsUsed,
  //   },
  // ],

  /**Mảng chứa trạng thái của người dùng */
  BookingStatusColor: {
    // Chờ duyệt
    Await: '#dc3545',
    // Đồng ý
    Approve: '#3d75de',
    // Từ chối
    Reject: '#000',
    //Hủy
    Cancel: '',
    OpenDoor: '#27BF09',
  },
  /**Mảng chứa trạng thái của người dùng */
  BookingStatus: {
    // Chờ duyệt
    Await: 'Chờ duyệt',
    // Đồng ý
    Approve: 'Đồng ý',
    // Từ chối
    Reject: 'Từ chối',
    //Hủy
    Cancel: 'Hủy yêu cầu',
    // Mở cửa
    OpenDoor: 'Đã mở cửa',
  },
  PassWordDefault: '12345678@Utc',
})
export default Resource
