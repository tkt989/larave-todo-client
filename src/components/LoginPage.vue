<template>
  <v-layout xs3 justify-center align-center>
    <v-form class="form">
      <v-text-field
        v-model="email"
        label="E-Mail"
        required/>
      <v-text-field
        v-model="password"
        label="Password"
        :type="'password'"
        required/>

      <v-btn @click="$store.dispatch('login', { router: $router, user: { email, password } })">Login</v-btn>
      <v-btn @click="$router.push('register')">Register</v-btn>

      <div v-if="showError" class="error">{{error}}</div>
    </v-form>
  </v-layout>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    showError() {
      return this.$store.state.auth.error != null
    },

    error() {
      return this.$store.state.auth.error
    }
  }
}
</script>

<style lang="stylus" scoped>
.form {
  width: 300px;
}

.error {
  color: red;
}
</style>
