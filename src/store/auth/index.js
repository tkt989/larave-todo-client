import { http, setToken } from '../../http'

export default {
  state: {
    token: null,
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
    init({ commit }) {
      let token = localStorage.getItem('token') || null
      setToken(token)
    },

    login({ commit }, { router, user }) {
      http
        .post('/login', user)
        .then(res => {
          commit('loginSuccess', { token: res.data.token })
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
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
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
          router.push('/home')
        })
        .catch(e => {
          commit('signUpFailed')
        })
    },

    validate({ commit, state }, { router, to }) {
      let token = state.token
      http
        .get('/validate', { token })
        .then(() => {
          if (to === undefined) return
          router.push(to)
        })
        .catch(e => {
          router.push('/')
        })
    },

    deleteAccount({ commit, state }, { router }) {
      let token = state.token
      http.post('/deleteAccount', { token }).then(() => {
        router.push('/')
      })
    }
  }
}
