export const state = () => ({
  switchedVenue: {},
  switchableVenues: []
})

export const mutations = {
  setSwitchedVenue(state, payload) {
    state.switchedVenue = payload
    localStorage.setItem('activeVenue', JSON.stringify(payload))
  },
  setSwitchableVenues(state, payload) {
    state.switchableVenues = payload
  }
}

export const getters = {
  getSwitchedVenue(state) {
    return state.switchedVenue
  },
  getSwitchableVenues(state) {
    return state.switchableVenues || []
  }
}
