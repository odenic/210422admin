import { reqgetChartsData } from '@/api/charts'

const state = {
  data: {}
}

const actions = {
  async getChartsData({ commit }) {
    const res = await reqgetChartsData()
    commit('GET_CHARTS_DATA', res.data)
  }
}

const mutations = {
  GET_CHARTS_DATA(state, data) {
    state.data = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
