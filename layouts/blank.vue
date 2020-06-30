<template>
  <div class="blank__wrapper">
    <Loader height="140px" />
    <nuxt />
  </div>
</template>

<script>
import Loader from '~/components/loader'

export default {
  components: {
    Loader
  },
  head() {
    return {
      bodyAttrs: {
        class: 'blank'
      }
    }
  }
}
</script>

<style>
.blank h1 {
  padding-top: 7vh;
  font-size: 2.5em;
}
</style>
