<template>
  <button @click="handleClick">
    <img
      class="profile__icon"
      :src="require(`~/static/img/icons/${icon}.svg`)"
      :alt="icon"
    />
    <div class="profile__button_title">
      <p>{{ text }}</p>
    </div>
    <img
      v-if="displayArrowIcon"
      :src="require('~/static/img/icons/red-arrow.svg')"
      alt="Red arrow"
    />
  </button>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    displayArrowIcon: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('handle-click')
    }
  }
}
</script>
<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  font-size: 1.2em;
  padding: 18px 15px;
  margin-bottom: 15px;
  text-align: left;
}
p {
  font-weight: 400;
  color: #3750b2;
}
.profile__icon {
  margin-right: 10px;
}
.profile__button_title {
  width: 65vw;
}
</style>
