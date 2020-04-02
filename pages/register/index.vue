<template>
  <div>
    <h1>Inscription</h1>
    <form @submit="submitForm">
      <Input
        id="firstName"
        type="text"
        text="Prenom"
        name="firstname"
        :on-change="handleChangeField"
      />
      <Input
        id="name"
        type="text"
        text="Nom"
        name="lastname"
        :on-change="handleChangeField"
      />
      <Input
        id="phone"
        type="tel"
        text="Telephone"
        name="phone"
        :on-change="handleChangeField"
      />
      <Input
        id="email"
        type="email"
        text="Email"
        name="email"
        :on-change="handleChangeField"
      />
      <Password :on-change="handleChangeField" />
      <p v-if="error">{{ error }}</p>
      <Button
        type="submit"
        text="S'inscrire"
        :disabled="
          !!(
            firstname.length === 0 ||
            lastname.length === 0 ||
            email.length === 0 ||
            password.length === 0
          )
        "
      />
    </form>
    <p class="register__link"><n-link to="/login">Deja inscrit ?</n-link></p>
  </div>
</template>

<script>
import axiosHelper from '../../lib/axiosHelper'
import Button from '../../components/button'
import Input from '../../components/fields/input'
import Password from '../../components/fields/password'

export default {
  components: {
    Password,
    Input,
    Button
  },
  data: () => ({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: ''
  }),
  methods: {
    handleChangeField(name, value) {
      this[name] = value
    },
    async submitForm(e) {
      e.preventDefault()
      try {
        await axiosHelper({
          method: 'post',
          url: 'api/register',
          data: {
            givenName: this.firstname,
            lastName: this.lastname,
            email: this.email,
            phone: this.phone,
            password: this.password
          }
        })
        this.$router.push('login')
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register__link {
  text-align: center;
}
</style>
