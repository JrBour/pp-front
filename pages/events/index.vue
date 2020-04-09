<template>
  <div>
    <h1>Événements</h1>
    <button class="events__button_add" @click="$router.push('/event/create')">
      +
    </button>
  </div>
</template>
<script>
export default {
  middleware: 'authenticated',
  mounted() {
    console.log(this.$router.history.current)
  }
}
</script>
<style lang="scss" scoped>
.events__button_add {
  position: fixed;
  bottom: 10vh;
  right: 10vw;
  height: 1.3em;
  width: 1.3em;
  border: none;
  font-size: 2em;
  border-radius: 50%;
  color: white;
  background: #3750b2;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);

  &:after {
    content: '';
    position: absolute;
    height: 1.8em;
    width: 1.8em;
    z-index: -1;
    background: rgba(55, 80, 178, 0.2);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  }
}
</style>
