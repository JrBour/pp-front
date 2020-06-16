<template>
  <div>
    <h1>{{ user.name }}</h1>
    <Button text="Envoyer une demande d'ami" />
  </div>
</template>
<script>
import axiosHelper from '~/lib/axiosHelper'
import Button from '~/components/button'

export default {
  components: {
    Button
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
