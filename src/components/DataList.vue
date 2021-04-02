<template>
  <div class="dataList">
    <h1 class="dataListHeading">{{ headingText }}</h1>
    <DataListItem
      name="MH/s reported:"
      :value="data?.reportedHashrate"
      :precision="2"
    />
    <DataListItem
      name="MH/s received:"
      :value="data?.currentHashrate"
      :precision="2"
    />
    <DataListItem name="Shares/h:" :value="data?.validShares" :precision="2" />
    <DataListItem name="ETH/h:" :value="data?.coinsPerHour" :precision="8" />
    <DataListItem name="BTC/h:" :value="data?.btcPerHour" :precision="8" />
    <DataListItem name="USD/h:" :value="data?.usdPerHour" :precision="8" />
  </div>
</template>
<script>
import DataListItem from "./DataListItem";
export default {
  name: "DataList",
  components: {
    DataListItem,
  },
  props: {
    data: Object,
    headingText: String,
  },
};
</script>

<style scoped>
.dataList {
  padding-top: 1rem;
  width: 12.9rem;
}

@media (min-width: 615px) {
  .dataList {
    margin-right: 1.5rem;
    margin-left: 1.5rem;
  }
}
@media (min-width: 2000px) {
  .dataList {
    margin-right: 2rem;
    margin-left: 2rem;
  }
}

.dataListHeading {
  font-size: 180%;
  padding: 0.5rem;
  margin: 0;
  text-align: left;
  padding-left: 0.3rem;
}
</style>