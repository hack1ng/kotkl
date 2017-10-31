<template>
  <v-layout wrap>
    <v-flex xs12>
      <h2>{{ teamOwner }}'s Team</h2>
      <h3>{{ teamName }}</h3>
    </v-flex>
    <v-flex xs4 ml-5>
      <panel title="Players">
        <div class="total-team-cost">Total Team Cost: {{sumTotalCost()}}</div>
        <div v-for="player in teamPlayers"
          class="team" 
          :key="player.id">
            <player :player=player />
        </div>
      </panel>
    </v-flex>
    <v-flex xs7 ml-4>
      <panel title="Transactions">
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import PlayersServices from '@/services/PlayersService'
import TeamsServices from '@/services/TeamsService'
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
      teamPlayers: null,
      teamOwner: null,
      teamName: null,
      totalCost: 0
    }
  },
  async mounted () {
    this.teamOwner = this.$store.state.route.params.teamOwner
    this.teamPlayers = (await PlayersServices.getAllPlayersFromTeam(this.teamOwner)).data
    this.totalCost = this.sumTotalCost()
    this.team = (await TeamsServices.getTeam(this.teamOwner)).data
    // calculate total team cost
  },
  methods: {
    sumTotalCost () {
      return this.teamPlayers.reduce(function (prev, player) {
        return prev + player.originalCost
      }, 0)
    }
  },
  watch: {
    team () {
      // this.teamName = this.team.name
    }
  }
}
</script>


<style scoped>
.total-team-cost {
  font-size: 24px;
}
</style>
