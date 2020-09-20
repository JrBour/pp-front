<template>
  <div>
    <h1>Inscription</h1>
    <UserForm :loading="loading" @submit-form="submitForm" />
    <p class="register__link"><n-link to="/login">Deja inscrit ?</n-link></p>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import axiosHelper from '~/lib/axiosHelper'

export default {
  data: () => ({
    loading: false
  }),
  beforeCreate() {
    if (Cookies.get('token')) {
      this.$router.push('events')
    }
  },
  methods: {
    async submitForm(user) {
      this.loading = true
      let media

      if (user.profile) {
        const formData = new FormData()
        formData.append('file', user.profile)
        try {
          media = await axiosHelper({
            method: 'post',
            url: `api/media_objects`,
            data: formData
          })
        } catch (e) {
          this.loading = false
          this.errors.general =
            'Une erreur est survenue, veuillez réessayer plus tard'
        }
      }

      try {
        await axiosHelper({
          method: 'post',
          url: 'api/register',
          data: {
            givenName: user.firstname,
            lastName: user.lastname,
            phone: user.phone,
            email: user.email,
            password: user.password,
            image: media ? `api/media_objects/${media.data.id}` : null
          }
        })
      } catch (e) {
        this.loading = false
        this.errors.general =
          'Une erreur est survenue, veuillez réessayer plus tard'
      }
      this.$router.push('login')
    }
  }
}
</script>
<style lang="scss" scoped>
.register__link {
  text-align: center;
  margin-bottom: 2vh;
}
</style>
