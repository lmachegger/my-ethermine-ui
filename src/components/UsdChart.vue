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
          text: "USD/h",
        },
        yAxis: {
          title: {
            text: "USD/h",
          },
        },
        xAxis: {
          type: "datetime",
          tickInterval: 86400 * 1000, // 1 day in ms
          title: {
            text: "timestamp",
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