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
    </div>
    <Button
      text="S'inscrire"
      :disabled="!!(email.length && password.length)"
      @handle-click="$router.push('events')"
    />
    <p class="login__link"><n-link to="/register">Inscription</n-link></p>
  </div>
</template>

<script>
import Button from '../../components/button'
import Input from '../../components/fields/input'
import Password from '../../components/fields/password'

export default {
  components: {
    Input,
    Password,
    Button
  },
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    handleChangeField(name, value) {
      this[name] = value
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
</style>
