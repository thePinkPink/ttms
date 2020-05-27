import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      islog: null,
      nowUser: {
      }
    },
    nowUser: {},
    islog: null
  },
  mutations: {
    SIGN_IN(state,{value}) {
      state.user.islog = true;
      state.user.nowUser = value;
      state.nowUser = value;
      state.islog = true;
     // console.log(state.user.nowUser)
    },
    SIGN_OUT(state) {
      state.user.islog = false;
      state.user.nowUser = {};
      state.nowUser = {};
      state.islog = false;
    }
  },
  actions: {
    SignIn({ commit },value) {
      axios.get('http://sso.ptt.com/user/token/' + value)
        .then(function (response) {
          let value = response.data;
          commit('SIGN_IN',{value});
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    SignOut({ commit }) {
      commit('SIGN_OUT');
    }
  }
})
