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
        title: {
          text: "Hashrate MH/s",
        },
        yAxis: {
          title: {
            text: "MH/s",
          },
        },
        xAxis: {
          type: "datetime",
          tickInterval: 86400 * 1000,
          title: {
            text: "timestamp",
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