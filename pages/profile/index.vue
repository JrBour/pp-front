<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <p v-else-if="user === null">Chargement...</p>
    <div v-else-if="user !== null">
      <img :src="profilePicture" alt="" />
      <h1>
        {{ user.givenName }} <br />
        <span>{{ user.lastName }}</span>
      </h1>
      <p class="profile__phone">{{ user.phone }}</p>
      <div class="profile__actions">
        <button>Mes evenements</button>
        <button>Editer mon profil</button>
        <button>Donnees</button>
        <button @click="disconnect">Deconnexion</button>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import axiosHelper from '~/lib/axiosHelper'
import parseJwt from '~/utils/token'

export default {
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
  async mounted() {
    const token = Cookies.get('token')
    try {
      const user = await axiosHelper({
        url: `api/users/${parseJwt(token).user.id}`
      })
      this.user = user.data
    } catch (e) {
      this.error = "Une erreur s'est produite, veuillez rechargez la page"
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
  margin: 15vh auto 2vh auto;
}
h1 {
  padding: 0;
  padding-bottom: 1em;
  text-align: center;
  font-weight: 500;
  font-size: 2em;
  & span {
    font-weight: 600;
  }
}
.profile__phone {
  text-align: center;
  margin-bottom: 10vh;
}
.profile__actions {
  display: flex;
  flex-direction: column;
  & button {
    margin-bottom: 1vh;
  }
}
</style>
