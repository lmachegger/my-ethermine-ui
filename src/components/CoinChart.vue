<template>
  <VueHighcharts class="hc" :highcharts="Highcharts" :options="options" />
</template>

<script>
import VueHighcharts from "vue3-highcharts";

export default {
  name: "CoinChart",
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
          text: "Coin/h",
        },
        yAxis: {
          title: {
            text: "Coin/h",
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
            name: "ETH",
            data: [],
          },
          {
            name: "BTC",
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
        const eth = new Array();
        const btc = new Array();
        for (let i in val) {
          const dto = val[i];
          eth.push([dto.time * 1000, dto.coinsPerHour]);
          btc.push([dto.time * 1000, dto.btcPerHour]);
        }
        // set to chart
        this.options.series[0].data = eth;
        this.options.series[1].data = btc;
      },
    },
  },
};
</script>