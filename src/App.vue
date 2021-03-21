<template>
  <Header title="Ethermine Stats" />
  <h3 class="ethWalletAdress">0x9af9008cc4B5ed2A245c4F0eA042B5396bEf13e0</h3>
  <div class="filterButtons">
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
  <div class="statList">
    <Averages :avgStats="allStats.avgStats" />
    <Maximums :maxStats="stats.maxStats" />
  </div>
  <div class="charts">
    <div class="chart">
      <UsdChart :stats="stats.stats" />
    </div>
    <div class="chart">
      <CoinChart :stats="stats.stats" />
    </div>
    <div class="chart">
      <Chart :stats="stats.stats" />
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
  },
  data() {
    return {
      currentFilter: String,
      stats: {},
      allStats: {},
      yearStats: {},
      monthStats: {},
      weekStats: {},
      dayStats: {},
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
      console.log("change filter: " + filter);

      // handle button style
      for (let button of document.getElementsByClassName(
        "filterButtonsButton"
      )) {
        button.className = button.className.replace(" active", "");
      }
      const button = document.getElementById(filter);
      button.className += " active";

      // TODO: filter changed -> update data for components
      // backend api needs to be updated for this
      switch (filter) {
        case "All":
          this.stats = this.allStats;
          break;
        case "Yearly":
          this.stats = this.yearStats;
          break;
        case "Monthly":
          this.stats = this.monthStats;
          break;
        case "Weekly":
          this.stats = this.weekStats;
          break;
        case "Daily":
          this.stats = this.dayStats;
          break;
        default:
          this.stats = this.allStats;
          break;
      }
    },
  },
  async created() {
    // get ALL
    const allRes = await fetch(
      "https://ethermine-api.herokuapp.com/stats/allStats"
    );
    this.allStats = await allRes.json();
    this.changeFilter(this.currentFilter, true);

    const yearRes = await fetch(
      "https://ethermine-api.herokuapp.com/stats/allStats?interval=YEAR"
    );
    this.yearStats = await yearRes.json();

    const monthRes = await fetch(
      "https://ethermine-api.herokuapp.com/stats/allStats?interval=MONTH"
    );
    this.monthStats = await monthRes.json();
    console.log(this.monthStats);

    const weekRes = await fetch(
      "https://ethermine-api.herokuapp.com/stats/allStats?interval=WEEK"
    );
    this.weekStats = await weekRes.json();

    const dayRes = await fetch(
      "https://ethermine-api.herokuapp.com/stats/allStats?interval=DAY"
    );
    this.dayStats = await dayRes.json();
  },
  mounted() {
    this.changeFilter("All");
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
</style>
