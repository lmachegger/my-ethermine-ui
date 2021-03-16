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
        series: [
          {
            data: this.stats?.currentHashrate,
          },
          //   //   {
          //   //     data: [2, 3, 4],
          //   //   },
        ],
      },
    };
  },
  watch: {
    stats: {
      immidiate: true,
      handler: function (val) {
        const hashrates = val.map((dto) => dto.currentHashrate);
        this.options.series[0].data = hashrates;
        // this.options.series.push({
        //   data: hashrates,
        // });
      },
    },
  },
};
</script>