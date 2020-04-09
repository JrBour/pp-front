<template>
  <div class="input__wrapper">
    <div class="input__container">
      <input
        :id="id"
        ref="dateInput"
        v-model="inputValue"
        :name="name"
        :type="type"
        :class="{ inputError: error !== '' }"
        @focus="changeType"
      />
      <label
        :for="id"
        :class="{ active: inputValue.length > 0 || type === 'datetime-local' }"
      >
        {{ text }} <span>*</span>
      </label>
    </div>
    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    error: {
      type: String,
      required: true
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      inputValue: '',
      type: 'text'
    }
  },
  watch: {
    inputValue(value) {
      this.onChange(this.name, value)
    }
  },
  methods: {
    changeType() {
      this.type = 'datetime-local'
      this.$nextTick(() => this.$refs.dateInput.focus())
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
  margin-bottom: 5vh;
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
  top: 0.5vh;
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
  height: 5vh;
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
  top: -2vh;
  font-size: 1em;
  font-weight: 500;
  & span {
    color: red;
  }
}
</style>
