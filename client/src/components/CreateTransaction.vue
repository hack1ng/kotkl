<template>
  <v-layout mt-3 mb-3>
    <v-flex>
      <v-form>
        <panel title="Step 1">
          <v-select 
            v-bind:items=transactionTypes
            v-model="selected"
            label="Choose Transaction Type">
          </v-select>
        </panel>
        <panel v-if="selected !== ''" title="Step 2">
          <v-select
            v-if="selected === 'Dropped' || selected === 'Traded'"
            v-bind:items=playersList
            item-text="name"
            item-value="name"
            label="Choose Player">
          </v-select>
          <v-select
            v-if="selected === 'Added'"
            v-bind:items=freeAgentList
            item-text="name"
            item-value="name"
            label="Choose Player">
          </v-select>
        </panel>
        <panel v-if="selected !== ''" title="Step 3">
          <v-select
            v-if="selected === 'Dropped' || selected === 'Traded'"
            v-bind:items=teamsList
            item-text="owner"
            item-value="owner"
            label="Choose From Option">
          </v-select>
          <v-select
            v-if="selected === 'Added'"
            v-bind:items=options
            label="Choose From Option">
          </v-select>
        </panel>
        <panel v-if="selected !== ''" title="Step 4">
          <v-select
            v-if="selected === 'Added' || selected === 'Traded'"
            v-bind:items=teamsList
            item-text="owner"
            item-value="owner"
            label="Choose To Option">
          </v-select>
          <v-select
            v-if="selected === 'Dropped'"
            v-bind:items=options
            label="Choose To Option">
          </v-select>
        </panel>
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
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import TeamsService from '@/services/TeamsService'
import PlayersService from '@/services/PlayersService'
export default {
  data () {
    return {
      playersList: null,
      freeAgentList: null,
      teamsList: null,
      selected: '',
      transactionTypes: [
        { text: 'Added', value: 'Added' },
        { text: 'Dropped', value: 'Dropped' },
        { text: 'Traded', value: 'Traded' }
      ],
      options: [
        { text: 'Free Agent', value: 'Free Agent' },
        { text: 'Waiver', value: 'Waiver' }
      ]
    }
  },
  components: {
    Panel
  },
  async mounted () {
    this.teamsList = (await TeamsService.getAll()).data
    this.playersList = (await PlayersService.getActivePlayers()).data
    this.freeAgentList = (await PlayersService.getFreeAgentPlayers()).data
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
