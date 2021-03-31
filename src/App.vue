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
import { fetchData } from "./utility/fetch-data";
import {
  statsToChartData,
  getChartData,
  getMaxStats,
} from "./utility/data-helpers";

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
    fetchData,
    statsToChartData,
    getChartData,
    getMaxStats,
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
    this.filteredStats = await fetchData();

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
