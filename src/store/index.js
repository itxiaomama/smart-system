import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    btnPermission: [],
    iscollapsed: false,
    userInfo: {},
    routeList: []
  },
  getters: {
  },
  mutations: {
    collapsed(state) {
      state.iscollapsed = !state.iscollapsed;
    },
    set_token(state, token) {
      state.token = token;
      localStorage.setItem('token', token)
      // storage.set('token', token);
    },
    del_token(state) {
      state.token = '';
      storage.remove('token');
    },
    set_permission(state, permission) {
      state.btnPermission = permission;
    },
    set_userInfo(state, userInfo) {
      state.userInfo = userInfo;
      storage.set('userInfo', userInfo);
    },
    set_routelist(state, routeList) {
      state.routeList = routeList;
      storage.set('routeList', routeList);
    }
  },
  actions: {
  },
  modules: {
  }
})
