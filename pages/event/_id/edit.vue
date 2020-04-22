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
  async mounted() {
    if (
      parseInt(this.$route.params.id, 10) !== this.$store.state.currentEvent?.id
    ) {
      try {
        const event = await axiosHelper({
          url: `api/events/${this.$route.params.id}`
        })
        this.$store.commit('addCurrentEvent', event.data)
        const participants = event.data.userEvents.map(({ user }) => user)
        this.$store.commit('addParticipants', participants)
        this.event = event.data
      } catch (e) {
        this.error = "Une erreur s'est produite, veuillez recharger la page"
      }
    } else {
      this.event = this.$store.state.currentEvent
    }
  },
  methods: {
    async submitEvent(event) {
      let imageId
      if (event.image !== null && event.cover instanceof File) {
        const formData = new FormData()
        formData.append('file', event.cover)

        try {
          imageId = await axiosHelper({
            url: 'api/media_objects',
            method: 'post',
            data: formData
          })
        } catch (e) {
          this.generalError =
            "Une erreur s'est produite, veuillez reessayer ulterieurement"
        }
      }

      let data = {
        name: event.name,
        description: event.description,
        address: event.address,
        city: event.city,
        zipcode: parseInt(event.zipcode, 10),
        startAt: event.startAt,
        endAt: event.endAt,
        shareFees: event.shareFees,
        author: event.author
      }
      if (imageId) {
        data = { ...data, image: `api/media_objects/${imageId.data.id}` }
      }

      try {
        await axiosHelper({
          url: `api/events/${this.$route.params.id}`,
          method: 'patch',
          data
        })
      } catch (e) {
        this.generalError =
          "Une erreur s'est produite, veuillez reessayer ulterieurement"
      }

      const participants = this.$store.state.participants
      const userEvents = this.$store.state.currentEvent.userEvents
      const participantsToAdd = participants.filter(
        ({ id: participantId }) =>
          !userEvents.find(({ user: { id } }) => id === participantId)
      )

      const participantsToRemove = userEvents.filter(
        ({ user: { id } }) =>
          !participants.find(({ id: participantId }) => id === participantId)
      )

      const userEventsToCreate = participantsToAdd.map(({ id }) =>
        axiosHelper({
          url: 'api/user_events',
          method: 'POST',
          data: {
            status: 'waiting',
            event: `api/events/${this.$route.params.id}`,
            user: `api/users/${id}`
          }
        })
      )
      const userEventsToDelete = participantsToRemove.map(({ id }) =>
        axiosHelper({
          url: `api/user_events/${id}`,
          method: 'DELETE'
        })
      )

      await Promise.all(userEventsToDelete)
      await Promise.all(userEventsToCreate)
      this.$router.push({
        name: 'event-id',
        params: { id: this.$route.params.id }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
