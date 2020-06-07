<template>
  <div class="profile__wrapper">
    <h1>Edition <br />du profil</h1>
    <div v-if="error !== ''" class="profile__error">
      <p>{{ error }}</p>
    </div>
    <UserForm
      v-else
      :edit="true"
      :user="user"
      :loading="loading"
      @submit-form="submitForm"
    />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import UserForm from '~/components/userForm'
import axiosHelper from '~/lib/axiosHelper'
import parseToken from '~/utils/token'

export default {
  components: {
    UserForm
  },
  data: () => ({
    user: null,
    loading: false,
    baseUrl: process.env.NUXT_ENV_API_URL,
    error: ''
  }),
  middleware: 'authenticated',
  async mounted() {
    try {
      const user = await axiosHelper({
        url: `api/users/${parseToken(Cookies.get('token')).user.id}`
      })
      user.data.image =
        user.data.image !== null
          ? `${this.baseUrl}/media/${user.data.image.filePath}`
          : null
      this.user = user.data
    } catch (e) {
      this.error = 'Une erreur est survenue, veuillez réessayer plus tard'
    }
  },
  methods: {
    async submitForm(user) {
      this.loading = true
      let media

      if (user.profile && this.$store.state.user.image !== null) {
        const formData = new FormData()
        formData.append('file', user.profile)
        try {
          await axiosHelper({
            method: 'delete',
            url: this.$store.state.user.image
          })

          media = await axiosHelper({
            method: 'post',
            url: `api/media_objects`,
            data: formData
          })
        } catch (e) {
          this.loading = false
          this.errors.general =
            'Une erreur est survenue, veuillez reesayer plus tard'
        }
      } else if (user.profile && this.$store.state.user.image === null) {
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
            'Une erreur est survenue, veuillez reesayer plus tard'
        }
      }

      try {
        const editUser = await axiosHelper({
          method: 'patch',
          url: `api/users/${this.$store.state.user.id}`,
          data: {
            givenName: user.firstname,
            lastName: user.lastname,
            phone: user.phone,
            email: user.email,
            password: user.password,
            image: media ? `api/media_objects/${media.data.id}` : null
          }
        })
        this.$store.commit('addUser', editUser.data)
      } catch (e) {
        this.loading = false
        this.errors.general =
          'Une erreur est survenue, veuillez reesayer plus tard'
      }
      this.$router.push('/profile')
    }
  }
}
</script>
<style lang="scss" scoped>
.profile__loader {
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile__wrapper {
  margin-bottom: 10vh;
}
</style>
