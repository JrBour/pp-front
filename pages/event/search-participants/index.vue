<template>
  <div class="search">
    <img
      :src="require('~/static/img/icons/back.svg')"
      alt="back"
      @click="$router.push({ name: 'event-create' })"
    />
    <SegmentedControl
      first="Recherche"
      second="Invités"
      @get-segment="changeStatus"
    />
    <div v-if="status === 'Recherche'">
      <Input
        id="search"
        type="search"
        text="Rechercher par prenom et nom"
        name="search"
        :error="errors.search"
        :on-change="handleChangeField"
        :small="true"
        :required="false"
      />
      <Participant
        v-for="participant in participants"
        :key="participant.id"
        :user="participant"
        @add-partcipant="addParticipant"
      />
    </div>
    <div v-else>
      <p
        v-if="$store.state.participants.length === 0"
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
import Input from '~/components/fields/input'
import User from '~/components/user'
import Participant from '~/components/participant'
import SegmentedControl from '~/components/segmentedControl'
import axiosHelper from '~/lib/axiosHelper'

export default {
  components: {
    User,
    Input,
    Participant,
    SegmentedControl
  },
  data: () => ({
    search: '',
    status: 'Recherche',
    participants: [],
    errors: {
      search: ''
    }
  }),
  middleware: 'authenticated',
  methods: {
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
        try {
          response = await axiosHelper({
            url: `api/users?givenName=${valueHasSpace[0]}&lastName=${valueHasSpace[1]}`
          })
        } catch (e) {
          this.errors.general =
            'Une erreur est survenur, veuillez reessayer plus tard'
        }
        this.participants = response.data
      } else if (value.length > 3) {
        try {
          response = await axiosHelper({
            url: `api/users?givenName=${value}`
          })
        } catch (e) {
          this.errors.general =
            'Une erreur est survenur, veuillez reessayer plus tard'
        }
        this.participants = response.data
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
.search {
  margin-top: 10vh;
}
</style>