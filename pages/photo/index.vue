<template>
  <div>
    <img v-if="image !== null" :src="image" alt="" />
    <Loader v-else />
  </div>
</template>
<script>
import Loader from '~/components/loader'

export default {
  components: {
    Loader
  },
  data: () => ({
    image: null
  })
}
</script>
