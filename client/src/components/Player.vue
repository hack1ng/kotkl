<template>
  <v-layout mt-3 mb-3>
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
    'player'
  ],
  data () {
    return {
      name: null,
      owner: null,
      originalCost: null,
      waiverCost: null,
      keeperEligible: null,
      imageUrl: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-name {
  font-size: 30px;
}
</style>
