<template>
  <div id="app">
    <Header title="Ethermine Stats" />
    <h3 class="ethWalletAdress">0x9af9008cc4B5ed2A245c4F0eA042B5396bEf13e0</h3>
    <div class="statList">
      <Averages :avgStats="avgStats" />
      <Maximums :maxStats="maxStats" />
    </div>
    <div class="charts">
      <div class="chart">
        <UsdChart :stats="allStats" />
      </div>
      <div class="chart">
        <CoinChart :stats="allStats" />
      </div>
      <div class="chart">
        <Chart :stats="allStats" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Averages from "./components/Averages";
import Maximums from "./components/Maximums";
import Chart from "./components/Chart";
import CoinChart from "./components/CoinChart";
import UsdChart from "./components/UsdChart";

export default {
  name: "App",
  components: {
    Header,
    Averages,
    Maximums,
    Chart,
    CoinChart,
    UsdChart,
  },
  data() {
    return {
      avgStats: {},
      maxStats: {},
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

    // get MAX
    const maxResponse = await fetch(
      "https://ethermine-api.herokuapp.com/stats/max"
    );
    const maxJson = await maxResponse.json();
    this.maxStats = {
      reportedHashrate: maxJson.reportedHashrate / 1000000,
      currentHashrate: maxJson.currentHashrate / 1000000,
      averageHashrate: maxJson.averageHashrate / 1000000,
      validShares: maxJson.validShares,
      invalidShares: maxJson.invalidShares,
      staleShares: maxJson.staleShares,
      coinsPerHour: maxJson.coinsPerMin * 60,
      usdPerHour: maxJson.usdPerMin * 60,
      btcPerHour: maxJson.btcPerMin * 60,
    };

    // get ALL
    const allResponse = await fetch(
      "https://ethermine-api.herokuapp.com/stats"
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
  margin: auto;
  margin-top: 2rem;
}
@media (min-width: 800px) {
  #app {
    max-width: 90%;
  }
  .statList {
    display: flex;
    justify-content: center;
  }
  .averages {
    margin-right: 2rem;
    margin-left: 2rem;
  }
}
@media (min-width: 2000px) {
  #app {
    max-width: 75%;
  }
  .statList {
    display: flex;
    justify-content: center;
  }
  .averages {
    margin-right: 2rem;
    margin-left: 2rem;
  }
}
.charts {
  margin: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.chart {
  padding: 2rem;
}
.ethWalletAdress {
  margin-top: 0.2rem;
  margin-bottom: 1.5rem;
  font-size: 80%;
}
</style>
