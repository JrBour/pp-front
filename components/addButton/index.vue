<template>
  <button @click="handleClick">{{ text }}</button>
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
  text-align: center;
  width: 1.2em;
  height: 1.2em;
  font-size: 1.6em;
  border-radius: 50%;
  border: none;
  color: white;
  background: #3750b2;
}
</style>
