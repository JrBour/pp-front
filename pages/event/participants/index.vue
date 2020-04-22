<template>
  <div>
    <h1>Participants</h1>
    <img
      :src="require('~/static/img/icons/back.svg')"
      alt="back"
      @click="submitParticipants"
    />
    <div v-if="event !== null" class="participants">
      <User
        v-for="(participant, index) in participants"
        :key="index"
        :user="participant"
        :is-editable="removeParticipant(participant.id)"
      />
    </div>
    <div v-else class="loading">
      <p>Chargement...</p>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import parseJwt from '~/utils/token'
import User from '~/components/user'
import axiosHelper from '~/lib/axiosHelper'

export default {
  components: {
    User
  },
  data: () => ({
    event: null,
    error: null
  }),
  computed: {
    participants() {
      const participants = this.$store.state.participants
      return [...participants, this.event.author]
    },
    removeParticipant() {
      return (userId) => {
        const token = Cookies.get('token')
        return (
          parseJwt(token).id === this.event.author.id &&
          this.event.author.id !== userId
        )
      }
    }
  },
  async beforeCreate() {
    if (this.$store.state.participants.length === 0) {
      try {
        const event = await axiosHelper({
          url: `api/events/${this.$route.query.event}`
        })
        this.event = event.data
        const participants = event.data.userEvents.map(({ user }) => user)
        this.$store.commit('addParticipants', participants)
        this.$store.commit('addCurrentEvent', event.data)
      } catch (e) {
        this.error = "Une erreur s'est produite, veuillez rechargez la page"
      }
    }
  },
  methods: {
    async submitParticipants() {
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
            event: `api/events/${this.$route.query.event}`,
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
        params: { id: this.$route.query.event }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.loading {
  text-align: center;
}
.participants {
  display: flex;
  flex-wrap: wrap;
  margin-top: 4vh;
}
</style>
