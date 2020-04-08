<template>
  <div class="input__wrapper">
    <div class="input__container">
      <input
        id="password"
        v-model="inputValue"
        :type="type"
        :class="{ inputError: error !== '' }"
      />
      <label for="password" :class="{ active: inputValue.length > 0 }"
        >Mot de passe <span>*</span></label
      >
      <img
        :src="`img/icons/eye${type === 'text' ? '-close' : ''}.svg`"
        alt="Eye icon"
        @click="changeType"
      />
    </div>
    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    onChange: {
      type: Function,
      required: true
    },
    error: {
      type: String,
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
      this.onChange('password', value)
    }
  },
  methods: {
    changeType() {
      this.type = this.type === 'password' ? 'text' : 'password'
    }
  }
}
</script>
<style lang="scss" scoped>
.input__container {
  position: relative;
  height: 4.5vh;
}
.input__wrapper {
  margin-bottom: 2vh;
}

p {
  color: red;
  font-size: 0.8em;
  font-style: italic;
  padding-top: 1vh;
}

.inputError {
  border-bottom: 1px solid #fd5c63;
}

div {
  position: relative;
  height: 5vh;
  margin-top: 4vh;
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
  top: 0.5vh;
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
  font-size: 1.2em;
  z-index: 0;
  border: none;
  height: 4.5vh;
  background: transparent;
  padding-left: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  &:focus {
    outline: none;
  }
}

input:focus + label,
.active {
  top: -2vh;
  left: -2vw;
  font-size: 1em;
  font-weight: 500;
  & span {
    color: red;
  }
}
</style>
