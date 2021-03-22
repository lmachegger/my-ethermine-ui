<template>
  <div class="averageItem">
    <h1 class="averageItemValue">{{ fullValue }}</h1>
    <h1 class="averageItemName">{{ name }}</h1>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import gsap from "gsap";

export default {
  name: "AvgItem",
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
      // if (this.precise) {
      //   return Math.round(this.tweeningValue * 100000000) / 100000000;
      // } else {
      //   return Math.round(this.tweeningValue * 100) / 100;
      // }
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
    // add precise plugin
    gsap.registerPlugin({
      name: "precise",
      init(target, vars, tween, index, targets) {
        let data = this,
          p,
          value;
        data.t = target;
        const max = 7;
        let counter = 0;
        for (p in vars) {
          if (counter >= max) break;
          value = vars[p];
          typeof value === "function" &&
            (value = value.call(tween, index, target, targets));
          data.pt = { n: data.pt, p: p, s: target[p], c: value - target[p] };
          data._props.push(p);
          counter++;
        }
      },
      render(ratio, data) {
        let pt = data.pt;
        while (pt) {
          data.t[pt.p] = pt.s + pt.c * ratio;
          pt = pt.n;
        }
      },
    });

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
        duration: 0.5,
        ease: "sine",
      });

      return oldValue;
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