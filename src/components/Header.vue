<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
  },
};
</script>

<style scoped>
header {
  align-items: center;
  margin: 0;
}
h1 {
  margin: 0;
  font-size: 250%;
}
</style>