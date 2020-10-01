<template>
  <ValidationObserver tag="form" @submit="submitForm">
    <input
      id="profile"
      type="file"
      name="profile"
      @change="processFile($event)"
    />
    <div
      class="register__profile"
      :style="{ width: image !== '' ? '85%' : '65%' }"
    >
      <p>Photo <br />de profil</p>
      <label v-if="image === ''" class="register__profile_add" for="profile">
        +
      </label>
      <div v-else class="register__profile_pictureAdd">
        <div class="image" :style="{ backgroundImage: `url(${image})` }" />
        <div class="register__profile_action">
          <label class="register__profile_pencil" for="profile"
            ><img :src="require('~/static/img/icons/pencil.svg')" alt="pencil"
          /></label>
          <button class="register__button_remove" @click="removeProfilePicture">
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
      rules="required"
      name="firstname"
      :default-value="firstname"
      :on-change="handleChangeField"
    />
    <Input
      id="name"
      type="text"
      text="Nom"
      name="lastname"
      rules="required"
      :default-value="lastname"
      :on-change="handleChangeField"
    />
    <Input
      id="phone"
      type="tel"
      text="Telephone"
      name="phone"
      rules="required|numeric"
      :default-value="phone"
      :on-change="handleChangeField"
    />
    <Input
      id="email"
      type="email"
      text="Email"
      name="email"
      rules="required|email|min:8"
      :default-value="email"
      :on-change="handleChangeField"
    />
    <Password
      v-if="!edit"
      name="password"
      :on-change="handleChangeField"
      rules="required"
    />
    <p v-if="errors.general" class="error">{{ errors.general }}</p>
    <Button
      type="submit"
      :text="edit ? 'Editer' : 'S\'inscrire'"
      :loading="loading"
      :disabled="disabledSubmitButton"
    />
  </ValidationObserver>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import Button from '~/components/button'
import Input from '~/components/fields/input'
import Password from '~/components/fields/password'
import validateRegisterField from '~/lib/validatorRegister'

export default {
  components: {
    Password,
    Input,
    Button,
    ValidationObserver
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    edit: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    displayInputFile: true,
    email: '',
    firstname: '',
    image: '',
    lastname: '',
    password: '',
    phone: '',
    profile: '',
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
        (!this.edit && this.password.length === 0) ||
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
  watch: {
    user(val) {
      this.email = val.email
      this.firstname = val.givenName
      this.lastname = val.lastName
      this.phone = val.phone
      this.image = val.image
    }
  },
  methods: {
    removeProfilePicture() {
      this.profile = ''
      this.image = ''
      this.displayInputFile = false
      this.$nextTick(() => (this.displayInputFile = true))
    },
    handleChangeField(name, value) {
      this[name] = value
      this.errors[name] = validateRegisterField(name, value)
    },
    processFile(event) {
      const extensionsAllowed = ['jpg', 'jpeg', 'png']
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
    submitForm(e) {
      e.preventDefault()
      const user = {
        email: this.email,
        firstname: this.firstname,
        image: this.image,
        lastname: this.lastname,
        password: this.password,
        phone: this.phone,
        profile: this.profile
      }
      this.$emit('submit-form', user)
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
  display: flex;
  flex-direction: column;
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
input[type='file'] {
  display: none;
}
.register__profile_pictureAdd {
  display: flex;
  align-items: center;
  height: 75px;
  margin: 3.5vh auto;
  & > .image {
    border-radius: 50%;
    height: 75px;
    width: 75px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
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
