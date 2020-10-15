<template>
  <div :style="{ backgroundImage: `url(${baseUrl}/media/${media})` }" />
</template>
<script>
export default {
  props: {
    media: {
      type: String,
      required: true
    }
  },
  data: () => ({
    baseUrl: process.env.NUXT_ENV_API_URL
  })
}
</script>
<style lang="scss" scoped>
div {
  height: 140px;
  width: 45%;
  margin: 10px 2.5%;
  border-radius: 10px;
  background-position: center;
  background-size: cover;
  margin-bottom: 10px;
}
</style>
