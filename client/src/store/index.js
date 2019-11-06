import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    admintoken: localStorage.getItem('admintoken') || '',
    userId: localStorage.getItem('userId') || '',
    is_loggedin: false,
    isadmin_loggedin: false,
    server_ip: 'http://localhost:3000',
    account: localStorage.getItem('account') || null,
    adminInfo: localStorage.getItem('adminInfo') || null,
    post_limit: 100
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token) {
      state.status = 'success'
      state.token = token
    },
    authadmin_success(state, admintoken) {
      state.status = 'success'
      state.admintoken = admintoken
    },
    get_userid(state, userId){
      state.userId = userId
    },
    get_account(state, account) {
      state.account = account
    },
    get_adminInfo(state, adminInfo) {
      state.adminInfo = adminInfo
    },
    is_logged_in(state) {
    //   let is_loggedin = false
      if (localStorage.getItem('token') != '') {
        state.is_loggedin = true;
      } else {
        state.is_loggedin = false;
      }
    },
    isadmin_logged_in(state) {
      //   let is_loggedin = false
      if (localStorage.getItem('admintoken') != '') {
        state.isadmin_loggedin = true;
      } else {
        state.isadmin_loggedin = false;
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
    admin_logout(state) {
      state.status = '';
      state.admintoken = '';
      state.adminInfo = null;
      state.isadmin_loggedin   = false;
    },
    update_account(state, newaccount) {
      state.account = newaccount
    },
    update_admininfo(state, updatedInfo) {
      state.account = updatedInfo
    }
  },
  actions: {
    login({commit}, user) {
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
    adminlogin({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios
          .post(this.state.server_ip + "/api/admins/signin", user)
          .then(resp => {
            const admintoken = resp.data.data.loginInfo.id
            const adminInfo = JSON.stringify(resp.data.data.adminInfo)
            localStorage.setItem('admintoken', admintoken)
            localStorage.setItem('adminInfo', adminInfo)
            // axios.defaults.headers.common['Authorization'] = token
            commit('authadmin_success', admintoken)
            commit('get_adminInfo', adminInfo)
            commit('isadmin_logged_in')
            resolve(resp)
          })
          .catch(err => {
            // commit('auth_error')
            // localStorage.clear();
            reject(err)
          })
      })
    },
    sociallogin({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.get(this.state.server_ip + '/api/medbleusers/' + user.user_id +'/sociallogin')
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
    logout({commit}) {
      return new Promise((resolve, reject) => {
          commit('logout')
          localStorage.removeItem('userId');
          localStorage.removeItem('account');
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization']
          resolve()
      })
    },
    adminlogout({commit}) {
      return new Promise((resolve, reject) => {
          commit('admin_logout')
          localStorage.removeItem('admintoken');
          localStorage.removeItem('adminInfo')
          delete axios.defaults.headers.common['Authorization']
          resolve()
      })
    },
      updateAccount({commit}, newaccount){
        return new Promise((resolve, reject) => {
          let account = JSON.stringify(newaccount)
          localStorage.setItem('account', account)
          commit('update_account', account)
          resolve()
        })
      },
      updateAdminInfo({
        commit
      }, newInfo) {
        return new Promise((resolve, reject) => {
          let adminInfo = JSON.parse(this.state.adminInfo)
          adminInfo.username = newInfo
          let updatedInfo = JSON.stringify(adminInfo)
          localStorage.setItem('adminInfo', updatedInfo)
          commit('update_admininfo', updatedInfo)
          resolve()
        })
      }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    isAdminLoggedIn: state => !!state.admintoken,
    authStatus: state => state.status,
  }
})
