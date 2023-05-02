import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Trang chủ',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Tổng quan',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: '/booking',
        name: 'Booking',
        redirect: '/booking-room',
      },
      {
        path: '/booking/booking-room',
        name: 'Đặt phòng',
        component: () => import('@/views/booking/RoomBooking.vue'),
      },
      {
        path: '/booking/booking-await',
        name: 'Chờ duyệt',
        component: () =>
          import('@/views/dictionary/Building/BuildingDictionary.vue'),
      },
      {
        path: '/booking/booking-history',
        name: 'Lịch sử đặt phòng',
        component: () =>
          import('@/views/dictionary/Building/BuildingDictionary.vue'),
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
            component: () => import('@/views/base/Accordion.vue'),
          },
          {
            path: '/dictionary/room-type',
            name: 'Loại phòng học',
            component: () => import('@/views/base/Accordion.vue'),
          },
          {
            path: '/dictionary/building',
            name: 'Tòa nhà',
            component: () => import('@/views/base/Breadcrumbs.vue'),
          },
          {
            path: '/dictionary/timeslot',
            name: 'Ca học',
            component: () => import('@/views/base/Cards.vue'),
          },
          {
            path: '/dictionary/equipment',
            name: 'Thiết bị',
            component: () => import('@/views/base/Carousels.vue'),
          },
          {
            path: '/dictionary/equipment-type',
            name: 'Loại thiết bị',
            component: () => import('@/views/base/Collapses.vue'),
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
            component: () => import('@/views/buttons/Buttons.vue'),
          },
          {
            path: '/dictionary/role',
            name: 'Vai trò',
            component: () => import('@/views/buttons/Dropdowns.vue'),
          },
          {
            path: '/dictionary/department',
            name: 'Khoa',
            component: () => import('@/views/buttons/ButtonGroups.vue'),
          },
        ],
      },
      {
        path: '/forms',
        name: 'Forms',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/forms/form-control',
        children: [
          {
            path: '/forms/form-control',
            name: 'Form Control',
            component: () => import('@/views/forms/FormControl.vue'),
          },
          {
            path: '/forms/select',
            name: 'Select',
            component: () => import('@/views/forms/Select.vue'),
          },
          {
            path: '/forms/checks-radios',
            name: 'Checks & Radios',
            component: () => import('@/views/forms/ChecksRadios.vue'),
          },
          {
            path: '/forms/range',
            name: 'Range',
            component: () => import('@/views/forms/Range.vue'),
          },
          {
            path: '/forms/input-group',
            name: 'Input Group',
            component: () => import('@/views/forms/InputGroup.vue'),
          },
          {
            path: '/forms/floating-labels',
            name: 'Floating Labels',
            component: () => import('@/views/forms/FloatingLabels.vue'),
          },
          {
            path: '/forms/layout',
            name: 'Layout',
            component: () => import('@/views/forms/Layout.vue'),
          },
          {
            path: '/forms/validation',
            name: 'Validation',
            component: () => import('@/views/forms/Validation.vue'),
          },
        ],
      },
      {
        path: '/charts',
        name: 'Charts',
        component: () => import('@/views/charts/Charts.vue'),
      },
      {
        path: '/icons',
        name: 'Icons',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/icons/coreui-icons',
        children: [
          {
            path: '/icons/coreui-icons',
            name: 'CoreUI Icons',
            component: () => import('@/views/icons/CoreUIIcons.vue'),
          },
          {
            path: '/icons/brands',
            name: 'Brands',
            component: () => import('@/views/icons/Brands.vue'),
          },
          {
            path: '/icons/flags',
            name: 'Flags',
            component: () => import('@/views/icons/Flags.vue'),
          },
        ],
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/notifications/alerts',
        children: [
          {
            path: '/notifications/alerts',
            name: 'Alerts',
            component: () => import('@/views/notifications/Alerts.vue'),
          },
          {
            path: '/notifications/badges',
            name: 'Badges',
            component: () => import('@/views/notifications/Badges.vue'),
          },
          {
            path: '/notifications/modals',
            name: 'Modals',
            component: () => import('@/views/notifications/Modals.vue'),
          },
        ],
      },
      {
        path: '/widgets',
        name: 'Widgets',
        component: () => import('@/views/widgets/Widgets.vue'),
      },
    ],
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

export default router
