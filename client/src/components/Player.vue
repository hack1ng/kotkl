<template>
  <v-layout>
    <v-flex>
      <div class="player-name">
        {{player.name}}
      </div>
      <div class="player-cost">
        Cost: {{player.originalCost}}
      </div>
      <div class="player-keeper">
        Keeper Eligible? <span v-if="player.keeperEligible=='1'">Yes</span><span v-if="!player.keeperEligible=='1'">No</span>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [
    'player'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-name {
    height: 24px;
    line-height: 24px;
    position: relative;
    text-align: left;
}

.player-cost {
    position: relative;
    text-align: left;
}

.player-keeper {
    font-size: 14px;
    text-align: left;
    color: rgba(0,0,0,.54);
}
</style>
