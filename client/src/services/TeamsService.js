import Api from '@/services/Api'

export default {
  getAll () {
    return Api().get('teams')
  },
  getTeam (teamOwner) {
    return Api().get(`team/${teamOwner}`)
  }
}
