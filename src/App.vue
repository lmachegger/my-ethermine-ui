<template>
  <div id="app">
    <Header title='Ethermine Stats'/>
    <h3>0x9af9008cc4B5ed2A245c4F0eA042B5396bEf13e0</h3>
    <Averages :avgStats=avgStats />
    <Chart />
  </div>
</template>

<script>
import Header from './components/Header'
import Averages from './components/Averages'
import Chart from './components/Chart';

export default {
  name: 'App',
  components:{
    Header,
    Averages,
    Chart
  },
  data(){
    return{
      avgStats: {}
    }
  },
  async created(){
    const avgResponse = await fetch('https://ethermine-api.herokuapp.com/stats/average');
    const avgRes = await avgResponse.json();
    this.avgStats = {
      reportedHashrate: avgRes.reportedHashrate / 1000000,
      currentHashrate: avgRes.currentHashrate / 1000000,
      averageHashrate: avgRes.averageHashrate / 1000000,
      validShares: avgRes.validShares,
      invalidShares: avgRes.invalidShares,
      staleShares: avgRes.staleShares,
      coinsPerHour: avgRes.coinsPerMin * 60,
      usdPerHour: avgRes.usdPerMin * 60,
      btcPerHour: avgRes.btcPerMin * 60
    };
    console.log(avgRes);
    console.log(this.avgStats);
  }
}

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
