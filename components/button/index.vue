<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="{ reduce: small }"
    @click="handleClick"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    disabled: {
      type: Boolean
    },
    type: {
      type: String,
      default: 'button'
    },
    small: {
      type: Boolean,
      default: false
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
  box-sizing: content-box;
  width: 100%;
  border: none;
  border-radius: 10px;
  background: #3750b2;
  color: white;
  padding: 1em 0;
  font-weight: 500;
  font-size: 1.2em;
  margin: 4vh 0 2vh 0;

  &:disabled {
    opacity: 0.5;
  }
}
.reduce {
  display: block;
  width: 80%;
  margin: 3vh auto;
  font-size: 0.9em;
}
</style>
