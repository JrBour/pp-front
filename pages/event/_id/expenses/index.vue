<template>
  <div class="expenses">
    <h1>Dépenses</h1>
    <img
      :src="require('~/static/img/icons/back.svg')"
      alt="back"
      @click="$router.go(-1)"
    />
    <p v-if="error">{{ error }}</p>
    <Modal
      v-if="displayModal"
      text="Souhaitez-vous supprimer cette depense ?"
      @confirm="confirmRemoveExpense"
      @cancel="cancel"
    />
    <div v-if="$store.state.event !== null" class="expenses__wrapper">
      <Expense
        v-for="expense in $store.state.event.expenses"
        :key="expense.id"
        :expense="expense"
        :can-remove-expense="canRemoveExpense(expense.user.id)"
        @remove-expense="removeExpense"
      />
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import Expense from '~/components/expense'
import Modal from '~/components/modal'
import axiosHelper from '~/lib/axiosHelper'
import parseJwt from '~/utils/token'

export default {
  components: {
    Modal,
    Expense
  },
  data: () => ({
    displayModal: false,
    error: '',
    expenseId: null
  }),
  computed: {
    canRemoveExpense() {
      return (userId) => {
        const token = Cookies.get('token')
        return (
          parseJwt(token).id === this.$store.state.event.author.id ||
          parseJwt(token).id === userId
        )
      }
    }
  },
  async beforeCreate() {
    if (this.$store.state.event === null) {
      try {
        const id = this.$route.params.id
        const event = await axiosHelper({
          url: `api/events/${id}`
        })
        this.$store.commit('addEvent', event.data)
      } catch (e) {
        this.error = 'Une erreur est survenue, veuillez rechargez la page'
      }
    }
  },
  methods: {
    removeExpense(expenseId) {
      this.expenseId = expenseId
      this.displayModal = true
    },
    cancel() {
      this.displayModal = false
    },
    async confirmRemoveExpense() {
      this.displayModal = false

      try {
        await axiosHelper({
          url: `api/expenses/${this.expenseId}`,
          method: 'delete'
        })
        const event = await axiosHelper({
          url: `api/events/${this.$route.params.id}`
        })
        this.$store.commit('addEvent', event.data)
      } catch (e) {
        this.error = 'Une erreur est survenue, veuillez rechargez la page'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.expenses {
  overflow: scroll;
  padding-bottom: 10vh;
}
.expenses__wrapper {
  margin-top: 10vh;
  padding: 10px 0;
}
</style>
