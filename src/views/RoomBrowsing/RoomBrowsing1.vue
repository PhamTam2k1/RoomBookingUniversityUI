<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="(item, index) in myData" :key="index">
        {{ item.title }} - {{ item.message }}
      </li>
    </ul>
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
      myData: [],
    }
  },
  async created() {
    const notificationsRef = ref(db, 'notifications')
    const childRef = child(
      notificationsRef,
      '00000000-0000-0000-0000-000000000000',
    )
    debugger

    get(childRef).then((snapshot) => {
      if (snapshot.exists()) {
        debugger
        var data = snapshot.val()
        const dataConvert = []
        for (const key in data) {
          const notification = data[key]
          dataConvert.push(notification)
        }

        console.log(dataConvert)
      } else {
        console.log('Không tìm thấy đối tượng con ')
      }
    })
  },
}
</script>
