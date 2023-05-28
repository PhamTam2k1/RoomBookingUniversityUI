import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import ElementPlus from 'element-plus'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import 'devextreme/dist/css/dx.light.css'
import 'element-plus/es/components/date-picker/style/css'
import { locale } from 'devextreme/localization'
import VueFire from 'vuefire'
import vue3GoogleLogin from 'vue3-google-login'
const gAuthOptions = {
  clientId:
    '1014068107434-hqnfimf7s1tdsh7eodfvcplu7rflun7o.apps.googleusercontent.com',
}

locale('vi')

const app = createApp(App)
app.use(store)
app.use(ElementPlus)
app.use(router)
app.use(Vuex)
app.use(CoreuiVue)
app.use(VueFire)
app.use(vue3GoogleLogin, gAuthOptions)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)

app.mount('#app')
