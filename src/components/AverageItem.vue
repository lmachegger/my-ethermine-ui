<template>
    <div class='averageItem'>
        <h1>{{name}}</h1>
        <h1>{{value}}</h1>
    </div>
</template>

<script>
export default {
    name:'AvgItem',
    props:{
        name: String,
        value: {
            type: Number,
            default: 1,
        },
        multiplier:{
            type: Number,
            default: 0
        }
    }    
}
</script>

<style scoped>
.averageItem{
    display: flex;
    flex-direction: row;
    justify-content: center;
}

h1{
    margin: 0.5rem;
    margin-top: 0.2rem;
    font-size: 150%;
}


</style>