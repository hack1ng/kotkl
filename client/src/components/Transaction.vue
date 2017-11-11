<template>
  <v-layout  row fullwidth>
    <v-flex xs2>
      {{transaction.type}}
    </v-flex>
    <v-flex  xs5>
      <player :player=transaction.Player />
    </v-flex>
    <v-flex xs5>
      from {{transaction.from}}
    </v-flex>
    <v-flex xs5>
      to {{transaction.to}}
    </v-flex>
  </v-layout>
</template>

<script>
import Player from '@/components/Player'
import PlayersService from '@/services/PlayersService'
export default {
  props: [
    'transaction'
  ],
  async mounted () {
    this.player = await (PlayersService.getPlayerByName(this.transaction.player)).data
  },
  components: {
    Player
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-name {
  font-size: 18px;
}
.fullwidth {
  width: 100%;
}
</style>
