<template>
  <div :class="[small ? 'user__small' : 'user']">
    <div :class="[small ? 'user__wrapper_small' : 'user__wrapper']">
      <div
        :style="{ backgroundImage: `url(${imageUrl})` }"
        :class="[small ? 'user__image_small' : 'user__image']"
      />
      <button v-if="displayFullName && isEditable" @click="removeParticipant">
        <p>x</p>
      </button>
    </div>
    <p v-if="displayFullName">
      <span>{{ user.givenName }}</span> <br />
      {{ user.lastName }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    displayFullName: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    },
    isEditable: {
      type: Boolean,
      default: true
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
    removeParticipant() {
      this.$store.commit('removeParticipant', this.user.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  width: 25%;
  margin-bottom: 4vh;
}
.user__small {
  width: auto;
  margin-right: 1vw;
}
.user__wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  padding-bottom: 1vh;
}
button {
  position: absolute;
  background: #ff7374;
  border: none;
  color: white;
  border-radius: 50%;
  right: 2px;
  top: -5px;
  font-size: 1.2em;
  font-weight: 200;
  height: 1.2em;
  width: 1.2em;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  border-radius: 50%;
  margin: auto;
}
.user__image {
  width: 3em;
  height: 3em;
}
.user__image_small {
  width: 2em;
  height: 2em;
}
p {
  font-size: 0.9em;
  text-align: center;
  & span {
    font-weight: 500;
  }
}
</style>
