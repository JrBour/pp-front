<template>
  <div class="input__wrapper">
    <div class="input__container">
      <input
        :id="name"
        v-model="inputValue"
        :name="name"
        :type="type"
        :class="{ inputError: error !== '' }"
      />
      <label :for="name" :class="{ active: inputValue.length > 0 }"
        >{{ label }} <span>*</span></label
      >
      <img
        :src="
          require(`~/static/img/icons/eye${
            type === 'text' ? '-close' : ''
          }.svg`)
        "
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
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Mot de passe'
    },
    error: {
      type: String,
      default: ''
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
      this.onChange(this.name, value)
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
  height: 35px;
}
.input__wrapper {
  margin-bottom: 30px;
}

p {
  color: red;
  font-size: 0.8em;
  font-style: italic;
  padding-top: 1vh;
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
  top: 2px;
  font-family: 'Rubik';
  font-size: 1.3em;
  transition: top 0.2s ease;
  color: rgba(0, 0, 0, 0.6);
}

input {
  font-size: 1.2em;
  z-index: 0;
  background: transparent;
  border: none;
  height: 35px;
  padding-left: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  &:focus {
    outline: none;
  }
}

.inputError {
  border-bottom: 1px solid #fd5c63;
}

input:focus + label,
.active {
  left: -2vw;
  top: -20px;
  font-size: 1em;
  font-weight: 500;
  & span {
    color: red;
  }
}

.reduce {
  font-size: 1.2em;
}

img {
  position: absolute;
  right: 5vw;
  top: 50%;
  transform: translate(0, -50%);
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
