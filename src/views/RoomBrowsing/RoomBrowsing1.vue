<template>
  <div>
    <transition name="fade">
      <div class="message">{{ dataConvert }}</div>
    </transition>
  </div>
</template>

<script>
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, child } from 'firebase/database'
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
  name: 'MyComponent',
  data() {
    return {
      title: 'My Component',
      dataConvert: [],
    }
  },
  components: {},
  async created() {
    const notificationsRef = ref(db, 'notifications')
    const childRef = child(
      notificationsRef,
      '00000000-0000-0000-0000-000000000000',
    )

    get(childRef).then((snapshot) => {
      if (snapshot.exists()) {
        var data = snapshot.val()
        for (const key in data) {
          const notification = data[key]
          this.dataConvert.push(notification)
        }
      } else {
        console.log('Không tìm thấy đối tượng con ')
      }
    })
  },
}
</script>
<style>
.message {
  background-color: #4caf50; /* màu xanh lá */
  color: white;
  padding: 16px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
