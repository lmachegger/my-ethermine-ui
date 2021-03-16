<template>
  <VueHighcharts class="hc" :highcharts="Highcharts" :options="options" />
</template>

<script>
import VueHighcharts from "vue3-highcharts";

export default {
  name: "MyChart",
  components: {
    VueHighcharts,
  },
  props: {
    stats: [Object],
  },
  data() {
    return {
      options: {
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
        series: [
          {
            name: "Actual Hashrate",
            data: [],
          },
          {
            name: "Reported Hashrate",
            data: [],
          },
        ],
      },
    };
  },
  watch: {
    stats: {
      immidiate: true,
      handler: function (val) {
        // create data for chart
        const newHashRates = new Array();
        const repHashrates = new Array();
        for (let i in val) {
          const dto = val[i];
          newHashRates.push([dto.time * 1000, dto.currentHashrate]);
          repHashrates.push([dto.time * 1000, dto.reportedHashrate]);
        }
        // set to chart
        this.options.series[0].data = newHashRates;
        this.options.series[1].data = repHashrates;
      },
    },
  },
};
</script>