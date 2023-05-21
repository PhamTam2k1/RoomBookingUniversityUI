import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Trang chủ',
    component: DefaultLayout,
    redirect: '/booking/booking-room',
    children: [
      {
        path: '/dashboard',
        name: 'Tổng quan',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/booking',
        name: 'Booking',
        redirect: '/booking-room',
        meta: { requiresAuth: true },
      },
      {
        path: '/infor-user',
        name: 'Thông tin cá nhân',
        component: () => import('@/views/dictionary/User/UserInfor.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/booking/booking-room',
        name: 'Đặt phòng',
        component: () => import('@/views/booking/RoomBooking.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/booking/booking-await',
        name: 'Chờ duyệt',
        component: () => import('@/views/RoomBrowsing/RoomBrowsing.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/booking/booking-history',
        name: 'Lịch sử đặt phòng',
        component: () =>
          import('@/views/booking-room-history/BookingRoomHistory.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/dictionary',
        name: 'Danh mục',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/dictionary/room',
        children: [
          {
            path: '/dictionary/room',
            name: 'Phòng học',
            component: () =>
              import('@/views/dictionary/Room/RoomDictionary.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/dictionary/room-type',
            name: 'Loại phòng học',
            component: () =>
              import('@/views/dictionary/Building/BuildingDictionary.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/dictionary/building',
            name: 'Tòa nhà',
            component: () =>
              import('@/views/dictionary/Building/BuildingDictionary.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/dictionary/timeslot',
            name: 'Ca học',
            component: () =>
              import('@/views/dictionary/TimeSlot/TimeSlotDictionary.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/dictionary/equipment',
            name: 'Thiết bị',
            component: () =>
              import('@/views/dictionary/Equipment/EquipmentDictionary.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/dictionary/equipment-type',
            name: 'Loại thiết bị',
            component: () =>
              import('@/views/dictionary/Equipment/EquipmentDictionary.vue'),
            meta: { requiresAuth: true },
          },
        ],
      },
      {
        path: '/dictionary',
        name: 'Người dùng',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/dictionary/user',
        children: [
          {
            path: '/dictionary/user',
            name: 'Người dùng',
            component: () =>
              import('@/views/dictionary/User/UserDictionary.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/dictionary/role',
            name: 'Vai trò',
            component: () =>
              import('@/views/dictionary/Role/RoleDictionary.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/dictionary/department',
            name: 'Khoa',
            component: () =>
              import('@/views/dictionary/Department/DepartmentDictionary.vue'),
            meta: { requiresAuth: true },
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    // component: () => import('@/views/pages/Login.vue'),
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})
export default router
