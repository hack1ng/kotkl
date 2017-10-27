<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Teams">
        <div v-for="team in teams" 
          :key="team.id">
          {{team.owner}} -
          {{team.name}}
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
