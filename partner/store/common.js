export const state = () => ({
  key: false
})

export const mutations = {
  setKey(state, payload) {
    state.key = payload
  }
}

export const getters = {
  getKey(state) {
    return state.key
  }
}
