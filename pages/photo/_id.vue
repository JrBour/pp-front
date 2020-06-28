<template>
  <div>
    <div v-if="image !== null">
      <img
        class="back"
        :src="require('~/static/img/icons/back-white.svg')"
        alt="Back"
        @click="$router.back()"
      />
      <img :src="image" alt="" />
    </div>
    <p v-else-if="error !== null" class="error">{{ error }}</p>
    <Loader v-else />
  </div>
</template>
<script>
import Loader from '~/components/loader'
import axiosHelper from '~/lib/axiosHelper'

export default {
  components: {
    Loader
  },
  data: () => ({
    image: null,
    error: null
  }),
  async beforeMount() {
    const id = this.$router.history.current.params.id
    try {
      const album = await axiosHelper({
        url: `api/media_objects/${id}`
      })
      this.album = album.data
      this.title = this.album.event.name
    } catch (e) {
      this.error = 'Une erreur est survenue, veuillez recharger la page'
    }
  }
}
</script>
