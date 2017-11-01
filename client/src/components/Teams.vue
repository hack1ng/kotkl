<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Teams">
        <v-list two-line v-for="team in teams"
          class="team" 
          :key="team.id">
          <v-list-tile
            ripple
            >
            <v-list-tile-content>
              <v-list-tile-title class="team-owner">{{team.owner}}</v-list-tile-title>
              <v-list-tile-sub-title class="grey--text text--darken-4 team-name">{{team.name}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                dark
                class="orange"
                @click="navigateTo({
                  name: 'team',
                  params: {
                    teamOwner: team.owner
                  }
                })">
                View Team
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import TeamsService from '@/services/TeamsService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data () {
    return {
      teams: null
    }
  },
  async mounted () {
    // do a request to the backend for all the songs
    this.teams = (await TeamsService.getAll()).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.team {
  padding: 20px;
  overflow: hidden;
}

.team-owner {
  font-size: 24px;
}

.team-name {
  font-size: 18px;
}
</style>
