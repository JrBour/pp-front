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
      <p v-else-if="loading">Chargement...</p>
      <div v-else class="events__list">
        <Event v-for="event in events" :key="event.id" :event="event" />
      </div>
    </div>
    <button class="events__button_add" @click="addEvent">
      +
    </button>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import Event from '~/components/event'
import SegmentedControl from '~/components/segmentedControl'
import axiosHelper from '~/lib/axiosHelper'
import parseToken from '~/utils/token'

export default {
  components: {
    Event,
    SegmentedControl
  },
  middleware: 'authenticated',
  data: () => ({
    events: null,
    date: null,
    month: null,
    status: 'Prochains',
    loading: false,
    userId: null,
    error: ''
  }),
  async beforeCreate() {
    await this.$OneSignal.getUserId()

    this.$OneSignal.push(() => {
      this.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
        if (isEnabled) {
          console.log('Push notifications are enabled!')
        } else {
          console.log('Push notifications are not enabled yet.')
        }
      })
    })
  },
  async mounted() {
    this.loading = true
    try {
      this.userId = parseToken(Cookies.get('token')).id
      this.date = new Date()
      this.month =
        this.date.getMonth().length === 1
          ? `0${this.date.getMonth()}`
          : this.date.getMonth()

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
    } catch (e) {
      this.error = e
    }
    this.loading = false
  },
  methods: {
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
