<template>
  <div>
    <h1>Connexion</h1>
    <div>
      <Input
        id="mail"
        type="text"
        text="Email"
        name="email"
        :on-change="handleChangeField"
      />
      <Password :on-change="handleChangeField" />
    </div>
  </div>
</template>

<script>
import Input from '../../components/fields/input'
import Password from '../../components/fields/password'

export default {
  components: {
    Input,
    Password
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
.login__password {
  position: relative;
  margin-top: 5vh;
  height: 5vh;
}
</style>
