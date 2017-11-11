<template>
 <v-layout row wrap>
   <v-flex xs12>
    <panel title="Mock Trade Tool">
   <!-- <v-flex xs12>
     <pageTitle title="Mock Trade" />
   </v-flex> -->
    <v-flex d-flex xs12>
      <v-flex xs6 pr-2>
        <v-select
          label="Select Team"
          v-bind:items="teamsList"
          @change="selectTeam1"
          item-text="owner"
          item-value="owner"
          max-height="auto"
          chips
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              @input="data.parent.selectItem(data.item)"
              :selected="data.selected"
              :key="JSON.stringify(data.item)"
            >
              {{data.item.owner}} - {{ data.item.name }}
            </v-chip>
          </template>
          <template slot="item" slot-scope="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.owner"></v-list-tile-title>
                <v-list-tile-sub-title v-html="data.item.name"></v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-select>
        <panel title="Team 1">
          <div class="original-cost">
            Original Team Cost: {{team1Cost}}
          </div>
          <div class="new-cost">
            New Team Cost: {{team1NewCost}}
          </div>
          <v-list two-line>
            <div v-for="(player, index) in team1"
              class="team">
              <v-list-tile
                ripple
                @click="toggleTeam1(index, player.originalCost)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ player.name }}</v-list-tile-title>
                  <v-list-tile-sub-title class="grey--text text--darken-4">Cost: {{player.originalCost}}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>Keeper Eligible? <span v-if="player.keeperEligible=='1'">Yes</span><span v-if="!player.keeperEligible=='1'">No</span></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>Trade?</v-list-tile-action-text>
                  <v-icon
                    color="grey lighten-1"
                    v-if="selected1.indexOf(index) < 0"
                  >check_circle_outline</v-icon>
                  <v-icon
                    color="yellow darken-2"
                    v-else
                  >check_circle</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < team1.length" :key="player.id"></v-divider>
            </div>
          </v-list>
        </panel>
      </v-flex>
      <v-flex xs6>
        <v-select
          label="Select Team"
          v-bind:items="teamsList"
          @change="selectTeam2"
          item-text="owner"
          item-value="owner"
          max-height="auto"
          chips
          name="team2Select"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              @input="data.parent.selectItem(data.item)"
              :selected="data.selected"
              :key="JSON.stringify(data.item)"
            >
              {{data.item.owner}} - {{ data.item.name }}
            </v-chip>
          </template>
          <template slot="item" slot-scope="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.owner"></v-list-tile-title>
                <v-list-tile-sub-title v-html="data.item.name"></v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-select>
        <panel title="Team 2">
          <div class="original-cost">
            Original Team Cost: {{team2Cost}}
          </div>
          <div class="new-cost">
            New Team Cost: {{team2NewCost}}
          </div>
          <v-list two-line>
            <div v-for="(player, index) in team2"
              class="team">
              <v-list-tile
                ripple
                @click="toggleTeam2(index, player.originalCost)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ player.name }}</v-list-tile-title>
                  <v-list-tile-sub-title class="grey--text text--darken-4">Cost: {{player.originalCost}}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>Keeper Eligible? <span v-if="player.keeperEligible=='1'">Yes</span><span v-if="!player.keeperEligible=='1'">No</span></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>Trade?</v-list-tile-action-text>
                  <v-icon
                    color="grey lighten-1"
                    v-if="selected2.indexOf(index) < 0"
                  >check_circle_outline</v-icon>
                  <v-icon
                    color="yellow darken-2"
                    v-else
                  >check_circle</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < team2.length" :key="player.id"></v-divider>
            </div>
          </v-list>
        </panel>
      </v-flex>
    </v-flex>
    </panel>
  </v-flex>
  </v-layout>
</template>

<script>
import PlayersServices from '@/services/PlayersService'
import TeamsService from '@/services/TeamsService'
import Panel from '@/components/Panel'
import Player from '@/components/Player'
import PageTitle from '@/components/PageTitle'
export default {
  components: {
    Panel,
    Player,
    PageTitle
  },
  data () {
    return {
      selected1: [],
      selected2: [],
      teamsList: null,
      team1: null,
      team2: null,
      team1Cost: 0,
      team2Cost: 0,
      team1Change: 0,
      team2Change: 0,
      team1NewCost: 0,
      team2NewCost: 0
    }
  },
  async mounted () {
    this.teamsList = (await TeamsService.getAll()).data
  },
  methods: {
    sumTotalCost (team) {
      return team.reduce(function (prev, player) {
        return prev + player.originalCost
      }, 0)
    },
    async selectTeam1 (team) {
      this.resetTeam1()
      this.team1 = (await PlayersServices.getAllPlayersFromTeam(team)).data
      this.team1Cost = this.sumTotalCost(this.team1)
      this.team1NewCost = this.team1Cost - this.team2Change
    },
    async selectTeam2 (team) {
      this.resetTeam2()
      this.team2 = (await PlayersServices.getAllPlayersFromTeam(team)).data
      this.team2Cost = this.sumTotalCost(this.team2)
      this.team2NewCost = this.team2Cost - this.team1Change
    },
    toggleTeam1 (index, cost) {
      const i = this.selected1.indexOf(index)
      if (i > -1) {
        this.selected1.splice(i, 1)
        this.team1Change += cost
      } else {
        this.selected1.push(index)
        this.team1Change -= cost
      }
    },
    toggleTeam2 (index, cost) {
      const i = this.selected2.indexOf(index)
      if (i > -1) {
        this.selected2.splice(i, 1)
        this.team2Change += cost
      } else {
        this.selected2.push(index)
        this.team2Change -= cost
      }
    },
    resetTeam1 () {
      this.team1Cost = 0
      this.team1Change = 0
      this.team1NewCost = 0
      this.selected1 = []
    },
    resetTeam2 () {
      this.team2Cost = 0
      this.team2Change = 0
      this.team2NewCost = 0
      this.selected2 = []
    }
  },
  watch: {
    team1Change () {
      this.team1NewCost = this.team1Cost + this.team1Change - this.team2Change
      this.team2NewCost = this.team2Cost + this.team2Change - this.team1Change
    },
    team2Change () {
      this.team1NewCost = this.team1Cost + this.team1Change - this.team2Change
      this.team2NewCost = this.team2Cost + this.team2Change - this.team1Change
    }
  }
}
</script>


<style scoped>
.original-cost {
  font-size: 18px;
}

.new-cost {
  font-size: 18px;
  font-weight: bold;
}
</style>
