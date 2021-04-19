<template>
  <div id="balanceContainer">
    <h1 id="balanceName">Balance:</h1>
    <h1 id="balanceValue">{{ balance }} ETH</h1>
  </div>
</template>

<script>
import gsap from "gsap";
export default {
  name: "Balance",
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    balance: function () {
      return Math.round(this.tweeningValue * 100000000) / 100000000;
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
        duration: 0.9,
        ease: "sine",
      });

      return oldValue;
    },
  },
};
</script>

<style scoped>
#balanceContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
h1 {
  margin-left: 0.4rem;
  margin-top: 0.2rem;
  font-size: 120%;
  margin-bottom: 1.5rem;
}
#balanceName {
  font-weight: 400;
}
</style>