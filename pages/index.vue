<template>
  <h1>Petit test</h1>
</template>

<script>
export default {
  data: () => ({
    clientId: process.env.NUXT_ENV_GOOGLE_CLIENT_ID,
    baseUrl: process.env.BASE_URL
  })
}
</script>

<style></style>
