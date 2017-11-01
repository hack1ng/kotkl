<template>
  <v-layout mt-3 mb-3>
    <v-flex>
      <v-select class="player-name">
        {{transaction.type}} {{transaction.player}} from {{transaction.from}} to {{transaction.to}}
      </div>
      <v-btn
        dark
        class="orange"
        @click="navigateTo({
          name: 'team',
          params: {
            teamOwner: team.owner
          }
        })">
        Add Transaction
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  import TeamsService from '@/services/TeamsService'
  import PlayersService from '@/services/PlayersService'
  data () {
    return {
      playersList: null,
      freeAgentList: null,
      teamsList: null
    }
  },
  async mounted () {
    this.teamsList = (await TeamsService.getAll()).data
    this.playersList = (await PlayersService.getPlayersList()).data
    this.freeAgentList = (await PlayersService.getFreeAgentList()).data
    // this.teamOwner = this.$store.state.route.params.teamOwner
    // this.team1 = (await PlayersServices.getAllPlayersFromTeam(this.teamOwner)).data
    // this.totalCost = this.sumTotalCost()
    // calculate total team cost
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-name {
  font-size: 18px;
}
</style>
