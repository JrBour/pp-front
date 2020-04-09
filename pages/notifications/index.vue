<template>
  <h1>Notification</h1>
</template>
<script>
export default {
  layout: 'navbar',
  mounted() {
    console.log(this.$router.history.current.path)
  }
}
</script>
