<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ author }}</p>
    <p>{{ expense }}</p>
    <p>{{ date }}</p>
  </div>
</template>
<script>
export default {
  name: 'Expense',
  props: {
    title: {
      required: true,
      type: String
    },
    expense: {
      required: true,
      type: String
    },
    author: {
      required: true,
      type: String
    },
    date: {
      required: true,
      type: String
    }
  }
}
</script>
