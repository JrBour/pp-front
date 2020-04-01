<template>
  <div>
    <input :id="id" v-model="inputValue" :name="name" :type="type" />
    <label :for="id" :class="{ active: inputValue.length > 0 }">
      {{ text }}
    </label>
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
    type: {
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
      inputValue: ''
    }
  },
  watch: {
    inputValue(value) {
      this.onChange(value)
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
