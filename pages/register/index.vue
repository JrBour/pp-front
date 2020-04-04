<template>
  <div>
    <h1>Inscription</h1>
    <form @submit="submitForm">
      <input
        id="profile"
        type="file"
        name="profile"
        @change="processFile($event)"
      />
      <label for="profile">+</label>
      <Input
        id="firstName"
        type="text"
        text="Prenom"
        name="firstname"
        :error="errors.firstname"
        :on-change="handleChangeField"
      />
      <Input
        id="name"
        type="text"
        text="Nom"
        name="lastname"
        :error="errors.lastname"
        :on-change="handleChangeField"
      />
      <Input
        id="phone"
        type="tel"
        text="Telephone"
        name="phone"
        :error="errors.phone"
        :on-change="handleChangeField"
      />
      <Input
        id="email"
        type="email"
        text="Email"
        name="email"
        :error="errors.email"
        :on-change="handleChangeField"
      />
      <Password :on-change="handleChangeField" />
      <p v-if="error">{{ errors.general }}</p>
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
import { validateRegisterField } from './validator'

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
    password: '',
    profile: '',
    errors: {
      lastname: '',
      firstname: '',
      phone: '',
      email: '',
      password: '',
      general: ''
    }
  }),
  methods: {
    handleChangeField(name, value) {
      this[name] = value
      this.errors[name] = validateRegisterField(name, value)
    },
    processFile(event) {
      this.profile = event.target.files[0]
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
        this.error = 'Une erreur est survenue, veuillez reesayer plus tard'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register__link {
  text-align: center;
  margin-bottom: 2vh;
}
input[type='file'] {
  display: none;
}
label[for='profile'] {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: 75px;
  margin: 3vh auto;
  border: 2px solid #3750b2;
  border-radius: 50%;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 2em;
}
</style>
