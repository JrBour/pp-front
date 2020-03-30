<template>
  <div>
    <label>{{ text }}</label>
    <input :type="type" :value="value" @change="onChange" />
  </div>
</template>
<script>
export default {
  props: {
    text: {
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
