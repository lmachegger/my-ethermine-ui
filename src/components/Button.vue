<template>
  <button v-on:click="$emit('change-filter', title)">{{ title }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: String,
  },
};
</script>

<style scoped>
</style>