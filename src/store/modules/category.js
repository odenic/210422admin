import {
  reqgetCategory1,
  reqgetCategory2,
  reqgetCategory3
} from '@/api/catgory'

const state = {
  category1Id: '',
  category2Id: '',
  category3Id: '',
  category1List: [],
  category2List: [],
  category3List: []
}

const mutations = {
  GET_CATEGORY1: (state, data) => {
    state.category1List = data.data
  },
  GET_CATEGORY2: (state, { data, category1Id }) => {
    state.category2List = data.data
    state.category1Id = category1Id
    state.category2Id = ''
    state.category3Id = ''
    state.category3List = []
  },
  GET_CATEGORY3: (state, { data, category2Id }) => {
    state.category3List = data.data
    state.category2Id = category2Id
    state.category3Id = ''
  },
  SET_CATEGORY3ID: (state, id) => {
    state.category3Id = id
  }
}

const actions = {
  async getCategory1({ commit }) {
    const data = await reqgetCategory1()
    commit('GET_CATEGORY1', data)
  },
  async getCategory2({ commit }, category1Id) {
    const data = await reqgetCategory2(category1Id)
    commit('GET_CATEGORY2', { data, category1Id })
  },
  async getCategory3({ commit }, category2Id) {
    const data = await reqgetCategory3(category2Id)
    commit('GET_CATEGORY3', { data, category2Id })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
