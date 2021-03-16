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
        colors: ["#77a1e5", "#2c3e50"],
        title: {
          text: "Coins",
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
            text: "Coin/h",
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