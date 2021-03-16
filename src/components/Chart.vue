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
  data() {
    return {
      options: {
        series: [
          {
            data: [1, 2, 3],
          },
          {
            data: [2, 3, 4],
          },
        ],
      },
      // Highcharts: Highcharts
    };
  },
};
</script>