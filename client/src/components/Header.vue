<template>
  <v-toolbar fixed class="orange">
    <v-toolbar-title class="mr-4">
      <span class="home"
        @click="navigateTo({name: 'teams'})">
        Knights of the Keeper League
      </span>
    </v-toolbar-title>
    <!-- TODO: Implement Me -->
    <v-toolbar-items>
      <v-btn 
        flat
        dark
        @click="navigateTo({name: 'teams'})" >
        View Teams
      </v-btn>
      <v-btn 
        flat
        dark
        @click="navigateTo({name: 'mock-trade'})" >
        Mock Trade
      </v-btn>
      <v-btn 
        flat
        dark
        @click="navigateTo({name: 'transactions'})" >
        View Transactions
      </v-btn>
      <v-btn 
        flat
        dark
        @click="navigateTo({name: 'transactions-add'})" >
        Add Transaction
      </v-btn>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items >
      <v-btn 
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        @click="navigateTo({name: 'login'})" >
        Login
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        @click="navigateTo({name: 'register'})" >
        Sign Up
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        dark
        @click="logout" >
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      // TODO: redirect to homepage
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: white;
}
</style>
