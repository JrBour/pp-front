<template>
  <div>
    <h1>
      Editer <br />
      mot de passe
    </h1>
    <form @submit="submitPassword">
      <Password
        label="Ancien mot de passe"
        name="oldPassword"
        :on-change="handleChangeField"
      />
      <Password
        label="Nouveau mot de passe"
        name="newPassword"
        :on-change="handleChangeField"
      />
      <Password
        label="Confirmer mot de passe"
        name="confirmNewPassword"
        :on-change="handleChangeField"
      />
      <Button
        type="submit"
        text="Editer"
        :loading="loading"
        :disabled="disabledSubmitButton"
      />
    </form>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import Password from '~/components/fields/password'
import Button from '~/components/button'
import axiosHelper from '~/lib/axiosHelper'
import parseToken from '~/utils/token'

export default {
  components: {
    Button,
    Password
  },
  middleware: 'authenticated',
  data: () => ({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }),
  computed: {
    disabledSubmitButton() {
      if (
        this.oldPassword.length === 0 ||
        this.newPassword.length === 0 ||
        this.confirmNewPassword.length === 0
      ) {
        return true
      }
      return false
    }
  },
  methods: {
    async submitPassword(e) {
      e.preventDefault()

      try {
        const response = await axiosHelper({
          url: 'login',
          method: 'post',
          data: {
            email: this.$store.state.user.email,
            password: this.oldPassword
          }
        })
        console.log(response)
      } catch (e) {
        this.error =
          "L'ancien mot de passe n'est pas correct, veuillez reessayer"
      }

      try {
        await axiosHelper({
          url: `api/users/${parseToken(Cookies.get('token')).user.id}`,
          method: 'patch',
          data: {
            password: this.confirmNewPassword
          }
        })
      } catch (e) {
        this.error = 'Une erreur est survenue, veuillez reessayer plus tard'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
form {
  margin-top: 10vh;
}
</style>
