<template>
  <div class="search">
    <img
      :src="require('~/static/img/icons/back.svg')"
      alt="back"
      @click="submitParticipants"
    />
    <SegmentedControl
      first="Recherche"
      second="Invités"
      @get-segment="changeStatus"
    />
    <div v-if="status === 'Recherche'">
      <BaseInput
        id="search"
        type="search"
        text="Rechercher par prenom et nom"
        name="search"
        :error="errors.search"
        :on-change="handleChangeField"
        :small="true"
        :required="false"
      />
      <div v-if="loading && participants === null" class="participant__loader">
        <Loader height="100px" />
      </div>
      <div
        v-else-if="participants !== null && participants.length === 0"
        class="participant__error_search"
      >
        <p>Aucun resultat pour cette recherche</p>
      </div>
      <div v-else>
        <Participant
          v-for="participant in participants"
          :key="participant.id"
          :user="participant"
          :display-add-button="showAddButton(participant.id)"
          @add-partcipant="addParticipant"
        />
      </div>
    </div>
    <div v-else>
      <p
        v-if="
          typeof $store.state.participants === 'object' &&
            $store.state.participants.length === 0
        "
        class="participants__warning"
      >
        Vous n'avez pas encore ajoute de participants
      </p>
      <div v-else class="participants__wrapper">
        <User
          v-for="participant in $store.state.participants"
          :key="participant.id"
          :user="participant"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import axiosHelper from '~/lib/axiosHelper'
import parseToken from '~/utils/token'

export default {
  data: () => ({
    search: '',
    loading: false,
    status: 'Recherche',
    participants: null,
    errors: {
      search: ''
    }
  }),
  computed: {
    showAddButton() {
      return (userId) => {
        const currentUserId = parseToken(Cookies.get('token')).id
        return !(currentUserId === userId)
      }
    }
  },
  async beforeCreate() {
    if (
      this.$route.query.event &&
      this.$store.state.participants.length === 0
    ) {
      try {
        const event = await axiosHelper({
          url: `api/events/${this.$route.query.event}`
        })
        const participants = event.data.userEvents.map(({ user }) => user)
        this.$store.commit('addEvent', event.data)
        this.$store.commit('addParticipants', participants)
      } catch (e) {
        return e
      }
    }
  },
  middleware: 'authenticated',
  methods: {
    async submitParticipants() {
      if (this.$route.query.event) {
        const participants = this.$store.state.participants
        const userEvents = this.$store.state.event.userEvents
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
              user: `api/users/${id}`,
              is_read: false
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
      }
      this.$router.go(-1)
    },
    addParticipant(user) {
      this.$store.commit('addParticipant', user)
    },
    changeStatus(status) {
      this.status = status
    },
    async handleChangeField(name, value) {
      this[name] = value
      const valueHasSpace = value.split(' ')
      let response

      if (value.length > 3 && valueHasSpace.length > 1) {
        this.loading = true
        try {
          response = await axiosHelper({
            url: `api/users?givenName=${valueHasSpace[0]}&lastName=${valueHasSpace[1]}`
          })
        } catch (e) {
          this.loading = false
          this.errors.general =
            'Une erreur est survenue, veuillez réessayer plus tard'
        }
        this.loading = false
        this.participants = response.data
      } else if (value.length > 3) {
        this.loading = true

        try {
          response = await axiosHelper({
            url: `api/users?givenName=${value}`
          })
        } catch (e) {
          this.loading = false
          this.errors.general =
            'Une erreur est survenue, veuillez réessayer plus tard'
        }
        this.loading = false
        this.participants = response.data
      } else {
        this.participants = null
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.participants__wrapper {
  display: flex;
  flex-wrap: wrap;
}
.participant__error_search {
  text-align: center;
  margin-top: 20vh;
}
.participant__loader {
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search {
  margin-top: 10vh;
}
</style>
