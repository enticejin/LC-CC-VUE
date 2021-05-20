    import Vue from 'vue';
    import Vuex from 'vuex';
    import VueCookies from 'vue-cookies'
    import Base64 from './base64.js'
    Vue.use(Vuex);
    const state={
      isCollapse:false,
      userName: 'rtleapi',
      passWord: 'rtleapi',
      token: "Basic " + Base64.encode('rtleapi:rtleapi')
    }
    export default new Vuex.Store({
      state
    });
