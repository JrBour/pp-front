<template>
  <div class="expenses">
    <h1>Dépenses</h1>
    <img
      :src="require('~/static/img/icons/back.svg')"
      alt="back"
      @click="$router.go(-1)"
    />
    <div v-if="$store.state.currentEvent !== null" class="expenses__wrapper">
      <Expense
        v-for="expense in $store.state.currentEvent.expenses"
        :key="expense.id"
        :expense="expense"
      />
    </div>
  </div>
</template>
<script>
import Expense from '~/components/expense'
import axiosHelper from '~/lib/axiosHelper'

export default {
  components: {
    Expense
  },
  async beforeCreate() {
    if (this.$store.state.currentEvent === null) {
      try {
        const id = this.$route.params.id
        const event = await axiosHelper({
          url: `api/events/${id}`
        })
        this.$store.commit('addCurrentEvent', event.data)
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
