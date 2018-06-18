import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth
  }
})
