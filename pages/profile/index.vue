<template>
  <div>
    <h1>Profil</h1>
    <button @click="disconnect">Deconnexion</button>
  </div>
</template>
<script>
import Cookies from 'js-cookie'

export default {
  methods: {
    disconnect() {
      Cookies.remove('token')
      this.$store.commit('resetJwt')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
