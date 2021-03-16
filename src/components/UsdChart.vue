<template>
  <VueHighcharts class="hc" :highcharts="Highcharts" :options="options" />
</template>

<script>
import VueHighcharts from "vue3-highcharts";

export default {
  name: "UsdChart",
  components: {
    VueHighcharts,
  },
  props: {
    stats: [Object],
  },
  data() {
    return {
      options: {
        title: {
          text: "USD",
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
            text: "USD/h",
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
            name: "USD",
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
        const usd = new Array();
        for (let i in val) {
          const dto = val[i];
          usd.push([dto.time * 1000, dto.usdPerHour]);
        }
        // set to chart
        this.options.series[0].data = usd;
      },
    },
  },
};
</script>