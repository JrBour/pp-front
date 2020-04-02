<template>
  <div>
    <h1>Connexion</h1>
    <div class="login__form">
      <Input
        id="mail"
        type="text"
        text="Email"
        name="email"
        :on-change="handleChangeField"
      />
      <Password :on-change="handleChangeField" />
      <p v-if="error" class="login__error">{{ error }}</p>
    </div>
    <Button
      text="Se connecter"
      :disabled="!!(email.length === 0 || password.length === 0)"
      @handle-click="submitForm"
    />
    <p class="login__link"><n-link to="/register">Inscription</n-link></p>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import Button from '../../components/button'
import Input from '../../components/fields/input'
import Password from '../../components/fields/password'
import axiosHelper from '../../lib/axiosHelper'

export default {
  components: {
    Input,
    Password,
    Button
  },
  data: () => ({
    email: '',
    password: '',
    error: null
  }),
  methods: {
    handleChangeField(name, value) {
      this[name] = value
    },
    async submitForm() {
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
          this.error = "L'email et le mot de passe ne correspondent pas"
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
