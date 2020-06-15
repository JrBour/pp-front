<template>
  <h1>{{ user.name }}</h1>
</template>
<script>
import axiosHelper from '~/lib/axiosHelper'

export default {
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
