<template>
  <div class="participant">
    <div class="participant__wrapper">
      <img :src="imageUrl" />
      <p>{{ user.givenName }} {{ user.lastName }}</p>
    </div>
    <button
      v-if="!$store.state.participants.includes(user)"
      @click="addParticipant"
    >
      +
    </button>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    baseUrl: process.env.NUXT_ENV_API_URL
  }),
  computed: {
    imageUrl() {
      return this.user.image
        ? `${this.baseUrl}/media/${this.user.image.filePath}`
        : require('~/static/img/icons/default-user.svg')
    }
  },
  methods: {
    addParticipant() {
      if (!this.$store.state.participants.includes(this.user)) {
        this.$emit('add-partcipant', this.user)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.participant {
  width: 100%;
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
}
.participant__wrapper {
  width: 90%;
  display: flex;
  align-items: center;
}
p {
  margin-left: 10px;
}
img {
  border-radius: 50%;
  height: 2.5em;
  width: 2.5em;
}
button {
  text-align: center;
  line-height: 1.2em;
  width: 1.2em;
  height: 1.2em;
  font-size: 1.8em;
  border-radius: 50%;
  border: none;
  color: white;
  background: #3750b2;
}
</style>
