<template>
  <div>
    <p v-if="error !== null">{{ error }}</p>
    <div v-else-if="user === null">
      <Loader height="100px" />
    </div>
    <div v-else>
      <h1>{{ user.name }}</h1>
      <Button text="Envoyer une demande d'ami" />
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
  data: () => ({
    user: null
  }),
  async beforeMounted() {
    try {
      await axiosHelper({
        url: 'user'
      })
    } catch (e) {
      this.error = 'Une erreur est survenue, veuillez reessayer plus tard'
    }
  }
}
</script>
