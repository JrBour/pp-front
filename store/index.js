export const state = () => ({
  jwt: null,
  events: []
})

export const mutations = {
  addJwt(state, jwt) {
    state.jwt = jwt
  },
  resetJwt(state) {
    state.jwt = null
  },
  addEvents(state, events) {
    state.events = [...state.events, ...events]
  },
  resetEvents(state) {
    state.events = []
  }
}
