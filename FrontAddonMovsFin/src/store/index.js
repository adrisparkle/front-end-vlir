import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module
import app from './modules/app'

import * as getters from './getters'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    app,
  },
  state: {},
  mutations: {},
})

Vue.use(VuexI18n.plugin, store)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    usernameid: localStorage.getItem('username') || '',
    name: localStorage.getItem('name') || '',
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, usernameid) {
      state.status = 'success'
      state.token = token
      state.usernameid = usernameid
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          method: 'post',
          url: '/auth/GetToken',
          headers: {},
          data: {
            username: user.email, // This is the body part
            password: user.password,
          },
        })
          .then(resp => {
            const token = resp.data.Token
            const usernameid = resp.data.Id
            const name = resp.data.name
            localStorage.setItem('token', token)
            localStorage.setItem('usernameid', usernameid)
            localStorage.setItem('name', name)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, usernameid)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        axios.get('/auth/Logout/')
        resolve()
      })
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.name,
  },
})
