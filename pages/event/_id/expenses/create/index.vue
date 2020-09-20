<template>
  <div>
    <h1>Nouvelle<br />depense</h1>
    <form @submit="handleSubmit">
      <Input
        id="title"
        type="text"
        text="Titre"
        name="title"
        :error="errors.title"
        :on-change="handleChangeField"
      />
      <Input
        id="amount"
        type="number"
        text="Montant"
        name="amount"
        step="0.01"
        :error="errors.amount"
        :on-change="handleChangeField"
      />
      <p v-if="errors.general">{{ errors.general }}</p>
      <Button
        type="submit"
        text="Creer"
        :loading="loading"
        :disabled="disabledSubmitButton"
      />
    </form>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { validateExpenseField } from './validator'
import parseJwt from '~/utils/token'
import axiosHelper from '~/lib/axiosHelper'

export default {
  data: () => ({
    amount: '',
    loading: false,
    title: '',
    errors: {
      amount: '',
      title: '',
      general: ''
    }
  }),
  computed: {
    disabledSubmitButton() {
      if (this.title.length === 0 || this.amount.length === 0) {
        return true
      }

      const errorsToCheck = { ...this.errors }
      delete errorsToCheck.general
      const checkError = Object.values(errorsToCheck).some(
        (value) => value !== ''
      )
      if (checkError) {
        return true
      }
      return false
    }
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      this.loading = true
      const data = {
        name: this.title,
        amount: parseFloat(this.amount),
        event: `api/events/${this.$route.params.id}`,
        user: `api/users/${parseJwt(Cookies.get('token')).user.id}`
      }

      try {
        await axiosHelper({
          url: 'api/expenses',
          method: 'post',
          data
        })
        this.$router.push({
          name: 'event-id',
          params: { id: this.$route.params.id }
        })
      } catch (e) {
        this.loading = false
        this.errors.general =
          "Une erreur s'est produite, veuillez recharger la page"
      }
    },
    handleChangeField(name, value) {
      this[name] = value
      this.errors[name] = validateExpenseField(name, value)
    }
  }
}
</script>
<style lang="scss" scoped>
form {
  margin-top: 5vh;
}
</style>
