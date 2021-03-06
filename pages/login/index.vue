<template>
  <div>
    <img :src="require('~/static/img/icons/logo.svg')" alt="Logo" />
    <ValidationObserver
      tag="form"
      class="login__form"
      @submit.prevent="submitForm"
    >
      <BaseInput
        type="text"
        text="Email"
        name="email"
        rules="email"
        :on-change="handleChangeField"
      />
      <Password
        name="password"
        :on-change="handleChangeField"
        rules="required"
      />
      <p v-if="error" class="error">{{ error }}</p>
      <BaseButton
        type="submit"
        text="Se connecter"
        :loading="loading"
        :disabled="disabledSubmitButton"
      />
    </ValidationObserver>
    <p class="login__link"><n-link to="/register">Inscription</n-link></p>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { ValidationObserver } from 'vee-validate'
import axiosHelper from '~/lib/axiosHelper'
import parseToken from '~/utils/token'

export default {
  components: {
    ValidationObserver
  },
  data: () => ({
    email: '',
    password: '',
    loading: false,
    baseUrl: process.env.BASE_URL,
    clientId: process.env.NUXT_ENV_GOOGLE_CLIENT_ID,
    clientSecret: process.env.NUXT_ENV_GOOGLE_CLIENT_SECRET,
    env: process.env.NODE_ENV,
    error: ''
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
  beforeMount() {
    if (Cookies.get('access_token') === null && this.env === 'production') {
      this.oauthSignIn()
    }
  },
  async beforeCreate() {
    if (Cookies.get('access_token')) {
      try {
        await axiosHelper({
          baseURL: 'https://www.googleapis.com/',
          url: `oauth2/v1/tokeninfo?access_token=${Cookies.get(
            'access_token'
          )}`,
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
          }
        })

        await axiosHelper({
          baseURL: 'https://oauth2.googleapis.com/',
          url: `token?client_id=${
            this.clientId
          }&grant_type=authorization_code&client_secret=${
            this.secret
          }&code=${Cookies.get('access_token')}&redirect_url=${
            this.baseUrl
          }/login`,
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
          }
        })

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
        redirect_uri: `${this.baseUrl}/login`,
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/calendar',
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
    },
    async submitForm(e) {
      this.loading = true

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
        this.loading = false
        if (e.response.status === 401) {
          return (this.error =
            "L'email et le mot de passe ne correspondent pas")
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
        this.loading = false
        this.errors.general =
          'Une erreur est survenue, veuillez recharger la page'
      }
      this.loading = false
    }
  }
}
</script>

<style lang="css" scoped>
.login__form {
  position: relative;
  margin-top: 11vh;
}
img {
  width: 55%;
  margin: auto;
  display: block;
  margin-top: 20vh;
}
.login__link {
  text-align: center;
  margin-bottom: 5vh;
}
</style>
