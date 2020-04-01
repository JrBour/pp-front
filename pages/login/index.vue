<template>
  <div>
    <h1>Connexion</h1>
    <div>
      <Input
        id="mail"
        type="text"
        text="Email"
        :on-change="handleChangeField"
      />
      <div class="login__password">
        <label for="password">Mot de passe</label>
        <input :value="password" type="password" name="password" />
      </div>
    </div>
  </div>
</template>

<script>
import Input from '../../components/input'

export default {
  components: {
    Input
  },
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    handleChangeField(value) {
      this.email = value
    }
  }
}
</script>

<style lang="css" scoped>
.login__password {
  position: relative;
  margin-top: 5vh;
  height: 5vh;
}
</style>
