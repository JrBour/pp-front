<template>
  <div>
    <div v-if="event === null">
      Chargement...
      <p v-if="errors.general">{{ errors.general }}</p>
    </div>
    <div v-else class="event__wrapper">
      <Modal
        v-if="displayModal"
        text="Souhaitez-vous supprimer cette evenement ?"
        @confirm="confirmRemoveEvent"
        @cancel="cancel"
      />
      <Modal
        v-if="displayModalExpense"
        text="Souhaitez-vous supprimer cette depense ?"
        @confirm="confirmRemoveExpense"
        @cancel="cancel"
      />
      <div class="event__title">
        <h1>{{ event.name }}</h1>
      </div>
      <div v-if="showActionButton" class="event__action">
        <img
          :src="require('~/static/img/icons/pencil.svg')"
          alt="pencil"
          @click="
            $router.push({
              name: 'event-id-edit',
              params: { id: $route.params.id }
            })
          "
        />
        <img
          :src="require('~/static/img/icons/trash.svg')"
          alt="trash"
          @click="displayModal = true"
        />
      </div>
      <div
        v-if="event.image"
        class="event__cover"
        :style="{
          backgroundImage: `url(${baseUrl}/media/${event.image.filePath})`
        }"
      ></div>
      <div v-if="displayInvitation" class="event__invitations">
        <h3>Souhaitez-vous accepter l'invitation à cet événement ?</h3>
        <div class="event__invitations_actions">
          <button
            class="event__invitations_deny"
            @click="submitResponse('deny')"
          >
            Refuser
          </button>
          <button
            class="event__invitations_accept"
            @click="submitResponse('accept')"
          >
            Accepter
          </button>
        </div>
      </div>
      <div class="event__informations">
        <h2>Informations</h2>
        <p class="event__informations_description">{{ event.description }}</p>
        <div class="event__informations_address">
          <img
            :src="require('~/static/img/icons/calendar.svg')"
            alt="calendar"
          />
          <p>{{ event.address }}, {{ event.zipcode }}, {{ event.city }}</p>
        </div>
        <div class="event__informations_date">
          <img :src="require('~/static/img/icons/place.svg')" alt="place" />
          <p>
            <span>{{ date }}</span> {{ hours }}
          </p>
        </div>
      </div>
      <div class="event__participants">
        <div class="event__participants_title">
          <h2>
            Participants <span>({{ event.userEvents.length + 1 }})</span>
          </h2>
          <AddButton
            v-if="showActionButton"
            @handle-click="
              $router.push({
                name: 'event-search-participants',
                query: { event: event.id }
              })
            "
          />
        </div>
        <div class="event__participants_wrapper">
          <User
            v-for="(participant, index) in participants"
            :key="index"
            :user="participant"
            :is-editable="removeParticipant(participant.id)"
          />
        </div>
        <Button
          text="Voir tous les participants"
          :small="true"
          @handle-click="
            $router.push({
              name: 'event-participants',
              query: { event: $route.params.id }
            })
          "
        />
      </div>
      <div v-if="event.shareFees" class="event__expenses">
        <div class="event__expenses_title">
          <h2>Depenses</h2>
          <AddButton
            @handle-click="
              $router.push(`/event/${$route.params.id}/expenses/create`)
            "
          />
        </div>
        <div>
          <Expense
            v-for="expense in expenses"
            :key="expense.id"
            :expense="expense"
            :can-remove-expense="canRemoveExpense(expense.user.id)"
            @remove-expense="removeExpense"
          />
        </div>
        <Button
          text="Voir toutes les depenses"
          :small="true"
          @handle-click="$router.push(`/event/${$route.params.id}/expenses`)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import axiosHelper from '~/lib/axiosHelper'
import AddButton from '~/components/addButton'
import Modal from '~/components/modal'
import User from '~/components/user'
import Button from '~/components/button'
import Expense from '~/components/expense'
import { days, months } from '~/constants/date'
import parseJwt from '~/utils/token'

export default {
  layout: 'noBorder',
  components: {
    AddButton,
    Button,
    Expense,
    Modal,
    User
  },
  data: () => ({
    event: null,
    expenseId: null,
    displayModalExpense: false,
    displayModal: false,
    baseUrl: process.env.NUXT_ENV_API_URL,
    errors: {
      general: ''
    }
  }),
  computed: {
    date() {
      const date = new Date(this.event.startAt)
      const day = days[date.getDay()]
      const month = months[date.getMonth()]

      return `${day} ${date.getDate()} ${month}`
    },
    expenses() {
      if (this.event.expenses.length > 3) {
        return this.event.expenses.filter((expense, index) => index < 3)
      }

      return this.event.expenses
    },
    hours() {
      const start = new Date(this.event.startAt)
      const end = new Date(this.event.endAt)

      return `${start.getHours()}h${start.getMinutes()} - ${end.getHours()}h${end.getMinutes()}`
    },
    canRemoveExpense() {
      return (userId) => {
        const token = Cookies.get('token')
        return (
          parseJwt(token).id === this.event.author.id ||
          parseJwt(token).id === userId
        )
      }
    },
    removeParticipant() {
      return (userId) => {
        const token = Cookies.get('token')
        return (
          parseJwt(token).id === this.event.author.id &&
          this.event.author.id !== userId
        )
      }
    },
    displayInvitation() {
      const token = Cookies.get('token')
      const invitation = this.event.userEvents.find(
        ({ user }) => user.id === parseJwt(token).id
      )
      if (invitation === undefined) {
        return false
      }

      return invitation.status === 'waiting'
    },
    showActionButton() {
      const token = Cookies.get('token')
      return parseJwt(token).id === this.event.author.id
    },
    participants() {
      const participants = this.event.userEvents
        .map(({ user }) => user)
        .filter((userEvent, index) => index <= 10)
      return [...participants, this.event.author]
    }
  },
  async mounted() {
    const id = this.$router.history.current.params.id
    if (this.$store.state.currentEvent === null) {
      try {
        const event = await axiosHelper({
          url: `api/events/${id}`
        })
        this.event = event.data
        const participants = event.data.userEvents.map(({ user }) => user)
        this.$store.commit('addCurrentEvent', this.event)
        this.$store.commit('addParticipants', participants)
      } catch (e) {
        this.errors.general = "Une erreur s'est produite"
      }
    } else {
      this.event = this.$store.state.currentEvent
    }
  },
  methods: {
    removeExpense(expenseId) {
      this.expenseId = expenseId
      this.displayModalExpense = true
    },
    async confirmRemoveExpense() {
      this.displayModalExpense = false
      try {
        await axiosHelper({
          url: `api/expenses/${this.expenseId}`,
          method: 'delete'
        })
        const event = await axiosHelper({
          url: `api/events/${this.$route.params.id}`
        })
        this.$store.commit('addCurrentEvent', event.data)
        this.event = event.data
      } catch (e) {
        this.errors.general =
          "Une erreur s'est produite, veuillez rechargez la page"
      }
    },
    async submitResponse(status) {
      const token = Cookies.get('token')
      const userEvent = this.event.userEvents.find(
        ({ user }) => user.id === parseJwt(token).id
      )
      try {
        await axiosHelper({
          url: `api/user_events/${userEvent.id}`,
          method: 'patch',
          data: {
            status
          }
        })
        if (status === 'accept') {
          this.$router.push({
            name: 'event-id',
            params: { id: this.$route.params.id }
          })
        } else {
          this.$router.push({ name: 'notifications' })
        }
      } catch (e) {
        this.errors.general =
          'Une erreur est survenue, veuillez recharger la page'
      }
    },
    async confirmRemoveEvent() {
      this.displayModal = false
      try {
        await axiosHelper({
          url: `api/events/${this.$route.params.id}`,
          method: 'delete'
        })
        this.$router.push({ name: 'events' })
      } catch (e) {
        this.errors.general =
          'Une erreur est survenue, veuillez rechargez la page et réessayer'
      }
    },
    cancel() {
      this.displayModal = false
      this.displayModalExpense = false
    },
    pushToEditPage() {
      this.$router.push({
        name: 'event-id-edit',
        params: { id: this.$route.params.id }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.event__invitations {
  padding: 2em;
  margin: 4vh 0;
  background: #fff;
  & h3 {
    text-align: center;
    font-size: 1.1em;
    font-weight: 500;
    margin-bottom: 3vh;
  }
}
.event__invitations_actions {
  display: flex;
  justify-content: space-between;
}
.event__invitations_deny,
.event__invitations_accept {
  width: 45%;
  padding: 10px 0;
  border-radius: 10px;
}
.event__invitations_deny {
  color: #ff0000;
  border: 2px solid #ff0000;
  background: transparent;
}
.event__invitations_accept {
  color: #fff;
  background: #3750b2;
  border: none;
}

.event__title {
  min-height: 18vh;
}
.event__informations,
.event__participants,
.event__expenses {
  width: 100%;
  background: white;
  padding: 1.5em;
}
.event__participants_wrapper {
  display: flex;
  flex-wrap: wrap;
}
.event__participants,
.event__expenses {
  margin: 3vh 0;
}
.event__informations_description {
  margin-left: 3vw;
}
.event__action {
  display: flex;
  margin: 2vh 5vw;
  justify-content: flex-start;
  & img {
    margin-left: 2vw;
  }
}
.event__informations_date,
.event__informations_address {
  display: flex;
  align-items: center;
  margin-top: 2vh;
  margin-left: 3vw;
  & p {
    margin-left: 5vw;
    font-size: 1em;
  }
  & span {
    font-weight: 500;
  }
}
h2 {
  font-size: 1.3em;
  margin-bottom: 3vh;
  font-weight: 500;
  & span {
    font-weight: 300;
    font-size: 0.9em;
  }
}
.event__participants_title,
.event__expenses_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5vh;
  & h2 {
    margin-bottom: 0;
  }
}
.event__cover {
  width: 100%;
  height: 30vh;
  margin-bottom: 5vh;
  margin-top: 4vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.event__wrapper {
  margin-bottom: 10vh;
}
</style>
