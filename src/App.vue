<template>
  <div id="app">
    <Header title="Ethermine Stats" />
    <h3>0x9af9008cc4B5ed2A245c4F0eA042B5396bEf13e0</h3>
    <Averages :avgStats="avgStats" />
    <Chart :stats="allStats" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Averages from "./components/Averages";
import Chart from "./components/Chart";

export default {
  name: "App",
  components: {
    Header,
    Averages,
    Chart,
  },
  data() {
    return {
      avgStats: {},
      allStats: [{}],
    };
  },
  async created() {
    // get AVG
    const avgResponse = await fetch(
      "https://ethermine-api.herokuapp.com/stats/average"
    );
    const avgJson = await avgResponse.json();
    this.avgStats = {
      reportedHashrate: avgJson.reportedHashrate / 1000000,
      currentHashrate: avgJson.currentHashrate / 1000000,
      averageHashrate: avgJson.averageHashrate / 1000000,
      validShares: avgJson.validShares,
      invalidShares: avgJson.invalidShares,
      staleShares: avgJson.staleShares,
      coinsPerHour: avgJson.coinsPerMin * 60,
      usdPerHour: avgJson.usdPerMin * 60,
      btcPerHour: avgJson.btcPerMin * 60,
    };

    // get ALL
    const allResponse = await fetch(
      "https://ethermine-api.herokuapp.com/stats?limit=5"
    );
    const allJson = await allResponse.json();
    const allData = new Array();
    for (let i in allJson) {
      const dto = allJson[i];
      allData.push({
        time: dto.time,
        id: dto.id,
        reportedHashrate: dto.reportedHashrate / 1000000,
        currentHashrate: dto.currentHashrate / 1000000,
        averageHashrate: dto.averageHashrate / 1000000,
        validShares: dto.validShares,
        invalidShares: dto.invalidShares,
        staleShares: dto.staleShares,
        coinsPerHour: dto.coinsPerMin * 60,
        usdPerHour: dto.usdPerMin * 60,
        btcPerHour: dto.btcPerMin * 60,
      });
    }
    this.allStats = allData;
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
