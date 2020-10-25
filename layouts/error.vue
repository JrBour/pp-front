<template>
  <div class="container__error">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <BaseButton text="Home page" @handle-click="$router.push('events')" />
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  layout: 'noBorder',
  head() {
    return {
      bodyAttrs: {
        class: 'errorLayout'
      }
    }
  }
}
</script>
<style>
.errorLayout .container {
  display: flex;
  justify-content: center;
}
.errorLayout h1 {
  text-align: center;
}
.container__error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
