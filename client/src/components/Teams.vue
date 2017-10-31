<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Teams">
        <div v-for="team in teams"
          class="team" 
          :key="team.id">

            <v-flex>
              <div class="team-owner">
                {{team.owner}}
              </div>
              <div class="team-name">
                {{team.name}}
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
                View Team
              </v-btn>
            </v-flex>
        </div>
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
  font-size: 30px;
}

.team-name {
  font-size: 24px;
}
</style>
