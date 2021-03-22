<template>
  <VueHighcharts
    v-if="showChart"
    ref="coinchart"
    class="hc"
    :options="options"
    :deepCopyOnUpdate="false"
    :redrawOnUpdate="false"
    :oneToOneUpdate="false"
    :animateOnUpdate="false"
  />
</template>

<script>
import VueHighcharts from "vue3-highcharts";

export default {
  name: "MyChart",
  components: {
    VueHighcharts,
  },
  props: {
    stats: Array,
    default: () => [],
  },
  data() {
    return {
      showChart: true,
    };
  },
  computed: {
    options() {
      return {
        colors: ["#77a1e5", "#2c3e50"],
        title: {
          text: "Hashrate",
          style: {
            "font-family": "Avenir, Helvetica, Arial, sans-serif",
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale",
            color: "#2c3e50",
            "font-weight": "bold",
            "font-size": "200%",
          },
        },
        yAxis: {
          title: {
            text: "MH/s",
          },
        },
        xAxis: {
          type: "datetime",
          tickInterval: 86400 * 1000, // 1 day in ms
          labels: {
            rotation: 60,
          },
        },
        series: this.stats,
      };
    },
  },
  watch: {
    stats: {
      handler() {
        // this destroys the chart
        this.showChart = false;
        this.$nextTick(() => {
          // this renders a new one, with the new set of data
          this.showChart = true;
        });
      },
    },
  },
};
</script>