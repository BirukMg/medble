import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || '',
    is_loggedin: false,
    server_ip: 'http://localhost:3000',
    account: localStorage.getItem('account') || null,
    post_limit: 100
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token) {
      state.status = 'success'
      state.token = token
      // state.users = users
    },
    get_userid(state, userId) {
      state.userId = userId
    },
    get_account(state, account) {
      state.account = account
    },
    is_logged_in(state) {
      //   let is_loggedin = false
      if (localStorage.getItem('token') != '') {
        state.is_loggedin = true;
      } else {
        state.is_loggedin = false;
      }
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.userId = '';
      state.account = null;
      state.is_loggedin = false;
    },
    update_account(state, newaccount) {
      state.account = newaccount
    }
  },
  actions: {
    login({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios
          .post(this.state.server_ip + "/api/medbleusers/signin", user)
          .then(resp => {
            const token = resp.data.data.user.id
            const userId = resp.data.data.user.userId
            const account = JSON.stringify(resp.data.data.account.accounts)
            localStorage.setItem('token', token)
            localStorage.setItem('userId', userId)
            localStorage.setItem('account', account)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token)
            commit('get_userid', userId)
            commit('get_account', account)
            commit('is_logged_in')
            resolve(resp)
          })
          .catch(err => {
            // commit('auth_error')
            // localStorage.clear();
            reject(err)
          })
      })
    },
    sociallogin({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.get(this.state.server_ip + '/api/medbleusers/' + user.user_id + '/sociallogin')
          .then(res => {
            const token = res.data.data.user.id
            const userId = res.data.data.user.userId
            const account = JSON.stringify(res.data.data.accountData)
            localStorage.setItem('token', token)
            localStorage.setItem('userId', userId)
            localStorage.setItem('account', account)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token)
            commit('get_userid', userId)
            commit('get_account', account)
            commit('is_logged_in')
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    },
    logout({
      commit
    }) {
      return new Promise((resolve, reject) => {
        // axios.post(this.state.server_ip + '/api/medbleusers/logout', {
        //   accessToken: JSON.parse(this.state.account).token
        // })
        // .then(res => {
        //     commit('logout')
        //     localStorage.removeItem('userId');
        //     localStorage.removeItem('token');
        //     delete axios.defaults.headers.common['Authorization']
        //     resolve(res)
        // }).catch(err => {
        //     reject(err)
        // })
        commit('logout')
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization']
        resolve()
        // resolve()
      })
    },
    updateAccount({
      commit
    }, newaccount) {
      return new Promise((resolve, reject) => {
        let account = JSON.stringify(newaccount)
        localStorage.setItem('account', account)
        commit('update_account', account)
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
