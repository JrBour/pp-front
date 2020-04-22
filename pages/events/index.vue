<template>
  <div class="events__container">
    <h1>Événements</h1>
    <div class="events__wrapper">
      <SegmentedControl first="Prochains" second="Passés" />
      <div v-if="events !== null && events.length === 0">
        <p>Vous n'avez aucun événement de prévu</p>
      </div>
      <div v-else class="events__list">
        <Event v-for="event in events" :key="event.id" :event="event" />
      </div>
    </div>
    <button class="events__button_add" @click="$router.push('/event/create')">
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
    error: ''
  }),
  async mounted() {
    let events = []
    try {
      const userId = parseToken(Cookies.get('token')).id
      const date = new Date()

      const eventsFromUserEvents = await axiosHelper({
        url: `api/events?userEvents.user.id=${userId}&start_at[after]=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      })
      const eventsFromAuthor = await axiosHelper({
        url: `api/events?author.id=${userId}&start_at[after]=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      })
      const eventFromAuthorId = eventsFromAuthor.data.map(({ id }) => id)

      events = eventsFromUserEvents.data.filter(
        ({ id }) => !eventFromAuthorId.includes(id)
      )

      events = [...events, ...eventsFromAuthor.data]
      this.events = events.sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      )
    } catch (e) {
      this.error = e
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
