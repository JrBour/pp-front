<template>
  <div class="participant">
    <div class="participant__wrapper">
      <img
        src="https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687"
      />
      <p>{{ user.givenName }} {{ user.lastName }}</p>
    </div>
    <button>+</button>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
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
