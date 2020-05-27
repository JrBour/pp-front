<template>
  <EventForm :general-error="generalError" @submit-event="submitEvent" />
</template>
<script>
import Cookies from 'js-cookie'
import EventForm from '~/components/eventForm'
import axiosHelper from '~/lib/axiosHelper'
import parseToken from '~/utils/token'

export default {
  components: {
    EventForm
  },
  data: () => ({
    generalError: '',
    env: process.env.NODE_ENV
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
              event: `api/events/${eventResponse.data.id}`,
              is_read: false
            }
          })
      )

      if (this.env === 'production') {
        const currentUser = parseToken(Cookies.get('token')).user

        const includePlayerIds = this.$store.state.participants.filter(
          (participant) => participant.playerId !== null
        )

        try {
          const data = {
            app_id: process.env.NUXT_ENV_APP_ID,
            contents: {
              en: `Vous avez recu une nouvelle invitation de la part de ${currentUser.givenName} ${currentUser.lastName}`
            },
            headings: { en: 'Nouvelle invitation' },
            web_url: 'https://pp.jeremybourel.fr',
            include_player_ids: includePlayerIds
          }

          await axiosHelper({
            baseUrl: process.env.NUXT_ENV_ONESIGNAL_URL,
            url: 'notifications',
            method: 'post',
            data
          })
        } catch (e) {
          this.generalError =
            "Une erreur s'est produite, veuillez reessayer ulterieurement"
        }
      }

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
