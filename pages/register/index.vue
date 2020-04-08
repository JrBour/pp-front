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
      <div class="register__profile">
        <p>Photo <br />de profil</p>
        <label v-if="image === ''" class="register__profile_add" for="profile">
          +
        </label>
        <div v-else class="register__profile_pictureAdd">
          <img :src="image" />
          <div class="register__profile_action">
            <label class="register__profile_pencil" for="profile"
              ><img src="img/icons/pencil.svg" alt="pencil"
            /></label>
            <button
              class="register__button_remove"
              @click="removeProfilePicture"
            >
              x
            </button>
          </div>
        </div>
      </div>
      <p v-if="errors.picture" class="error">{{ errors.picture }}</p>
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
      <p v-if="errors.general" class="error">{{ errors.general }}</p>
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
      picture: '',
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
      const extensionsAllowed = ['jpeg', 'jpeg', 'png']
      const fileName = event.target.files[0].name.split('.')
      const extension = fileName[fileName.length - 1]

      if (extensionsAllowed.includes(extension)) {
        this.errors.picture = ''
        this.profile = event.target.files[0]
        this.image = URL.createObjectURL(this.profile)
      } else {
        this.errors.picture =
          'Veuillez choisir un fichier avec le bon format (jpeg, jpg ou png)'
      }
    },
    async submitForm(e) {
      e.preventDefault()
      let profileId = null

      if (this.profile) {
        const formData = new FormData()
        formData.append('file', this.profile)
        try {
          profileId = await axiosHelper({
            method: 'post',
            url: 'api/media_objects',
            data: formData
          })
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
            image: profileId?.data?.id.toString(),
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
.register__profile {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65%;
  & p {
    padding-left: 10vw;
    font-weight: 500;
  }
}
.register__profile_action {
  margin-left: 2vw;
}
.register__button_remove {
  border: none;
  border-radius: 50%;
  color: white;
  text-align: center;
  background: red;
  height: 40px;
  width: 40px;
}
.register__link {
  text-align: center;
  margin-bottom: 2vh;
}
input[type='file'] {
  display: none;
}
.register__profile_pictureAdd {
  display: flex;
  align-items: center;
  height: 75px;
  width: 75px;
  margin: 3.5vh auto;
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
