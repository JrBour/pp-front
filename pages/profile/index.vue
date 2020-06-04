<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <div v-else-if="user === null" class="profile__loader">
      <Loader height="100px" />
    </div>
    <div v-else-if="user !== null">
      <img :src="profilePicture" alt="" />
      <h1>
        {{ user.givenName }} <br />
        <span>{{ user.lastName }}</span>
      </h1>
      <p class="profile__phone">{{ user.phone }}</p>
      <div class="profile__actions">
        <ProfileButton
          text="Changer de mot de passe"
          icon="blue-calendar"
          @handle-click="$router.push('/profile/password')"
        />
        <ProfileButton
          text="Editer mon profil"
          icon="blue-pencil"
          @handle-click="$router.push('/profile/edit')"
        />
        <ProfileButton
          text="Donnees"
          icon="data"
          @handle-click="$router.push('/profile/data')"
        />
        <ProfileButton
          text="Deconnexion"
          icon="logout"
          :display-arrow-icon="false"
          @handle-click="disconnect"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import Loader from '~/components/loader'
import ProfileButton from '~/components/profileButton'
import axiosHelper from '~/lib/axiosHelper'
import parseJwt from '~/utils/token'

export default {
  components: {
    Loader,
    ProfileButton
  },
  data: () => ({
    error: '',
    user: null,
    baseUrl: process.env.NUXT_ENV_API_URL
  }),
  middleware: 'authenticated',
  computed: {
    profilePicture() {
      return this.user.image
        ? `${this.baseUrl}media/${this.user.image.filePath}`
        : require('~/static/img/icons/default-user.svg')
    }
  },
  async beforeMount() {
    try {
      const user = await axiosHelper({
        url: `api/users/${parseJwt(Cookies.get('token')).user.id}`
      })
      this.user = user.data
    } catch (e) {
      this.error = 'Une erreur est survenue, veuillez reessayer plus tard'
    }
  },
  methods: {
    disconnect() {
      Cookies.remove('token')
      this.$store.commit('resetJwt')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang="scss" scoped>
img {
  display: block;
  border-radius: 50%;
  width: 6em;
  height: 6em;
  margin: 10vh auto 2vh auto;
}
h1 {
  padding: 0;
  padding-bottom: 0.5em;
  text-align: center;
  font-weight: 500;
  font-size: 2em;
  & span {
    font-weight: 600;
  }
}
.profile__phone {
  font-weight: 400;
  text-align: center;
  margin-bottom: 7vh;
}
.profile__loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.profile__actions {
  display: flex;
  flex-direction: column;
}
</style>
