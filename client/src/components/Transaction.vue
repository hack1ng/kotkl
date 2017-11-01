<template>
  <v-layout mt-3 mb-3>
    <v-flex>
      <div class="player-name">
        {{transaction.type}} {{transaction.player}} from {{transaction.from}} to {{transaction.to}}
      </div>
      <!-- <v-btn
        dark
        class="orange"
        @click="navigateTo({
          name: 'team',
          params: {
            teamOwner: team.owner
          }
        })">
        View Team
      </v-btn> -->
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [
    'transaction'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-name {
  font-size: 18px;
}
</style>
