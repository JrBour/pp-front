<template>
  <div>
    <p v-if="error !== null">{{ error }}</p>
    <div v-else-if="user === null" class="loader__wrapper">
      <Loader height="100px" />
    </div>
    <div v-else>
      <div
        class="profile__picture"
        :style="{ backgroundImage: `url(${profilePicture})` }"
      />
      <h1>{{ user.name }}</h1>
      <Button text="Envoyer une demande d'ami" />
      <Button text="Supprimer" />
    </div>
  </div>
</template>
<script>
import axiosHelper from '~/lib/axiosHelper'
import Button from '~/components/button'
import Loader from '~/components/loader'

export default {
  components: {
    Button,
    Loader
  },
  async fetch() {
    try {
      const data = await axiosHelper({
        url: `user/${this.$route.params.id}`
      })
      this.user = data.data
    } catch (e) {
      this.error = 'Une erreur est survenue, veuillez reessayer plus tard'
    }
  },
  data: () => ({
    user: null,
    error: null
  })
}
</script>
