<template>
  <div>
    <div v-if="loading && error">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="loading" class="loader__wrapper">
      <Loader height="100px" />
    </div>
    <div v-else>
      <h1>{{ title }}</h1>
      <div class="pictures__wrapper">
        <Picture
          v-for="media in album.medias"
          :key="media.id"
          :media="media.media.filePath"
        />
      </div>
    </div>
  </div>
</template>
<script>
// import Cookies from 'js-cookie'
import axiosHelper from '~/lib/axiosHelper'

export default {
  data: () => ({
    error: '',
    title: null,
    loading: false,
    album: null
  }),
  middleware: 'authenticated',
  async beforeMount() {
    this.loading = true
    const id = this.$router.history.current.params.id
    try {
      const album = await axiosHelper({
        url: `api/albums/${id}`
      })
      this.album = album.data
      this.title = this.album.event.name
    } catch (e) {
      this.error = 'Une erreur est survenue, veuillez recharger la page'
    }
    this.loading = false
  }
}
</script>
<style lang="scss" scoped>
.loader__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.pictures__wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10vh;
  margin-top: 40px;
}
</style>
