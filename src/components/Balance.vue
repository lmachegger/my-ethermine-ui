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
      return Math.round(this.tweeningValue * 100) / 100;
    },
  },
  watch: {
    value(newValue, oldValue) {
      console.log(newValue, oldValue);
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