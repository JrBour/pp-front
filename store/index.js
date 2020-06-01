import Cookies from 'js-cookie'
import axiosHelper from '~/lib/axiosHelper'
import parseToken from '~/utils/token'

export const state = () => ({
  jwt: null,
  user: null,
  userId: null,
  event: null,
  events: null,
  albums: null,
  eventOccuring: null,
  pastEvents: [],
  participants: [],
  notifications: null
})

export const actions = {
  async addAlbums({ commit }) {
    const userId = parseToken(Cookies.get('token')).user.id
    const albumsByParticipant = await axiosHelper({
      url: `api/albums?event.userEvents.user.id=${userId}`
    })
    const albumsByAuthor = await axiosHelper({
      url: `api/albums?event.author.id=${userId}`
    })
    const albums = [...albumsByParticipant.data, ...albumsByAuthor.data]
    commit('addAlbums', albums)
  }
}

export const mutations = {
  addJwt(state, jwt) {
    state.jwt = jwt
  },
  addAlbums(state, albums) {
    state.albums = albums
  },
  addUser(state, user) {
    state.user = user
  },
  resetUser(state) {
    state.user = null
  },
  addEventOccuring(state, event) {
    state.eventOccuring = event
  },
  resetEventOccuring(state) {
    state.eventOccuring = null
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
  addEvent(state, event) {
    state.event = event
  },
  resetEvent(state) {
    state.event = null
  }
}
