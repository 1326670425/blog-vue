import Vue from 'vue'
import Vuex from 'vuex'
import {getItem, setItem, removeItem} from '@/utils/storageUtils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
  },
  mutations: {
    login(state, user) {
      state.user = user
      setItem('user', user)
    },
    logout(state) {
      state.user = null
      removeItem('user')
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
