<template>
  <div class="averages">
    <h1 class="averageHeading">Maximum</h1>
    <AvgItem
      name="MH/s reported"
      :value="maxStats?.reportedHashrate?.toFixed(2)"
    />
    <AvgItem
      name="MH/s received"
      :value="maxStats?.currentHashrate?.toFixed(2)"
    />
    <AvgItem name="Shares/h" :value="maxStats?.validShares?.toFixed(2)" />
    <AvgItem name="ETH/h" :value="maxStats?.coinsPerHour?.toFixed(8)" />
    <AvgItem name="BTC/h" :value="maxStats?.btcPerHour?.toFixed(8)" />
    <AvgItem name="USD/h" :value="maxStats?.usdPerHour?.toFixed(8)" />
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
}
</style>