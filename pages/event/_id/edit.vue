<template>
  <div>
    <EventForm
      v-if="error === ''"
      :general-error="generalError"
      :event="event"
      @submit-event="submitEvent"
    />
    <p v-else>{{ error }}</p>
  </div>
</template>
<script>
import EventForm from '~/components/eventForm'
import axiosHelper from '~/lib/axiosHelper'

export default {
  components: {
    EventForm
  },
  data: () => ({
    event: null,
    error: '',
    generalError: ''
  }),
  async beforeCreate() {
    if (this.$route.params.id !== this.$store.state.currentEvent?.id) {
      try {
        const event = await axiosHelper({
          url: `api/events/${this.$route.params.id}`
        })
        this.$store.commit('addCurrentEvent', event.data)
        this.event = event.data
      } catch (e) {
        this.error = "Une erreur s'est produite, veuillez recharger la page"
      }
    }
  },
  methods: {
    async submitEvent(event) {
      let imageId, eventResponse
      if (event.image !== '') {
        const formData = new FormData()
        formData.append('file', event.cover)

        try {
          imageId = await axiosHelper({
            url: 'api/media_objects',
            method: 'patch',
            data: formData
          })
        } catch (e) {
          this.errors.general =
            "Une erreur s'est produite, veuillez reessayer ulterieurement"
        }
      }
      const data = {
        name: event.name,
        description: event.description,
        address: event.address,
        city: event.city,
        zipcode: parseInt(event.zipcode, 10),
        startAt: event.startAt,
        endAt: event.endAt,
        shareFees: event.showExpense === 'yes',
        image: imageId ? `api/media_objects/${imageId.data.id}` : null,
        author: event.author
      }

      try {
        eventResponse = await axiosHelper({
          url: 'api/events',
          method: 'post',
          data
        })
      } catch (e) {
        this.generalError =
          "Une erreur s'est produite, veuillez reessayer ulterieurement"
      }

      const userEvents = this.$store.state.participants.map(
        (participant, index) =>
          axiosHelper({
            url: 'api/user_events',
            method: 'post',
            data: {
              status: 'waiting',
              user: `api/users/${participant.id}`,
              event: `api/events/${eventResponse.data.id}`
            }
          })
      )
      try {
        await Promise.all(userEvents)
        this.$router.push({
          name: 'event-id',
          params: { id: eventResponse.data.id }
        })
      } catch (e) {
        this.generalError =
          "Une erreur s'est produite, veuillez reessayer ulterieurement"
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
