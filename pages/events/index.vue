<template>
  <h1>Events</h1>
</template>
<script>
export default {
  middleware: 'authenticated',
  mounted() {
    console.log(this.$router.history.current)
  }
}
</script>
<style lang="scss" scoped></style>
