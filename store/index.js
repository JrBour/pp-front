export const state = () => ({
  jwt: null,
  currentUser: null,
  userId: null,
  currentEvent: null,
  events: [],
  pastEvents: [],
  participants: [],
  notifications: null
})

export const mutations = {
  addJwt(state, jwt) {
    state.jwt = jwt
  },
  addCurrentUser(state, currentUser) {
    state.currentUser = currentUser
  },
  resetCurrentUser(state) {
    state.currentUser = null
  },
  addUserId(state, id) {
    state.userId = id
  },
  resetJwt(state) {
    state.jwt = null
  },
  addNotifications(state, notifications) {
    state.notifications = notifications
  },
  editNotificationProperty(state) {
    state.notifications = state.notifications.map((notification) => ({
      ...notification,
      isRead: true
    }))
  },
  removeNotification(state, userEventId) {
    state.notifications = state.notifications.filter(
      ({ id }) => id !== userEventId
    )
  },
  resetNotifications(state) {
    state.notifications = null
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
