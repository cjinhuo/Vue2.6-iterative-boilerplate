const UPDATE_STATE = 'UPDATE_STATE'
export default {
  namespaced: true,
  state: {
    info: {
      userInfo: {
        userId: null,
        name: '',
        mobile: '',
        type: null
      },
      enterpriseInfo: {
        id: null,
        name: ''
      }
    }
  },
  mutations: {
    [UPDATE_STATE](state, { payload, statePropertyToAlter }) {
      state[statePropertyToAlter] = payload
    }
  },
  actions: {
    getUserInfo({ commit }, payload) {
      // todo 获取用户信息
      commit({
        type: UPDATE_STATE,
        statePropertyToAlter: 'userInfo',
        payload: {}
      })
    }
  }
}
