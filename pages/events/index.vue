<template>
  <div class="events__container">
    <h1>Événements</h1>
    <div class="events__wrapper">
      <SegmentedControl
        first="Prochains"
        second="Passés"
        :status="status"
        @get-segment="changeStatus"
      />
      <div v-if="events !== null && events.length === 0">
        <p>Vous n'avez aucun événement à afficher</p>
      </div>
      <div v-else-if="loading" class="events__loader">
        <Loader height="100px" />
      </div>
      <div v-else class="events__list">
        <Event
          v-for="event in events"
          :key="event.id"
          :event="event"
          @remove-event="removeEvent"
        />
      </div>
    </div>
    <button class="events__button_add" @click="addEvent">
      +
    </button>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import axiosHelper from '~/lib/axiosHelper'
import parseToken from '~/utils/token'

export default {
  middleware: 'authenticated',
  async fetch() {
    const currentUser = parseToken(Cookies.get('token')).user
    if (this.$store.state.event !== null) {
      this.$store.commit('resetEvent')
    }

    if (currentUser.playerId === null && this.env === 'production') {
      const playerId = await window.OneSignal.getUserId()
      try {
        await axiosHelper({
          url: `api/users/${currentUser.id}`,
          method: 'PATCH',
          data: {
            playerId
          }
        })
      } catch (e) {
        this.error = 'Une erreure est survenue'
      }
    }

    this.$OneSignal.push(() => {
      this.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
        if (isEnabled) {
          console.log('Push notifications are enabled!')
        } else {
          console.log('Push notifications are not enabled yet.')
        }
      })
    })

    // Get currentUser.id

    await this.getEvents(currentUser)
  },
  data: () => ({
    events: null,
    date: null,
    month: null,
    status: 'Prochains',
    loading: false,
    userId: null,
    error: '',
    env: process.env.NODE_ENV
  }),
  methods: {
    async getEvents(currentUser) {
      this.loading = true
      try {
        this.userId = currentUser.id
        this.date = new Date()
        const currentMonth = this.date.getMonth() + 1
        this.month =
          currentMonth.length === 1 ? `0${currentMonth}` : currentMonth

        const eventsFromUserEvents = await axiosHelper({
          url: `api/events?userEvents.user.id=${
            this.userId
          }&userEvents.status=accept&startAt[after]=${this.date.getFullYear()}-${
            this.month
          }-${this.date.getDate()}`
        })

        const eventsFromAuthor = await axiosHelper({
          url: `api/events?author.id=${
            this.userId
          }&startAt[after]=${this.date.getFullYear()}-${
            this.month
          }-${this.date.getDate()}`
        })
        this.events = this.handleEvent(eventsFromAuthor, eventsFromUserEvents)
        this.$store.commit('addEvents', this.events)

        const currentDate = Date.now()
        const eventOccuring = this.events.find(({ startAt, endAt }) => {
          return (
            new Date(startAt).getTime() < currentDate &&
            new Date(endAt).getTime() > currentDate
          )
        })
        if (eventOccuring) {
          this.$store.commit('addEventOccuring', eventOccuring)
        }
      } catch (e) {
        this.error = e
      }
      this.loading = false
    },
    async removeEvent(eventId) {
      try {
        await axiosHelper({
          url: `api/events/${eventId}`,
          method: 'DELETE'
        })
        const currentUser = parseToken(Cookies.get('token')).user
        await this.getEvents(currentUser)
      } catch (e) {
        this.error =
          "Une erreur est survenue lors de la supression de l'evenement, veuillez reessayer"
      }
    },
    addEvent() {
      this.$store.commit('resetEvents')
      this.$store.commit('resetParticipants')
      this.$router.push('/event/create')
    },
    handleEvent(eventsFromAuthor, eventsFromUserEvents) {
      let events = []
      const eventFromAuthorId = eventsFromAuthor.data.map(({ id }) => id)

      events = eventsFromUserEvents.data.filter(
        ({ id }) => !eventFromAuthorId.includes(id)
      )

      events = [...events, ...eventsFromAuthor.data]
      return events.sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      )
    },
    async changeStatus(status) {
      this.loading = true
      this.status = status

      if (status === 'Prochains') {
        this.events = this.$store.state.events
      } else if (this.$store.state.pastEvents.length === 0) {
        try {
          const eventsFromUserEvents = await axiosHelper({
            url: `api/events?userEvents.user.id=${
              this.userId
            }&endAt[before]=${this.date.getFullYear()}-${
              this.month
            }-${this.date.getDate()}`
          })
          const eventsFromAuthor = await axiosHelper({
            url: `api/events?author.id=${
              this.userId
            }&endAt[before]=${this.date.getFullYear()}-${
              this.month
            }-${this.date.getDate()}`
          })

          this.events = this.handleEvent(eventsFromAuthor, eventsFromUserEvents)
          this.$store.commit('addPastEvents', this.events)
        } catch (e) {
          this.error = "Une erreur s'est produite, veuillez recharger la page"
        }
      } else {
        this.events = this.$store.state.pastEvents
      }
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.events__list {
  min-height: 70vh;
  padding-bottom: 13vh;
}
.events__loader {
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.events__button_add {
  position: fixed;
  bottom: 10vh;
  right: 10vw;
  height: 1.3em;
  width: 1.3em;
  border: none;
  font-size: 2em;
  border-radius: 50%;
  color: white;
  background: #3750b2;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);

  &:after {
    content: '';
    position: absolute;
    height: 1.8em;
    width: 1.8em;
    z-index: -1;
    background: rgba(55, 80, 178, 0.2);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  }
}
</style>
