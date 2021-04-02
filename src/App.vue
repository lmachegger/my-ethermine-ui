<template>
  <Header />
  <Balance :value="filteredStats.Balance" v-show="loaded" />
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
    <DataList :data="stats.avgStats" headingText="Averages" />
    <DataList :data="stats.maxStats" headingText="Maximums" />
  </div>
  <div class="charts" v-if="loaded">
    <div class="chart">
      <Chart :stats="chartStats.usdData" chartName="Usd" />
    </div>
    <div class="chart">
      <Chart :stats="chartStats.coinData" chartName="Coins" />
    </div>
    <div class="chart">
      <Chart :stats="chartStats.hashrateData" chartName="Hashrate" />
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "./components/Header";
import DataList from "./components/DataList";
import Chart from "./components/Chart";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Balance from "./components/Balance";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { fetchData } from "./utility/fetch-data";
import {
  statsToChartData,
  getChartData,
  getMaxStats,
} from "./utility/data-helpers";
import { gsapAddPrecisePlugin } from "./utility/gsap-helpers";

export default {
  name: "App",
  components: {
    Header,
    DataList,
    Chart,
    Footer,
    Button,
    PulseLoader,
    Balance,
  },
  data() {
    return {
      currentFilter: String,
      stats: {}, // stat for Avg and Max
      chartStats: {}, // stats for charts
      filteredStats: {}, // stats filtered by time
      loaded: false,
    };
  },
  methods: {
    fetchData,
    statsToChartData,
    getChartData,
    getMaxStats,
    gsapAddPrecisePlugin,
    changeFilter(filter, forceUpdate = false) {
      // early return if filter has not changed
      if (this.currentFilter === filter && !forceUpdate) {
        return;
      }

      // change filter
      this.currentFilter = filter;

      this.handleButtonStyle(filter);

      // set data
      this.chartStats = statsToChartData(this.filteredStats[filter].stats);
      this.stats = this.filteredStats[filter];

      if (filter === "All") {
        this.stats.maxStats = getMaxStats(this.filteredStats);
      }
    },
    handleButtonStyle(filter) {
      for (let button of document.getElementsByClassName(
        "filterButtonsButton"
      )) {
        button.className = button.className.replace(" active", "");
      }
      const button = document.getElementById(filter);
      button.className += " active";
    },
  },
  mounted() {
    gsapAddPrecisePlugin();
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

#loadingSpinner {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
