<template>
  <v-app id="app">
    <v-container grid-list-xs>
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('validate', { router: this.$router, to: '/home' })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
