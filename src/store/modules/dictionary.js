import BuildingApi from '@/apis/BuildingApi'
import RoomApi from '@/apis/RoomApi'
import EquipmentApi from '@/apis/EquipmentApi'
import TimeSlotApi from '@/apis/TimeSlotApi'
import DepartmentApi from '@/apis/DepartmentApi'
import RoleApi from '@/apis/RoleApi'
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
