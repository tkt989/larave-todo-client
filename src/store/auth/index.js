import http from '../../http'

export default {
  state: {
    error: null
  },
  mutations: {
    loginSuccess(state, { token }) {
      state.token = token
      state.error = null
    },

    loginFailed(state) {
      state.token = null
      state.error = 'failed to login'
    },

    signUpSuccess(state, { token }) {
      state.token = token
      state.error = null
    },
    signUpFailed(state) {
      state.token = null
      state.error = 'faild to register'
    }
  },
  actions: {
    login({ commit }, { router, user }) {
      http
        .post('/login', user)
        .then(res => {
          commit('loginSuccess', { token: res.data.token })
          router.push('/home')
        })
        .catch(e => {
          commit('loginFailed')
        })
    },

    signUp({ commit }, { router, user }) {
      http
        .post('/register', user)
        .then(res => {
          commit('signUpSuccess', { token: res.data.token })
          router.push('/home')
        })
        .catch(e => {
          commit('signUpFailed')
        })
    },

    validate({ commit, state }, { router }) {
      let token = state.token

      http
        .post('/validate', { token })
        .then(() => {})
        .catch(e => {
          router.push('/')
        })
    }
  }
}
