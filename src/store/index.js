import Vue from 'vue'
import Vuex from 'vuex'
import storageUtils from '@/utils/storageUtils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: storageUtils.getItem('user')
  },
  mutations: {
    login(state, user) {
      state.user = user
      storageUtils.setItem('user', user)
    },
    logout(state) {
      state.user = null
      storageUtils.removeItem('user')
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    user: state => state.user
  }
})
