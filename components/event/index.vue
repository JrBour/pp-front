<template>
  <div>
    <p>{{ date }}</p>
    <h2>{{ title }}</h2>
  </div>
</template>
<script>
export default {
  name: 'Event',
  props: {
    date: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>
