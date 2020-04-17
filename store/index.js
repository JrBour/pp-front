export const state = () => ({
  jwt: null,
  currentEvent: null,
  events: [],
  participants: []
})

export const mutations = {
  addJwt(state, jwt) {
    state.jwt = jwt
  },
  resetJwt(state) {
    state.jwt = null
  },
  addParticipant(state, participant) {
    state.participants = [...state.participants, participant]
  },
  addParticipants(state, participants) {
    state.participants = participants
  },
  removeParticipant(state, id) {
    state.participants = state.participants.filter(
      (participant) => participant.id !== id
    )
  },
  addEvents(state, events) {
    state.events = [...state.events, ...events]
  },
  resetEvents(state) {
    state.events = []
  },
  addCurrentEvent(state, event) {
    state.event = event
  },
  resetCurrentEvent(state) {
    state.event = null
  }
}
