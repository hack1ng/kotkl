<template>
  <v-layout wrap>
    <v-flex xs12>
      <panel title="Transactions">
        <v-flex offset-xs3 xs6>
          <v-text-field 
            append-icon="search"
            label="Search"
            v-model="search"
          ></v-text-field>
        </v-flex>
        <v-data-table
          v-bind:headers="headers"
          v-bind:search="search"
          :rows-per-page-items='[10,20,50,{ text: "All", value: -1 }]'
          :items="transactions"
          >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.type }}</td>
            <td><player :player=props.item.Player /></td>
            <td>{{ props.item.from }}</td>
            <td>{{ props.item.to }}</td>
          </template>
        </v-data-table>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import TransactionsServices from '@/services/TransactionsService'
import Panel from '@/components/Panel'
import Player from '@/components/Player'
export default {
  components: {
    Panel,
    Player
  },
  data () {
    return {
      transactions: null,
      search: '',
      headers: [
        {
          text: 'Type',
          sortable: false,
          align: 'center',
          value: 'name'
        },
        { text: 'Player', sortable: false, align: 'left', value: 'player' },
        { text: 'From', sortable: false, align: 'center', value: 'from' },
        { text: 'To', sortable: false, align: 'center', value: 'to' }
      ]
    }
  },
  async mounted () {
    this.transactions = (await TransactionsServices.getAll()).data
  }
}
</script>

<style scoped>
.input-group--text-field input {
  border-bottom: none !important;
}

th {
  font-size: 18px !important;
}
</style>
