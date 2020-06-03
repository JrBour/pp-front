<template>
  <div>
    <h1>Edition du profil</h1>
    <RegisterForm :loading="loading" @submit-form="submitForm" />
  </div>
</template>
<script>
import RegisterForm from '~/components/registerForm'
export default {
  components: {
    RegisterForm
  },
  data: () => ({
    loading: false
  }),
  async beforeMount() {},
  methods: {
    submitForm(user) {
      console.log(user)
    }
  }
}
</script>
<style lang="scss" scoped></style>
