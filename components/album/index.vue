<template>
  <div class="album">
    <div
      class="album__cover"
      :style="{ backgroundImage: `url(${baseUrl}/media/${media})` }"
    />
    <p class="album__title">{{ title }}</p>
    <p class="album__numberOfPictures">
      {{ number }} photo{{ number > 1 ? 's' : null }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    media: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    baseUrl: process.env.NUXT_ENV_API_URL
  })
}
</script>
<style lang="scss" scoped>
.album {
  width: 45%;
  margin: 0 2.5%;
}
.album__cover {
  height: 150px;
  width: 100%;
  border-radius: 10px;
  background-position: center;
  background-size: cover;
  margin-bottom: 10px;
}
p {
  font-weight: 500;
}
.album__numberOfPictures {
  font-size: 0.9em;
  color: #a4a4a4;
}
.album__title {
  font-size: 1em;
  color: #3750b2;
}
</style>
