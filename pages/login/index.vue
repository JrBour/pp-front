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
      <Password :on-change="handleChangeField" :error="errors.general" />
      <p v-if="errors.general" class="login__error">{{ errors.general }}</p>
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
import Button from '../../components/button'
import Input from '../../components/fields/input'
import Password from '../../components/fields/password'
import axiosHelper from '../../lib/axiosHelper'
import { validateLoginField } from './validator'

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
      const checkError = Object.values(this.errors).some(
        (value) => value !== ''
      )
      if (checkError) {
        return true
      }
      return false
    }
  },
  beforeCreate() {
    if (Cookies.get('token') !== undefined) {
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
        this.$router.push('events')
      } catch (e) {
        if (e.response.status === 401) {
          this.errors.general =
            "L'email et le mot de passe ne correspondent pas"
        }
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
}
.login__error {
  color: red;
  font-style: italic;
  font-size: 0.8em;
  margin-top: 1vh;
}
</style>
