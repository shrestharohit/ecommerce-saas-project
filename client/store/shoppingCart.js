export const state = () => ({
  serviceShortlist: []
})

export const mutations = {
  addToServiceShortlist(state, payload) {
    state.serviceShortlist.push(payload)
  },
  removeFromServiceShortlist(state, payload) {
    const service = state.serviceShortlist.find(each => each.id === payload.id)
    state.serviceShortlist.splice(state.serviceShortlist.indexOf(service), 1)
  }
}

export const getters = {
  isShortlistedService: state => id => {
    return state.serviceShortlist.find(o => o.id === id)
  },
  shortlistedServiceCount(state) {
    return state.serviceShortlist.length
  },
  hasShortlistedService(state) {
    return !!state.serviceShortlist.length
  },
  shortlistedServiceTotalPrice(state) {
    return state.serviceShortlist
      .map(x => x.real_price)
      .reduce((a, b) => a + b, 0)
  }
}

export const actions = {
  addToServiceShortlist({ commit }, payload) {
    commit('addToServiceShortlist', payload)
  },
  removeFromServiceShortlist({ commit }, payload) {
    commit('removeFromServiceShortlist', payload)
  }
}
