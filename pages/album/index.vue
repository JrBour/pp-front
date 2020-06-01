<template>
  <div>
    <h1>Albums</h1>
    <div v-if="this.$store.state.albums !== null" class="albums__wrapper">
      <Album
        v-for="album in this.$store.state.albums"
        :key="album.id"
        :title="album.event.name"
        :number="album.medias.length"
        :media="album.medias[0].media.filePath"
      />
    </div>
    <div v-else-if="this.$store.state.albums === null" class="loader__wrapper">
      <Loader height="100px" />
    </div>
    <div v-else>
      <p>Vous n'avez pas encore d'albums.</p>
    </div>
  </div>
</template>
<script>
import Album from '~/components/album'
import Loader from '~/components/loader'

export default {
  components: {
    Album,
    Loader
  },
  mounted() {
    this.$store.dispatch('addAlbums')
  },
  middleware: 'authenticated'
}
</script>

<style lang="scss" scoped>
.albums__wrapper {
  display: flex;
  margin-top: 40px;
  flex-wrap: wrap;
}
.loader__wrapper {
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
