<template>
    <div>
    <AvgItem name='Reported MH/s:' :value=avgStats?.reportedHashrate?.toFixed(2) /> 
    <AvgItem name='Actual MH/s:' :value=avgStats?.currentHashrate?.toFixed(2) /> 
    <AvgItem name='Valid Shares/h:' :value=avgStats?.validShares?.toFixed(2) /> 
    <AvgItem name='ETH/h:' :value=avgStats?.coinsPerHour?.toFixed(8) /> 
    <AvgItem name='BTC/h:' :value=avgStats?.btcPerHour?.toFixed(8) /> 
    <AvgItem name='USD/h:' :value=avgStats?.usdPerHour?.toFixed(8) /> 
   </div>
</template>
<script>
import AvgItem from './AverageItem'
export default {
    name: 'Averages',
    components:{
        AvgItem
    },
    props:{
        avgStats: Object
    }
}
</script>

<style scoped>
    
</style>