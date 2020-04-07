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
      <label v-if="image === ''" class="register__profile_add" for="profile">
        +
      </label>
      <div v-else class="register__profile">
        <img :src="image" />
        <label class="register__profile_pencil" for="profile"
          ><img src="img/icons/pencil.svg" alt="pencil"
        /></label>
        <button @click="removeProfilePicture">x</button>
      </div>
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
      <Password :on-change="handleChangeField" :error="errors.password" />
      <p v-if="errors.general">{{ errors.general }}</p>
      <Button
        type="submit"
        text="S'inscrire"
        :disabled="disabledSubmitButton"
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
    image: '',
    errors: {
      lastname: '',
      firstname: '',
      phone: '',
      email: '',
      password: '',
      general: ''
    }
  }),
  computed: {
    disabledSubmitButton() {
      if (
        this.firstname.length === 0 ||
        this.lastname.length === 0 ||
        this.email.length === 0 ||
        this.password.length === 0 ||
        this.phone.length === 0
      ) {
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
  methods: {
    removeProfilePicture() {
      this.profile = ''
      this.image = ''
    },
    handleChangeField(name, value) {
      this[name] = value
      this.errors[name] = validateRegisterField(name, value)
    },
    processFile(event) {
      this.profile = event.target.files[0]
      this.image = URL.createObjectURL(this.profile)
    },
    async submitForm(e) {
      e.preventDefault()

      if (this.profile) {
        const formData = new FormData()
        formData.append('file', this.image)
        try {
          await axiosHelper({
            method: 'post',
            url: 'api/media_objects',
            data: formData
          })
          this.$router.push('login')
        } catch (e) {
          this.errors.general =
            'Une erreur est survenue, veuillez reesayer plus tard'
        }
      }

      try {
        await axiosHelper({
          method: 'post',
          url: 'api/register',
          data: {
            givenName: this.firstname,
            lastName: this.lastname,
            phone: this.phone,
            email: this.email,
            password: this.password
          }
        })
        this.$router.push('login')
      } catch (e) {
        this.errors.general =
          'Une erreur est survenue, veuillez reesayer plus tard'
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
.register__profile {
  display: flex;
  align-items: center;
  height: 75px;
  width: 75px;
  margin: 3vh auto;
  & > img {
    border-radius: 50%;
    height: 75px;
    width: 75px;
  }
}
.register__profile_add {
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
.register__profile_pencil {
  margin-left: 10px;
}
</style>
