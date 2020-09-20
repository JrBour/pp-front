<template>
  <EventForm
    :general-error="generalError"
    :loading="loading"
    :event="event"
    @submit-event="submitEvent"
  />
</template>
<script>
import Cookies from 'js-cookie'
import axiosHelper from '~/lib/axiosHelper'
import parseToken from '~/utils/token'

export default {
  data: () => ({
    generalError: '',
    event: null,
    loading: false,
    env: process.env.NODE_ENV,
    oneSignalUrl: process.env.NUXT_ENV_ONESIGNAL_URL
  }),
  mounted() {
    if (this.$store.state.event !== null) {
      this.event = this.$store.state.event
    }
  },
  methods: {
    async sendNotifications(currentUser, includePlayerIds) {
      try {
        const data = {
          app_id: process.env.NUXT_ENV_APP_ID,
          contents: {
            en: `Vous avez recu une nouvelle invitation de la part de ${currentUser.firstname} ${currentUser.lastname}`
          },
          headings: { en: 'Nouvelle invitation' },
          web_url: 'https://pp.jeremybourel.fr',
          include_player_ids: includePlayerIds
        }

        await axiosHelper({
          baseURL: this.oneSignalUrl,
          url: 'notifications',
          method: 'post',
          data
        })
      } catch (e) {
        this.loading = false
        this.generalError =
          "Une erreur s'est produite, veuillez réessayer ultérieurement"
      }
    },
    async createAgendaEvent(calendarId, event) {
      const data = {
        location: `${event.address}, ${event.zipcode} ${event.city}`,
        description: event.description,
        summary: event.name,
        creator: {
          email: this.$store.state.user.email,
          displayName: `${this.$store.state.user.firstname} ${this.$store.state.user.lastname}`
        },
        start: {
          dateTime: `${event.startAt.split('Z')[0]}+00:00`,
          timeZone: 'Europe/Paris'
        },
        end: {
          dateTime: `${event.endAt.split('Z')[0]}+00:00`,
          timeZone: 'Europe/Paris'
        }
      }
      try {
        await axiosHelper({
          baseURL: 'https://www.googleapis.com/',
          url: `calendar/v3/calendars/${calendarId}/events`,
          method: 'post',
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
          },
          data
        })
      } catch (e) {
        this.loading = false
        this.error = 'Une erreur est survenue'
      }
    },
    async submitEvent(event) {
      this.loading = true
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
          this.loading = false
          this.generalError =
            "Une erreur s'est produite, veuillez réessayer ultérieurement"
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
        this.loading = false
        this.generalError =
          "Une erreur s'est produite, veuillez réessayer ultérieurement"
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

      const currentUser = parseToken(Cookies.get('token')).user

      const includePlayerIds = this.$store.state.participants
        .filter((participant) => participant.playerId !== null)
        .map(({ playerId }) => playerId)

      if (this.env === 'production') {
        await this.sendNotifications(currentUser, includePlayerIds)
      }

      if (Cookies.get('calendar_id')) {
        await this.createAgendaEvent(Cookies.get('calendar_id'), data)
      }

      try {
        await Promise.all(userEvents)
        this.$router.push({
          name: 'event-id',
          params: { id: eventResponse.data.id }
        })
      } catch (e) {
        this.loading = false
        this.generalError =
          "Une erreur s'est produite, veuillez réessayer ultérieurement"
      }
    }
  }
}
</script>
