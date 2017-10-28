<template>
 <v-layout>
    <v-flex xs6 mr-2>
      <panel title="Team">
        <div class="total-team-cost">Total Team Cost: {{sumTotalCost()}}</div>
        <div v-for="player in team"
          class="team" 
          :key="player.id">
            <player :player=player />
        </div>
      </panel>
    </v-flex>
    <v-flex xs6>
      <panel title="Transactions">
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import PlayersServices from '@/services/PlayersService'
import Panel from '@/components/Panel'
import Player from '@/components/Player'
export default {
  components: {
    Panel,
    Player
  },
  data () {
    return {
      team: null,
      teamOwner: null,
      totalCost: 0
    }
  },
  async mounted () {
    this.teamOwner = this.$store.state.route.params.teamOwner
    this.team = (await PlayersServices.getAllPlayersFromTeam(this.teamOwner)).data
    this.totalCost = this.sumTotalCost()
    // calculate total team cost
  },
  methods: {
    sumTotalCost () {
      return this.team.reduce(function (prev, player) {
        return prev + player.originalCost
      }, 0)
    }
  }
}
</script>


<style scoped>
.total-team-cost {
  font-size: 24px;
}
</style>
