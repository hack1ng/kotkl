<template>
  <v-layout mt-3 mb-3>
    <v-flex xs6 offset-xs3>
      <v-form>
        <panel title="Step 1">
          <v-flex mb-3 class="message">
            * Remember to do a corresponding Add transaction for each Drop transaction and vice-versa
            <br>
            ** Remember to do a separate transaction for each player in a Trade
          </v-flex>
          <v-select 
            v-bind:items=types
            v-model="transaction.type"
            autocomplete
            label="Choose Transaction Type">
          </v-select>
        </panel>
        <panel v-if="transaction.type !== null" title="Step 2">
          <v-btn
            absolute
            dark
            slot="action"
            middle
            right
            color="red"
            @click="navigateTo({name: 'player-create'})"
            >
            <v-icon>add</v-icon>
            Add Player
          </v-btn>
          <v-flex mb-3 class="message">
            * You can search for a player by typing the name
            <br>
            ** If there is no existing player, use the +Add Player button to add them to the system
          </v-flex>
          <v-select
            v-if="transaction.type === 'Dropped' || transaction.type === 'Traded'"
            v-bind:items=playersList
            v-model="player"
            item-text="name"
            item-value="Player"
            autocomplete
            label="Choose Player">
          </v-select>
          <v-select
            v-if="transaction.type === 'Added'"
            v-bind:items=freeAgentList
            v-model="player"
            item-text="name"
            item-value="Player"
            autocomplete
            label="Choose Player">
          </v-select>
        </panel>
        <panel v-if="transaction.type !== null && transaction.player !== null" title="Step 3">
          <v-flex v-if="transaction.type === 'Dropped' || transaction.type === 'Traded'" mb-3 class="message">
            * You can search for a team by typing the owner's name
          </v-flex>
          <v-flex v-if="transaction.type === 'Added'" mb-3 class="message">
            * Make sure to correctly specify if you picked up off waiver or free agency
            <br>
            ** If picked up off waiver, include waiver cost (even if $0)
            <br>
            ** This is super important for keeper eligibility!!
          </v-flex>
          <v-select
            v-if="transaction.type === 'Dropped' || transaction.type === 'Traded'"
            v-bind:items=teamsList
            item-text="owner"
            item-value="owner"
            autocomplete
            v-model="transaction.from"
            label="Choose From Option">
          </v-select>
          <v-select
            v-if="transaction.type === 'Added'"
            v-bind:items=options
            v-model="transaction.from"
            autocomplete
            label="Choose From Option">
          </v-select>
          <v-text-field
            v-model="transaction.cost"
            v-if="transaction.from === 'Waiver'"
            autocomplete
            label="Waiver Cost">
          </v-text-field>
        </panel>
        <panel v-if="transaction.type !== null && transaction.player !== null" title="Step 4">
          <v-flex v-if="transaction.type === 'Added' || transaction.type === 'Traded'" mb-3 class="message">
            * You can search for a team by typing the owner's name
          </v-flex>
          <v-select
            v-if="transaction.type === 'Added' || transaction.type === 'Traded'"
            v-bind:items=teamsList
            item-text="owner"
            item-value="owner"
            autocomplete
            v-model="transaction.to"
            label="Choose To Option">
          </v-select>
          <v-select
            v-if="transaction.type === 'Dropped'"
            v-bind:items=options
            v-model="transaction.to"
            autocomplete
            label="Choose To Option">
          </v-select>
        </panel>
        <v-btn
          dark
          class="orange"
          v-if="transaction.type !== null && transaction.player !== null && transaction.from !== null && transaction.to !== null"
          @click="createTransaction">
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
import TransactionsService from '@/services/TransactionsService'
export default {
  data () {
    return {
      playersList: null,
      freeAgentList: null,
      teamsList: null,
      transaction: {
        type: null,
        player: null,
        from: null,
        to: null,
        cost: null
      },
      player: null,
      types: [
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
  },
  watch: {
    player: function () {
      this.transaction.player = this.player.name
      if (this.transaction.type === 'Dropped') {
        this.transaction.from = this.player.owner
        this.transaction.to = 'Free Agent'
      } else if (this.transaction.type === 'Traded') {
        this.transaction.from = this.player.owner
      }
    }
  },
  methods: {
    async createTransaction () {
      // check to see if we need to modify keeper eligibility
      if (this.transaction.from === 'Free Agent') {
        this.player.keeperEligible = 0
      }

      // check to see if waiver cost was added
      if (this.transaction.cost !== null) {
        this.player.waiverCost = this.transaction.cost
      }

      // set new owner for Player
      this.player.owner = this.transaction.to

      // edit player
      try {
        await PlayersService.edit(this.player)
      } catch (err) {
        console.log(err)
      }

      // add transaction
      try {
        await TransactionsService.create(this.transaction)
      } catch (err) {
        console.log(err)
      }
      this.navigateTo({name: 'transactions'})
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-name {
  font-size: 18px;
}

.message {
  color: blue;
  text-align: left;
}
</style>
