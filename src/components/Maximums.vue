<template>
  <div class="averages">
    <h1 class="averageHeading">Maximum</h1>
    <AvgItem
      name="MH/s reported:"
      :value="roundTo2(maxStats?.reportedHashrate)"
      precision="2"
    />
    <AvgItem
      name="MH/s received:"
      :value="roundTo2(maxStats?.currentHashrate)"
      precision="2"
    />
    <AvgItem
      name="Shares/h:"
      :value="roundTo2(maxStats?.validShares)"
      precision="0"
    />
    <AvgItem
      name="ETH/h:"
      :value="roundTo8(maxStats?.coinsPerHour)"
      precision="8"
    />
    <AvgItem
      name="BTC/h:"
      :value="roundTo8(maxStats?.btcPerHour)"
      precision="8"
    />
    <AvgItem
      name="USD/h:"
      :value="roundTo8(maxStats?.usdPerHour)"
      precision="8"
    />
    <!-- Math.round(num * 100) / 100 -->
  </div>
</template>
<script>
import AvgItem from "./AverageItem";
export default {
  name: "Maximums",
  components: {
    AvgItem,
  },
  props: {
    maxStats: Object,
  },
  methods: {
    roundTo2: function (val) {
      if (val) {
        return Math.round(val * 100) / 100;
      } else {
        return 0;
      }
    },
    roundTo8: function (val) {
      if (val) {
        return Math.round(val * 100000000) / 100000000;
      } else {
        return 0;
      }
    },
  },
};
</script>
<style scoped>
.averages {
  padding-top: 1rem;
}

.averageHeading {
  font-size: 180%;
  padding: 0.5rem;
  margin: 0;
  text-align: left;
  padding-left: 0.3rem;
}
</style>