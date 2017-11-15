<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Player Data">
        <v-text-field
          label="Name"
          required
          :rules="[required]"
          v-model="player.name"
        ></v-text-field>
        <v-text-field
          label="Owner"
          required
          disabled
          :rules="[required]"
          v-model="player.owner"
        ></v-text-field>
        <v-text-field
          label="Original Cost"
          required
          :rules="[required]"
          v-model="player.originalCost"
        ></v-text-field>
        <v-text-field
          label="Waiver Cost"
          v-model="player.waiverCost"
        ></v-text-field>
        <v-flex>
          <v-subheader>Eligible as Keeper?</v-subheader>
          <v-radio-group v-model="player.keeperEligible" column>
            <v-radio label="Yes" value="1"></v-radio>
            <v-radio label="No" value="0"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-text-field
          label="Image URL"
          v-model="player.imageUrl"
        ></v-text-field>
      </panel>
      <v-btn
        dark
        class="orange"
        @click="create">
        Create Player
      </v-btn>
    </v-flex>
    <v-flex xs8 class="ml-2">
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import PlayersService from '@/services/PlayersService'
export default {
  data () {
    return {
      player: {
        name: null,
        owner: 'Free Agent',
        originalCost: 0,
        waiverCost: null,
        keeperEligible: '0',
        imageUrl: null
      },
      required: (value) => !!value || 'Required.'
    }
  },
  components: {
    Panel
  },
  methods: {
    async create () {
      try {
        await PlayersService.create(this.player)
      } catch (err) {
        console.log(err)
      }
      this.navigateTo({name: 'transactions-add'})
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
