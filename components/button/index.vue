<template>
  <button :disabled="disabled" @click="handleClick">{{ text }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    disabled: {
      type: Boolean
    },
    text: {
      type: String,
      required: true
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
  width: 100%;
  border: none;
  border-radius: 10px;
  background: #3750b2;
  color: white;
  padding: 1em 0;
  font-weight: 500;
  font-size: 1.2em;
  margin: 4vh 0;
  &:disabled {
    opacity: 0.5;
  }
}
</style>
