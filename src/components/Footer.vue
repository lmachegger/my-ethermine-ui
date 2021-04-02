<template>
  <footer>
    <p>made by <a href="https://machegger.tech">Lukas Machegger</a></p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  align-items: center;
  margin: 0;
  margin-top: 1rem;
  margin-bottom: 2rem;
}
p {
  margin: 0.5rem;
  font-size: 100%;
}
a:link {
  color: #2c3e50;
  text-decoration: none;
}

a:visited {
  color: #2c3e50;
}

a:hover {
  color: #2c3e50;
  text-decoration: underline;
}

a:active {
  color: #2c3e50;
  text-decoration: underline;
}
</style>