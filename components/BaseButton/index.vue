<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="{ reduce: small }"
    :style="{ padding: loading ? '3px 0' : '1em 0' }"
    @click="handleClick"
  >
    <Loader v-if="loading" opacity="1" fill="#fff" height="50px" />
    <span v-else>{{ text }}</span>
  </button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
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
