<template>
  <Header title="Ethermine Stats" />
  <h3 class="ethWalletAdress">0x9af9008cc4B5ed2A245c4F0eA042B5396bEf13e0</h3>
  <div class="filterButtons" v-show="loaded">
    <Button
      class="filterButtonsButton"
      title="All"
      v-on:change-filter="changeFilter"
    />
    <Button
      class="filterButtonsButton"
      title="Monthly"
      v-on:change-filter="changeFilter"
    />
    <Button
      class="filterButtonsButton"
      title="Weekly"
      v-on:change-filter="changeFilter"
    />
    <Button
      class="filterButtonsButton"
      title="Daily"
      v-on:change-filter="changeFilter"
    />
  </div>
  <pulse-loader
    id="loadingSpinner"
    :loading="!loaded"
    :color="'#2c3e50'"
    :size="'2.5rem'"
  ></pulse-loader>
  <div class="statList" v-if="loaded">
    <Averages :avgStats="stats.avgStats" />
    <Maximums :maxStats="stats.maxStats" />
  </div>
  <div class="charts" v-if="loaded">
    <div class="chart">
      <UsdChart :stats="usdStats" />
    </div>
    <div class="chart">
      <CoinChart :stats="coinStats" />
    </div>
    <div class="chart">
      <Chart :stats="hsStats" />
    </div>
  </div>
  <Footer />
</template>

<script>
/* eslint-disable vue/no-unused-components */
import Header from "./components/Header";
import Averages from "./components/Averages";
import Maximums from "./components/Maximums";
import Chart from "./components/Chart";
import CoinChart from "./components/CoinChart";
import UsdChart from "./components/UsdChart";
import Footer from "./components/Footer";
import Button from "./components/Button";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const coinDataMapper = (data) =>
  [
    {
      name: "ETH",
      prop: "coinsPerHour",
    },
    {
      name: "BTC",
      prop: "btcPerHour",
    },
  ].map((d) => ({
    name: d.name,
    data: data.map((i) => [i.time * 1000, i[d.prop]]),
    marker: {
      enabled: false,
    },
  }));

const usdDataMapper = (data) =>
  [
    {
      name: "USD",
      prop: "usdPerHour",
    },
  ].map((d) => ({
    name: d.name,
    data: data.map((i) => [i.time * 1000, i[d.prop]]),
    marker: {
      enabled: false,
    },
  }));

const hsDataMapper = (data) =>
  [
    {
      name: "reported",
      prop: "reportedHashrate",
    },
    {
      name: "actual",
      prop: "currentHashrate",
    },
  ].map((d) => ({
    name: d.name,
    data: data.map((i) => [i.time * 1000, i[d.prop]]),
    marker: {
      enabled: false,
    },
  }));

export default {
  name: "App",
  components: {
    Header,
    Averages,
    Maximums,
    Chart,
    CoinChart,
    UsdChart,
    Footer,
    Button,
    PulseLoader,
  },
  data() {
    return {
      currentFilter: String,
      stats: {}, // stat for Avg and Max
      coinStats: [], // stat for ETH and BTC
      usdStats: [], // stat for USD
      hsStats: [], // stat for Hashrate
      allStats: {}, // fetched stat
      yearStats: {}, // fetched stat
      monthStats: {}, // fetched stat
      weekStats: {}, // fetched stat
      dayStats: {}, // fetched stat
      maxStats: {}, // max of all stats
      loadingSpinnerColor: "#2c3e50",
      loaded: false,
    };
  },
  methods: {
    changeFilter(filter, forceUpdate = false) {
      // early return if filter has not changed
      if (this.currentFilter === filter && !forceUpdate) {
        return;
      }

      // change filter
      this.currentFilter = filter;
      console.log(filter);
      console.log("change filter: " + filter);

      // handle button style
      for (let button of document.getElementsByClassName(
        "filterButtonsButton"
      )) {
        button.className = button.className.replace(" active", "");
      }
      const button = document.getElementById(filter);
      button.className += " active";

      // update maxStats
      this.setMaxStats();

      // update stats for chart and statistik
      switch (filter) {
        case "All":
          this.coinStats = coinDataMapper(this.allStats.stats);
          this.usdStats = usdDataMapper(this.allStats.stats);
          this.hsStats = hsDataMapper(this.allStats.stats);
          this.stats = this.allStats;
          this.stats.maxStats = this.maxStats;
          break;
        case "Yearly":
          this.coinStats = coinDataMapper(this.yearStats.stats);
          this.usdStats = usdDataMapper(this.yearStats.stats);
          this.hsStats = hsDataMapper(this.yearStats.stats);
          this.stats = this.yearStats;
          break;
        case "Monthly":
          this.coinStats = coinDataMapper(this.monthStats.stats);
          this.usdStats = usdDataMapper(this.monthStats.stats);
          this.hsStats = hsDataMapper(this.monthStats.stats);
          this.stats = this.monthStats;
          break;
        case "Weekly":
          this.coinStats = coinDataMapper(this.weekStats.stats);
          this.usdStats = usdDataMapper(this.weekStats.stats);
          this.hsStats = hsDataMapper(this.weekStats.stats);
          this.stats = this.weekStats;
          break;
        case "Daily":
          this.coinStats = coinDataMapper(this.dayStats.stats);
          this.usdStats = usdDataMapper(this.dayStats.stats);
          this.hsStats = hsDataMapper(this.dayStats.stats);
          this.stats = this.dayStats;
          break;
      }
    },
    setMaxStats() {
      if (this.currentFilter != "All") {
        this.maxStats = this.stats.maxStats;
        return;
      }
      // else calc max of all stats
      const arr = [
        this.allStats,
        this.yearStats,
        this.monthStats,
        this.weekStats,
        this.dayStats,
      ];
      console.log(arr);

      const reportedHashrate = Math.max(
        ...arr.map((o) => o.maxStats?.reportedHashrate),
        0
      );

      const currentHashrate = Math.max(
        ...arr.map((o) => o.maxStats?.currentHashrate),
        0
      );

      const validShares = Math.max(
        ...arr.map((o) => o.maxStats?.validShares),
        0
      );

      const coinsPerHour = Math.max(
        ...arr.map((o) => o.maxStats?.coinsPerHour),
        0
      );

      const btcPerHour = Math.max(...arr.map((o) => o.maxStats?.btcPerHour), 0);

      const usdPerHour = Math.max(...arr.map((o) => o.maxStats?.usdPerHour), 0);

      this.maxStats = {
        reportedHashrate: reportedHashrate,
        currentHashrate: currentHashrate,
        validShares: validShares,
        coinsPerHour: coinsPerHour,
        btcPerHour: btcPerHour,
        usdPerHour: usdPerHour,
      };
    },
  },
  async created() {
    const yearRes = await fetch(
      "https://ethermine-api.herokuapp.com/stats/allStats?interval=YEAR"
    );
    this.yearStats = await yearRes.json();

    const monthRes = await fetch(
      "https://ethermine-api.herokuapp.com/stats/allStats?interval=MONTH"
    );
    this.monthStats = await monthRes.json();

    const weekRes = await fetch(
      "https://ethermine-api.herokuapp.com/stats/allStats?interval=WEEK"
    );
    this.weekStats = await weekRes.json();

    const dayRes = await fetch(
      "https://ethermine-api.herokuapp.com/stats/allStats?interval=DAY"
    );
    this.dayStats = await dayRes.json();

    // get ALL
    const allRes = await fetch(
      "https://ethermine-api.herokuapp.com/alltimestats"
    );
    this.allStats = await allRes.json();
    this.currentFilter = "All";
    this.changeFilter(this.currentFilter, true);
    this.loaded = true;
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
.filterButtons {
  display: flex;
  justify-content: center;
}
@media (min-width: 615px) {
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
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.ethWalletAdress {
  margin-top: 0.2rem;
  margin-bottom: 1.5rem;
  font-size: 80%;
}
#loadingSpinner {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
