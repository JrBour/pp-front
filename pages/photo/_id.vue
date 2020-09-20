<template>
  <div class="picture__wrapper">
    <div v-if="image !== null">
      <img
        class="back"
        :src="require('~/static/img/icons/back-white.svg')"
        alt="Back"
        @click="$router.back()"
      />
      <img :src="image.filepath" alt="" />
    </div>
    <p v-else-if="error !== null" class="error">{{ error }}</p>
    <Loader v-else height="140px" />
  </div>
</template>
<script>
import axiosHelper from '~/lib/axiosHelper'

export default {
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
<style lang="scss" scoped>
.picture__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
