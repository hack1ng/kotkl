<template>
 <v-layout>
    <v-flex xs6 mr-2>
      <panel title="Team 1">
        <v-list two-line>
          <div v-for="(player, index) in team"
            class="team">
            <v-list-tile
              ripple
              @click="toggle(index)">
              <v-list-tile-content>
                <v-list-tile-title>{{ player.name }}</v-list-tile-title>
                <v-list-tile-sub-title class="grey--text text--darken-4">Cost: {{player.originalCost}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Keeper Eligible? <span v-if="player.keeperEligible=='1'">Yes</span><span v-if="!player.keeperEligible=='1'">No</span></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>Selected?</v-list-tile-action-text>
                <v-icon
                  color="grey lighten-1"
                  v-if="selected.indexOf(index) < 0"
                >star_border</v-icon>
                <v-icon
                  color="yellow darken-2"
                  v-else
                >star</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < team.length" :key="player.id"></v-divider>
          </div>
        </v-list>
      </panel>
      <br>
      <panel title="Trade Results">
        <div class="cost">
          Original Team Cost: {{team1Cost}}
        </div>
        <div class="cost">
          New Team Cost: {{team2Cost}}
        </div>
      </panel>
    </v-flex>
    <v-flex xs6>
      <panel title="Team 2">
        <v-list two-line>
          <div v-for="(player, index) in team"
            class="team">
            <v-list-tile
              ripple
              @click="toggle(index)">
              <v-list-tile-content>
                <v-list-tile-title>{{ player.name }}</v-list-tile-title>
                <v-list-tile-sub-title class="grey--text text--darken-4">Cost: {{player.originalCost}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Keeper Eligible? <span v-if="player.keeperEligible=='1'">Yes</span><span v-if="!player.keeperEligible=='1'">No</span></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>Selected?</v-list-tile-action-text>
                <v-icon
                  color="grey lighten-1"
                  v-if="selected.indexOf(index) < 0"
                >star_border</v-icon>
                <v-icon
                  color="yellow darken-2"
                  v-else
                >star</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < team.length" :key="player.id"></v-divider>
          </div>
        </v-list>
      </panel>
      <br>
      <panel title="Trade Results">
        <div class="cost">
          Original Team Cost: {{team2Cost}}
        </div>
        <div class="cost">
          New Team Cost: {{team2Cost}}
        </div>
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
      team1: null,
      team2: null,
      team1Owner: null,
      team2Owner: null,
      team1Cost: 0,
      team2Cost: 0
    }
  },
  async mounted () {
    this.teamOwner = this.$store.state.route.params.teamOwner
    this.team = (await PlayersServices.getAllPlayersFromTeam(this.teamOwner)).data
    this.totalCost = this.sumTotalCost()
    // calculate total team cost
  },
  methods: {
    sumTotalCost (team) {
      return team.reduce(function (prev, player) {
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
