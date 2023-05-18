import BuildingApi from '@/apis/BuildingApi'
import RoomApi from '@/apis/RoomApi'
import EquipmentApi from '@/apis/EquipmentApi'
import TimeSlotApi from '@/apis/TimeSlotApi'
import DepartmentApi from '@/apis/DepartmentApi'
import RoleApi from '@/apis/RoleApi'
import EquipmentTypeApi from '@/apis/EquipmentTypeApi'
import RoomTypeApi from '@/apis/RoomTypeApi'
import UserApi from '@/apis/UserApi'
const state = {
  /**
   * Dữ liệu tòa nhà
   */
  dataBuilding: null,

  /**
   * Dữ liệu thiết bị
   */
  dataEquipment: null,

  /**
   * Dữ liệu phòng
   */
  dataRoom: null,

  /**
   * Dữ liệu ca học
   */
  dataTime: null,

  /**
   * Dữ liệu phòng ban
   */
  dataDepartment: null,

  /**
   * Dữ liệu vai trò
   */
  dataRole: null,
  /**
   * Dữ liệu loại phòng
   */
  dataEquipmentType: null,
  /**
   * Dữ liệu loại thiết bị
   */
  dataRoomType: null,
  /**
   * Dữ liệu giảng viên
   */
  dataUser: null,
}

const mutations = {
  /**
   * Gán lại dữ liệu tòa nhà
   */
  loadDataBuildings(state, data) {
    state.dataBuilding = data
  },

  /**
   * Gán lại dữ liệu thiết bị
   */
  loadDataEquipments(state, data) {
    state.dataEquipment = data
  },

  /**
   * Gán lại dữ liệu phòng
   */
  loadDataRooms(state, data) {
    state.dataRoom = data
  },

  /**
   * Gán lại dữ liệu thời gian
   */
  loadDataTimes(state, data) {
    state.dataTime = data
  },
  /**
   * Gán lại dữ liệu phòng ban
   */
  loadDataDepartments(state, data) {
    state.dataDepartment = data
  },
  /**
   * Gán lại dữ liệu vai trò
   */
  loadDataRoles(state, data) {
    state.dataRole = data
  },
  /**
   * Gán lại dữ liệu loại thiết bị
   */
  loadDataEquipmentTypes(state, data) {
    state.dataEquipmentType = data
  },
  /**
   * Gán lại dữ liệu loại phòng
   */
  loadDataRoomTypes(state, data) {
    state.dataRoomType = data
  },
  /**
   * Gán lại dữ liệu loại phòng
   */
  loadDataUsers(state, data) {
    state.dataUser = data
  },
}

const actions = {
  /**
   * Thực hiện gọi api lấy toàn bộ dữ liệu tòa nhà
   */
  async loadDataBuildings({ commit }) {
    await BuildingApi.getAll().then(
      (res) => {
        commit('loadDataBuildings', res.data)
      },
      (err) => {
        console.log(err)
      },
    )
  },
  /**
   * Thực hiện gọi api lấy toàn bộ dữ liệu tòa nhà
   */
  async loadDataTimes({ commit }) {
    await TimeSlotApi.getAll().then(
      (res) => {
        commit('loadDataTimes', res.data)
      },
      (err) => {
        console.log(err)
      },
    )
  },
  /**
   * Thực hiện gọi api lấy toàn bộ dữ liệu phòng
   */
  async loadDataRooms({ commit }) {
    await RoomApi.getAll().then(
      (res) => {
        commit('loadDataRooms', res.data)
      },
      (err) => {
        console.log(err)
      },
    )
  },
  /**
   * Thực hiện gọi api lấy toàn bộ dữ liệu thiết bị
   */
  async loadDataEquipments({ commit }) {
    await EquipmentApi.getAll().then(
      (res) => {
        commit('loadDataEquipments', res.data)
      },
      (err) => {
        console.log(err)
      },
    )
  },

  /**
   * Thực hiện gọi api lấy toàn bộ dữ liệu phòng ban
   */
  async loadDataDepartments({ commit }) {
    await DepartmentApi.getAll().then(
      (res) => {
        commit('loadDataDepartments', res.data)
      },
      (err) => {
        console.log(err)
      },
    )
  },

  /**
   * Thực hiện gọi api lấy toàn bộ dữ liệu phòng ban
   */
  async loadDataRoles({ commit }) {
    await RoleApi.getAll().then(
      (res) => {
        commit('loadDataRoles', res.data)
      },
      (err) => {
        console.log(err)
      },
    )
  },
  /**
   * Thực hiện gọi api lấy toàn bộ dữ liệu loại phòng
   */
  async loadDataRoomTypes({ commit }) {
    await RoomTypeApi.getAll().then(
      (res) => {
        commit('loadDataRoomTypes', res.data)
      },
      (err) => {
        console.log(err)
      },
    )
  },
  /**
   * Thực hiện gọi api lấy toàn bộ dữ liệu loại thiết bị
   */
  async loadDataEquipmentTypes({ commit }) {
    await EquipmentTypeApi.getAll().then(
      (res) => {
        commit('loadDataEquipmentTypes', res.data)
      },
      (err) => {
        console.log(err)
      },
    )
  },
  /**
   * Thực hiện gọi api lấy toàn bộ dữ liệu loại thiết bị
   */
  async loadDataUsers({ commit }) {
    await UserApi.getAll().then(
      (res) => {
        commit('loadDataUsers', res.data)
      },
      (err) => {
        console.log(err)
      },
    )
  },
}

/**
 * Lấy ra giá trị của state
 */
const getters = {
  dataBuilding: (state) => state.dataBuilding,
  dataEquipment: (state) => state.dataEquipment,
  dataRoom: (state) => state.dataRoom,
  dataTime: (state) => state.dataTime,
  dataDepartment: (state) => state.dataDepartment,
  dataRole: (state) => state.dataRole,
  dataEquipmentType: (state) => state.dataEquipmentType,
  dataRoomType: (state) => state.dataRoomType,
  dataUser: (state) => state.dataUser,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
