// import
const UPDATE_STATE = 'UPDATE_STATE'
import { getRiskAssessmentTable } from '../services'
export default {
  namespaced: true,
  state: {},
  mutations: {
    [UPDATE_STATE](state, { payload, statePropertyToAlter }) {
      state[statePropertyToAlter] = payload
    }
  },
  actions: {
    async getRiskAssessmentTable(_, payload) {
      const res = await getRiskAssessmentTable(payload)
      return res
    }
  }
}
