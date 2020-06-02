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
    clientId: process.env.NUXT_ENV_GOOGLE_CLIENT_ID,
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
  beforeMount() {
    this.oauthSignIn()
  },
  beforeCreate() {
    if (Cookies.get('token') !== '') {
      this.$router.push('events')
    }
  },
  methods: {
    oauthSignIn() {
      // Google's OAuth 2.0 endpoint for requesting an access token
      const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'

      // Create <form> element to submit parameters to OAuth 2.0 endpoint.
      const form = document.createElement('form')
      form.setAttribute('method', 'GET') // Send as a GET request.
      form.setAttribute('action', oauth2Endpoint)

      // Parameters to pass to OAuth 2.0 endpoint.
      const params = {
        client_id: this.clientId,
        redirect_uri: 'https://pp.jeremybourel.fr/login',
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
        include_granted_scopes: 'true',
        state: 'pass-through value'
      }

      // Add form parameters as hidden input values.
      for (const p in params) {
        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', p)
        input.setAttribute('value', params[p])
        form.appendChild(input)
      }

      // Add form to page and submit it to open the OAuth 2.0 endpoint.
      document.body.appendChild(form)
      form.submit()
    },
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
