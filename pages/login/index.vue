<template>
  <div>
    <h1>Connexion</h1>
    <form class="login__form" @submit="submitForm">
      <Input
        id="mail"
        type="text"
        text="Email"
        name="email"
        :error="errors.email"
        :on-change="handleChangeField"
      />
      <Password :on-change="handleChangeField" :error="errors.password" />
      <p v-if="errors.general" class="error">{{ errors.general }}</p>
      <Button
        type="submit"
        text="Se connecter"
        :disabled="disabledSubmitButton"
      />
    </form>
    <p class="login__link"><n-link to="/register">Inscription</n-link></p>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import validateLoginField from '~/lib/validatorLogin'
import Button from '~/components/button'
import Input from '~/components/fields/input'
import Password from '~/components/fields/password'
import axiosHelper from '~/lib/axiosHelper'
import parseToken from '~/utils/token'

export default {
  components: {
    Input,
    Password,
    Button
  },
  data: () => ({
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
      general: ''
    }
  }),
  computed: {
    disabledSubmitButton() {
      if (this.email.length === 0 || this.password.length === 0) {
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
  watch: {
    $route(to, from) {
      if (from.hash) {
        const hashes = from.hash.split('&')
        Cookies.set('access_token', hashes[1].split('=')[1])
      }
    }
  },
  async beforeCreate() {
    if (Cookies.get('access_token')) {
      try {
        const calendars = await axiosHelper({
          baseURL: 'https://www.googleapis.com/',
          url: 'calendar/v3/users/me/calendarList',
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
          }
        })

        Cookies.set('calendar_id', calendars.data.items[0].id)
      } catch (e) {
        this.error = 'Une erreur est survenue'
      }
    }
    if (Cookies.get('token') !== '') {
      this.$router.push('events')
    }
  },
  methods: {
    handleChangeField(name, value) {
      this[name] = value
      this.errors[name] = validateLoginField(name, value)
    },
    async submitForm(e) {
      e.preventDefault()
      try {
        const {
          data: { token }
        } = await axiosHelper({
          url: 'login',
          method: 'post',
          data: {
            email: this.email,
            password: this.password
          }
        })

        Cookies.set('token', token)
        this.$store.commit('addJwt', token)
        this.$store.commit('addUser', parseToken(token).user)
        this.$router.push('events')
      } catch (e) {
        if (e.response.status === 401) {
          this.errors.general =
            "L'email et le mot de passe ne correspondent pas"
        }
      }

      const token = Cookies.get('token')
      try {
        const notifications = await axiosHelper({
          url: `api/user_events?user.id=${
            parseToken(token).user.id
          }&status=waiting`
        })
        this.$store.commit('addNotifications', notifications.data)
      } catch (e) {
        this.errors.general =
          'Une erreur est survenue, veuillez recharger la page'
      }
    }
  }
}
</script>

<style lang="css" scoped>
.login__form {
  position: relative;
  margin-top: 50vh;
}
.login__link {
  text-align: center;
  margin-bottom: 5vh;
}
</style>
