<template>
  <div>
    <label :for="id">{{ text }}</label>
    <input :id="id" :type="type" :value="value" @change="onChange" />
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
    value: {
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
  }
}
</script>
