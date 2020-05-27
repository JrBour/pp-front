<template>
  <div class="input__wrapper">
    <div class="input__container">
      <input
        :id="id"
        v-model="inputValue"
        :name="name"
        :type="type"
        :step="step"
        :class="{ inputError: error !== '' }"
      />
      <label
        :for="id"
        :class="{ active: inputValue.length > 0, reduce: small }"
      >
        {{ text }} <span v-if="required">*</span>
      </label>
    </div>
    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: String,
      default: 'any'
    },
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
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      required: true
    },
    defaultValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: ''
    }
  },
  watch: {
    inputValue(value) {
      this.onChange(this.name, value)
    },
    defaultValue(val) {
      this.inputValue = val
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
  top: 10px;
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
</style>
