<template>
  <div class="segmented">
    <button
      :class="{ active: activeStatus === first }"
      @click="handleClick(first)"
    >
      {{ first }}
    </button>
    <button
      :class="{ active: activeStatus === second }"
      @click="handleClick(second)"
    >
      {{ second }}
    </button>
  </div>
</template>
<script>
export default {
  props: {
    first: {
      type: String,
      required: true
    },
    second: {
      type: String,
      required: true
    }
  },
  data: () => ({
    activeStatus: null
  }),
  mounted() {
    this.activeStatus = this.first
  },
  methods: {
    handleClick(status) {
      this.activeStatus = status
      console.log('ntm')
      this.$emit('get-segment', status)
    }
  }
}
</script>
<style lang="scss" scoped>
.segmented {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 4vh;
}
button {
  background: transparent;
  border: none;
  border-radius: 50px;
  padding: 4px 20px;
  font-weight: 500;
  font-size: 0.9em;
}
.active {
  color: white;
  background: rgba(71, 88, 138, 0.8);
}
</style>
