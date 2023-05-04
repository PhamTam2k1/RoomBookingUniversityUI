import AccountApi from '@/apis/AccountApi'
const state = {
  isLoggedIn: false,
  user: null,
  token: null,
  roleOption: 1,
}

const mutations = {
  /**
   * Gán dữ liệu khi login
   */
  login(state, user) {
    state.isLoggedIn = true
    state.user = user
    state.roleOption = user.RoleOption
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('isLoggedIn', true)
    localStorage.setItem('roleOption', user.RoleOption)
  },

  /**
   * Xóa dữ liệu khi logout
   */
  logout(state) {
    state.isLoggedIn = false
    state.user = null
    state.token = null
    state.roleOption = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('roleOption')
  },

  checkLoginStatus(state) {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (isLoggedIn && user && token) {
      state.isLoggedIn = true
      state.user = JSON.parse(user)
      state.token = token
    }
  },
}

const actions = {
  /**
   * Gọi api login
   */
  async login({ commit }, user) {
    let isAuthenticated = false
    let infoUser = null
    // Thực hiện xác thực đăng nhập
    await AccountApi.logIn(user).then(
      (res) => {
        isAuthenticated = true
        state.token = res.data.Value
        infoUser = res.data.User
        localStorage.setItem('token', res.data.Value)
      },
      (err) => {
        console.log(err)
      },
    )

    if (isAuthenticated) {
      // Lưu thông tin đăng nhập vào local storage
      localStorage.setItem('user', JSON.stringify(infoUser))
      // Cập nhật trạng thái đăng nhập trong store
      commit('login', infoUser)
    } else {
      throw new Error('Invalid username or password')
    }
  },

  /**
   * Gọi api logout
   */
  async logout({ commit }) {
    // Thực hiện xác thực đăng nhập

    await AccountApi.logOut().then(
      () => {
        // Xóa thông tin đăng nhập trong local storage
        localStorage.removeItem('user')
        // Cập nhật trạng thái đăng
        commit('logout')
      },
      (err) => {
        console.log(err)
      },
    )
  },

  checkLogin({ commit }) {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa bằng cách kiểm tra local storage
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      commit('checkLoginStatus', user)
    }
  },
}

const getters = {
  /**
   * Lấy ra trạng thái login
   */
  isLoggedIn: (state) => {
    return state.token !== null && state.token !== undefined
  },
  /**
   * Lấy ra vai trò của người dùng
   */
  roleOption: (state) => state.roleOption,
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
