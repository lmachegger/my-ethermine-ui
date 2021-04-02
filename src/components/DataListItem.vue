<template>
  <div class="dataListItem">
    <h1 class="dataListItemName">{{ name }}</h1>
    <h1 class="dataListItemValue">{{ fullValue }}</h1>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: "DataListItem",
  props: {
    name: String,
    value: {
      type: Number,
      default: 0,
    },
    precision: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    fullValue() {
      const precisionVal = 10 ** this.precision;
      return Math.round(this.tweeningValue * precisionVal) / precisionVal;
    },
  },
  watch: {
    value(newValue, oldValue) {
      this.tween(newValue, oldValue);
    },
  },
  mounted() {
    this.tween(this.value, 0);
  },
  data() {
    return {
      tweeningValue: 0,
    };
  },
  methods: {
    tween(newValue, oldValue) {
      gsap.to(this.$data, {
        precise: {
          tweeningValue: newValue,
        },
        duration: 0.55,
        ease: "sine",
      });

      return oldValue;
    },
  },
};
</script>

<style scoped>
.dataListItem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

h1 {
  margin: 0.3rem;
  margin-top: 0.1rem;
  font-size: 120%;
}

.dataListItemName {
  font-weight: 400;
}
</style>