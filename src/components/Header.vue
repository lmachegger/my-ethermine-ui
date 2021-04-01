<template>
  <header>
    <h1>Ethermine Stats</h1>
    <h3 class="ethWalletAdress">0x9af9008cc4B5ed2A245c4F0eA042B5396bEf13e0</h3>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  align-items: center;
  margin: 0;
}
h1 {
  margin: 0;
  font-size: 250%;
}
.ethWalletAdress {
  margin-top: 0.2rem;
  margin-bottom: 1.5rem;
  font-size: 80%;
}
</style>