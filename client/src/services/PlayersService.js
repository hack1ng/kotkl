import Api from '@/services/Api'

export default {
  getAll () {
    return Api().get('players')
  },
  create (player) {
    return Api().post('players', player)
  }
}
