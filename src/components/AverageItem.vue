<template>
  <div class="averageItem">
    <h1 class="averageItemValue">{{ value }}</h1>
    <h1 class="averageItemName">{{ name }}</h1>
  </div>
</template>

<script>
export default {
  name: "AvgItem",
  props: {
    name: String,
    value: {
      type: String,
      default: "1",
    },
  },
};
</script>

<style scoped>
.averageItem {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

h1 {
  margin: 0.3rem;
  margin-top: 0.1rem;
  font-size: 120%;
}

.averageItemName {
  font-weight: 400;
}
</style>