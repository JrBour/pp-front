export const state = () => ({
  jwt: null,
  currentEvent: null,
  events: [],
  pastEvents: [],
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
  resetParticipants(state) {
    state.participants = []
  },
  removeParticipant(state, id) {
    state.participants = state.participants.filter(
      (participant) => participant.id !== id
    )
  },
  addEvents(state, events) {
    state.events = events
  },
  resetEvents(state) {
    state.events = []
  },
  addPastEvents(state, events) {
    state.pastEvents = events
  },
  resetPastEvents(state) {
    state.pastEvents = []
  },
  addCurrentEvent(state, event) {
    state.currentEvent = event
  },
  resetCurrentEvent(state) {
    state.currentEvent = null
  }
}
