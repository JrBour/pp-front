<template>
  <div>
    <h1>Album</h1>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch('addAlbums')
  },
  middleware: 'authenticated'
}
</script>
