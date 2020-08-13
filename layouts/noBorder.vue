<template>
  <div class="container">
    <nuxt keep-alive />
    <Navbar v-if="$store.state.jwt !== null" />
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import Navbar from '~/components/navbar'
import axiosHelper from '~/lib/axiosHelper'
import parseToken from '~/utils/token'

export default {
  components: {
    Navbar
  },
  async fetch() {
    if (Cookies.get('token')) {
      const token = Cookies.get('token')

      try {
        const notifications = await axiosHelper({
          url: `api/user_events?user.id=${
            parseToken(token).user.id
          }&status=waiting`
        })
        this.$store.commit('addNotifications', notifications.data)
      } catch (e) {
        this.errors.general =
          'Une erreur est survenue, veuillez recharger la page'
      }
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'noBorder'
      }
    }
  }
}
</script>
<style>
.noBorder h1 {
  padding: 9vh 1vw 0 8vw;
  font-size: 2.5em;
}
</style>
