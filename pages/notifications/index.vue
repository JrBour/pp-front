<template>
  <div class="notifications">
    <h1>Notifications</h1>
    <p v-if="error">{{ error }}</p>
    <p v-else-if="$store.state.notifications === null">Chargement...</p>
    <div
      v-else-if="$store.state.notifications.length > 0"
      class="notifications__wrapper"
    >
      <Notification
        v-for="notification in $store.state.notifications"
        :key="notification.id"
        :event="notification.event"
        @submit-response="submitResponse"
      />
    </div>
    <p v-else>Vous n'avez pas de nouvelles notifications</p>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import Notification from '~/components/notification'
import axiosHelper from '~/lib/axiosHelper'
import parseToken from '~/utils/token'

export default {
  components: {
    Notification
  },
  data: () => ({
    error: ''
  }),
  async mounted() {
    const token = Cookies.get('token')
    if (this.$store.state.notifications === null) {
      try {
        const notifications = await axiosHelper({
          url: `api/user_events?user.id=${parseToken(token).id}&status=waiting`
        })
        this.$store.commit('addNotifications', notifications.data)
      } catch (e) {
        this.error = 'Une erreur est survenue, veuillez recharger la page'
      }
    }

    const unreadNotifications = this.$store.state.notifications
      .filter(({ isRead }) => isRead === false)
      .map(({ id }) => id)

    if (unreadNotifications.length !== 0) {
      const notificationsToPatch = unreadNotifications.map((id) =>
        axiosHelper({
          url: `api/user_events/${id}`,
          method: 'patch',
          data: {
            isRead: true
          }
        })
      )

      try {
        await Promise.all(notificationsToPatch)
        this.$store.commit('editNotificationProperty')
      } catch (e) {
        this.error = 'Une erreur est survenue, veuillez recharger la page'
      }
    }
  },
  methods: {
    async submitResponse(status, eventId) {
      const userEvent = this.$store.state.notifications.find(
        (userEvent) =>
          userEvent.user.id === this.$store.state.userId &&
          userEvent.event.id === eventId
      )
      try {
        await axiosHelper({
          url: `api/user_events/${userEvent.id}`,
          method: 'patch',
          data: {
            status
          }
        })
        this.$store.commit('removeNotification', userEvent.id)
      } catch (e) {
        this.error = 'Une erreur est survenue, veuillez recharger la page'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.notifications__wrapper {
  margin-top: 10vh;
}
</style>
