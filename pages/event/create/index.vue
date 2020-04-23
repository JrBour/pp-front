<template>
  <EventForm :general-error="generalError" @submit-event="submitEvent" />
</template>
<script>
import EventForm from '~/components/eventForm'
import axiosHelper from '~/lib/axiosHelper'

export default {
  components: {
    EventForm
  },
  data: () => ({
    generalError: ''
  }),
  methods: {
    async submitEvent(event) {
      let imageId, eventResponse
      if (event.image !== '') {
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
      const data = {
        name: event.name,
        description: event.description,
        address: event.address,
        city: event.city,
        zipcode: parseInt(event.zipcode, 10),
        startAt: event.startAt,
        endAt: event.endAt,
        shareFees: event.shareFees,
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
