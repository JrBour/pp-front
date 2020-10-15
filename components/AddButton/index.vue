<template>
  <button @click="handleClick">
    <p>{{ text }}</p>
  </button>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '+'
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
  justify-content: center;
  text-align: center;
  width: 1.4em;
  height: 1.4em;
  font-size: 1.6em;
  border-radius: 50%;
  border: none;
  color: white;
  background: #3750b2;
}
</style>
