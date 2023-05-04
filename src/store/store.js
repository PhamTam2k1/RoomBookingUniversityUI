import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  // ...
  plugins: [
    createPersistedState({
      key: 'my-app',
      storage: window.localStorage,
    }),
  ],
})
export default {
  store,
}
