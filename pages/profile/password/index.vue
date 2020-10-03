<template>
  <div>
    <h1>
      Editer <br />
      mot de passe
    </h1>
    <form @submit.prevent="submitPassword">
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
        :error="errors.confirmNewPassword"
        :on-change="handleChangeField"
      />
      <p v-if="errors.general" class="error">{{ errors.general }}</p>
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
import axiosHelper from '~/lib/axiosHelper'
import parseToken from '~/utils/token'

export default {
  middleware: 'authenticated',
  data: () => ({
    loading: false,
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    errors: {
      general: '',
      confirmNewPassword: ''
    }
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
    handleChangeField(name, value) {
      this[name] = value
    },
    async submitPassword(e) {
      if (this.confirmNewPassword !== this.newPassword) {
        this.errors.confirmNewPassword =
          'Les mots de passe ne correspondent pas'
        return
      }
      this.loading = true

      try {
        await axiosHelper({
          url: 'login',
          method: 'post',
          data: {
            email: this.$store.state.user.email,
            password: this.oldPassword
          }
        })
      } catch (e) {
        this.loading = false
        this.errors.general =
          "L'ancien mot de passe n'est pas correct, veuillez reessayer"
        return
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
        this.loading = false
        this.errors.general =
          'Une erreur est survenue, veuillez réessayer plus tard'
        return
      }
      this.loading = false
      this.$router.push('/profile')
    }
  }
}
</script>
<style lang="scss" scoped>
form {
  margin-top: 10vh;
}
</style>
