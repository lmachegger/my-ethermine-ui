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
      <UsdChart :stats="chartStats.usdData" />
    </div>
    <div class="chart">
      <CoinChart :stats="chartStats.coinData" />
    </div>
    <div class="chart">
      <Chart :stats="chartStats.hashrateData" />
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "./components/Header";
import Averages from "./components/Averages";
import Maximums from "./components/Maximums";
import Chart from "./components/Chart";
import CoinChart from "./components/CoinChart";
import UsdChart from "./components/UsdChart";
import Footer from "./components/Footer";
import Button from "./components/Button";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const statsToChartData = (stats) => {
  const coins = [
    {
      name: "ETH",
      prop: "coinsPerHour",
    },
    {
      name: "BTC",
      prop: "btcPerHour",
    },
  ];

  const usd = [
    {
      name: "USD",
      prop: "usdPerHour",
    },
  ];

  const hashrates = [
    {
      name: "reported",
      prop: "reportedHashrate",
    },
    {
      name: "actual",
      prop: "currentHashrate",
    },
  ];

  return {
    coinData: getChartData(coins, stats),
    usdData: getChartData(usd, stats),
    hashrateData: getChartData(hashrates, stats),
  };
};

const getChartData = (objects, data) => {
  return objects.map((d) => ({
    name: d.name,
    data: data.map((i) => [i.time * 1000, i[d.prop]]),
    marker: {
      enabled: false,
    },
    animation: {
      duration: 600,
    },
  }));
};

const getMaxStats = (filterStats) => {
  // calc max of all stats
  const arr = [
    filterStats.All,
    filterStats.Yearly,
    filterStats.Monthly,
    filterStats.Weekly,
    filterStats.Daily,
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

  const validShares = Math.max(...arr.map((o) => o.maxStats?.validShares), 0);

  const coinsPerHour = Math.max(...arr.map((o) => o.maxStats?.coinsPerHour), 0);

  const btcPerHour = Math.max(...arr.map((o) => o.maxStats?.btcPerHour), 0);

  const usdPerHour = Math.max(...arr.map((o) => o.maxStats?.usdPerHour), 0);

  return {
    reportedHashrate: reportedHashrate,
    currentHashrate: currentHashrate,
    validShares: validShares,
    coinsPerHour: coinsPerHour,
    btcPerHour: btcPerHour,
    usdPerHour: usdPerHour,
  };
};

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
      chartStats: {}, // stats for charts
      filteredStats: {}, // stats filtered by time
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

      // handle button style
      for (let button of document.getElementsByClassName(
        "filterButtonsButton"
      )) {
        button.className = button.className.replace(" active", "");
      }
      const button = document.getElementById(filter);
      button.className += " active";

      // set data
      this.chartStats = statsToChartData(this.filteredStats[filter].stats);
      this.stats = this.filteredStats[filter];

      if (filter === "All") {
        this.stats.maxStats = getMaxStats(this.filteredStats);
      }
    },
  },
  async created() {
    const yearRes = await fetch(
      "https://ethermine-api.herokuapp.com/stats/allStats?interval=YEAR"
    );
    const yearStats = await yearRes.json();

    const monthRes = await fetch(
      "https://ethermine-api.herokuapp.com/stats/allStats?interval=MONTH"
    );
    const monthStats = await monthRes.json();

    const weekRes = await fetch(
      "https://ethermine-api.herokuapp.com/stats/allStats?interval=WEEK"
    );
    const weekStats = await weekRes.json();

    const dayRes = await fetch(
      "https://ethermine-api.herokuapp.com/stats/allStats?interval=DAY"
    );
    const dayStats = await dayRes.json();

    // get ALL
    const allRes = await fetch(
      "https://ethermine-api.herokuapp.com/alltimestats"
    );
    const allStats = await allRes.json();

    this.filteredStats = {
      Yearly: yearStats,
      Monthly: monthStats,
      Weekly: weekStats,
      Daily: dayStats,
      All: allStats,
    };

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
.statList {
  display: flex;
  align-items: center;
  flex-direction: column;
}
@media (min-width: 615px) {
  #app {
    max-width: 90%;
  }
  .statList {
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
  .averages {
    margin-right: 1.5rem;
    margin-left: 1.5rem;
    width: 12.9rem;
  }
}
@media (min-width: 2000px) {
  #app {
    max-width: 75%;
  }
  .statList {
    display: flex;
    justify-content: center;
    flex-direction: row;
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
