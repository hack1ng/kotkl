import Api from '@/services/Api'

export default {
  getAll () {
    return Api().get('players')
  },
  create (player) {
    return Api().post('createPlayer', player)
  },
  getPlayerByName (playerName) {
    return Api().get(`player/${playerName}`)
  },
  getAllPlayersFromTeam (teamOwner) {
    return Api().get(`players/${teamOwner}`)
  },
  getActivePlayers () {
    return Api().get('activePlayers')
  },
  getFreeAgentPlayers () {
    return Api().get('freeAgentPlayers')
  },
  edit (player) {
    return Api().put(`editPlayer/${player.name}`, player)
  }
}
