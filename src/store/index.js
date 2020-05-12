import Vue from 'vue'
import Vuex from 'vuex'
import storageUtils from '@/utils/storageUtils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: storageUtils.getItem('user')
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
