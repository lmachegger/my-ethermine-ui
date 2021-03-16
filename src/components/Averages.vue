<template>
  <div class="averages">
    <h1 class="averageHeading">All time averages</h1>
    <AvgItem
      name="MH/s reported"
      :value="avgStats?.reportedHashrate?.toFixed(2)"
    />
    <AvgItem
      name="MH/s received"
      :value="avgStats?.currentHashrate?.toFixed(2)"
    />
    <AvgItem name="Shares/h" :value="avgStats?.validShares?.toFixed(2)" />
    <AvgItem name="ETH/h" :value="avgStats?.coinsPerHour?.toFixed(8)" />
    <AvgItem name="BTC/h" :value="avgStats?.btcPerHour?.toFixed(8)" />
    <AvgItem name="USD/h" :value="avgStats?.usdPerHour?.toFixed(8)" />
  </div>
</template>
<script>
import AvgItem from "./AverageItem";
export default {
  name: "Averages",
  components: {
    AvgItem,
  },
  props: {
    avgStats: Object,
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