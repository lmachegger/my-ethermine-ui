<template>
  <button v-bind:id="title" v-on:click="$emit('change-filter', title)">
    {{ title }}
  </button>
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
button {
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #2c3e50;
  margin: 0;
  margin-left: 0.4em;
  margin-right: 0.4em;
  border-radius: 0.3em;
  box-sizing: border-box;
  text-decoration: none;
  color: #2c3e50;
  text-align: center;
  transition: all 0.2s;
  background-color: #ffffff;
}
button:hover {
  color: #ffffff;
  background-color: #3b536b;
}
button:active {
  color: #ffffff;
  background-color: #2c3e50;
}
button:target {
  color: #ffffff;
  background-color: #2c3e50;
}
button:focus {
  outline: 0px transparent !important;
  color: #ffffff;
  background-color: #2c3e50;
}

.active {
  color: #ffffff;
  background-color: #2c3e50;
}
</style>