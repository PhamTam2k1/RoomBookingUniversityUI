<template>
  <CHeader position="sticky" class="">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <AppBreadcrumb />
      <CHeaderNav class="d-none d-md-flex me-auto"> </CHeaderNav>
      <CHeaderNav>
        <CNavItem>
          <CNavLink v-click-out-side="showPopupNotify">
            <CIcon
              class="mx-2"
              icon="cil-bell"
              size="lg"
              @click="showNotify = true"
            >
            </CIcon>
            <span class="badge" v-if="countNotify != 0">{{ countNotify }}</span>
            <div
              v-if="showNotify"
              class="dropdown-menu show dropdown-menu-end pt-0"
              data-popper-placement="bottom-end"
              style="
                position: absolute;
                inset: 0px 0px auto auto;
                margin: 0px;
                transform: translate3d(0px, 48px, 0px);
              "
            >
              <h6
                class="dropdown-header dropdown-header bg-light dark:bg-white dark:bg-opacity-10"
              >
                <strong>Bạn có {{ dataConvert.length }} thông báo mới</strong>
              </h6>
              <a
                v-for="item in dataConvert"
                :key="item"
                class="dropdown-item"
                :class="{ watched: !item.status }"
                @click="!item.status && updateFirebaseData(item.key)"
                href="#"
                ><div class="message">
                  <div class="pt-3 me-3 float-start">
                    <div class="avatar undefined">
                      <img src="/img/8.6d7480dd.jpg" class="avatar-img" /><span
                        class="avatar-status bg-success"
                      ></span>
                    </div>
                  </div>
                  <div>
                    <small class="text-medium-emphasis">Bùi Quang Điệp</small
                    ><small class="text-medium-emphasis float-end mt-1">{{
                      timeAgo(item.time)
                    }}</small>
                  </div>
                  <div class="text-truncate font-weight-bold">
                    <span class="fa fa-exclamation text-danger"></span>
                    Booking
                  </div>
                  <div class="small text-medium-emphasis text-truncate">
                    {{ item.notify }}
                  </div>
                </div></a
              ><a class="dropdown-item text-center border-top" href="#"
                ><strong>View all messages</strong></a
              >
            </div>
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink>
            <CIcon class="mx-2" icon="cil-list" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink>
            <CIcon class="mx-2" icon="cil-envelope-open" size="lg" />
          </CNavLink>
        </CNavItem>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>

<script>
import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import clickOutSide from '@mahdikhashan/vue3-click-outside'
import { logo } from '@/assets/brand/logo'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, child, update } from 'firebase/database'
const firebaseConfig = {
  apiKey: 'AIzaSyC79t9n29m5Ayy0gg0lvqAFPEleapma-hQ',
  authDomain: 'room-90f68.firebaseapp.com',
  projectId: 'room-90f68',
  storageBucket: 'room-90f68.appspot.com',
  messagingSenderId: '660048698458',
  appId: '1:660048698458:web:22727bc42c38273b5e4c63',
  measurementId: 'G-1TP028XG2N',
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
    AppHeaderDropdownAccnt,
  },
  directives: {
    clickOutSide,
  },
  setup() {
    return {
      logo,
    }
  },
  data() {
    return {
      showNotify: false,
      title: 'My Component',
      dataConvert: [],
      countNotify: 0,
    }
  },
  methods: {
    // Cập nhật dữ liệu khi xem
    updateFirebaseData(clickedItemId) {
      // Lấy thông tin đăng nhập
      const user = JSON.parse(localStorage.getItem('user'))
      if (user && user.UserID) {
        const notificationsRef = ref(db, 'notifications')
        const childRef = child(notificationsRef, user.UserID)

        // Thực hiện cập nhật dữ liệu trên Firebase
        const clickedItemRef = child(childRef, clickedItemId)
        update(clickedItemRef, {
          status: true,
        })
          .then(() => {
            console.log('Dữ liệu đã được cập nhật thành công trên Firebase')
          })
          .catch((error) => {
            console.log('Lỗi khi cập nhật dữ liệu trên Firebase:', error)
          })
      }
    },
    callNotify() {
      debugger
      // lấy thông tin đăng nhập
      const user = JSON.parse(localStorage.getItem('user'))
      if (user && user.UserID) {
        const notificationsRef = ref(db, 'notifications')
        const childRef = child(notificationsRef, user.UserID)
        onValue(childRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val()
            const dataConvert = []
            for (const key in data) {
              const notification = data[key]
              notification.key = key
              dataConvert.push(notification)
            }
            const countNotify = dataConvert.filter(
              (item) => item.status === false,
            )
            dataConvert.sort((a, b) => new Date(b.time) - new Date(a.time))

            // Assign the values to reactive data properties
            this.dataConvert = dataConvert
            this.countNotify = countNotify.length
          } else {
            console.log('Không tìm thấy đối tượng con')
          }
        })
      }
    },
    showPopupNotify() {
      this.showNotify = false
    },
    timeAgo(timestamp) {
      const time = Date.parse(timestamp)
      const now = Date.now()
      const seconds = Math.floor((now - time) / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)

      if (seconds < 60) {
        return 'vừa xong'
      } else if (minutes < 60) {
        return `${minutes} phút trước`
      } else if (hours < 24) {
        return `${hours} giờ trước`
      } else {
        return `${days} ngày trước`
      }
    },
  },
  mounted() {
    console.log(this.dataConvert)
    this.callNotify()
  },
  updated() {
    this.callNotify()
  },
}
</script>
<style scoped>
.dropdown-menu.dropdown-menu-end {
  min-width: 315px;
  max-height: 500px;
  overflow: auto;
  top: 15px !important;
}
.bg-light {
  position: sticky;
  top: 0px;
  left: 0px;
  z-index: 99;
}
.badge {
  position: absolute;
  top: 2px;
  right: 17px;
  background-color: #ff0000;
  color: #ffffff;
  border-radius: 50%;
  height: 14px;
  width: 15px;
  font-size: 7px;
  padding-top: 3px;
}
.nav-link {
  position: relative;
}
.watched {
  background-color: aliceblue;
}
.dropdown-item:active {
  color: rgba(44, 56, 74, 0.681) !important;
  text-decoration: none;
  background-color: #478bc4f0 !important;
}
</style>
