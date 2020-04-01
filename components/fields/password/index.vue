<template>
  <div>
    <input id="password" v-model="inputValue" :type="type" />
    <label for="password" :class="{ active: inputValue.length > 0 }"
      >Mot de passe</label
    >
    <img
      :src="`img/icons/eye${type === 'text' ? '-close' : ''}.svg`"
      alt="Eye icon"
      @click="changeType"
    />
  </div>
</template>

<script>
export default {
  props: {
    onChange: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      inputValue: '',
      type: 'password'
    }
  },
  watch: {
    inputValue(value) {
      this.onChange(value)
    }
  },
  methods: {
    changeType() {
      this.type = this.type === 'password' ? 'text' : 'password'
    }
  }
}
</script>
<style lang="css" scoped>
div {
  position: relative;
  height: 5vh;
  margin-top: 5vh;
}

label,
input {
  display: block;
  position: absolute;
  top: 0;
}

label {
  padding: 0 0 0 1vw;
  z-index: 1;
  top: 1vh;
  font-family: 'Rubik';
  font-size: 1.3em;
  transition: top 0.2s ease;
  color: rgba(0, 0, 0, 0.6);
}

img {
  position: absolute;
  right: 5vw;
  top: 50%;
  transform: translate(0, -50%);
}

input {
  z-index: 0;
  border: none;
  height: 5vh;
  padding-left: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
}

input:focus + label,
.active {
  top: -3vh;
  font-size: 1em;
}
</style>
