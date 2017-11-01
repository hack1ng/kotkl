import Api from '@/services/Api'

export default {
  getAll () {
    return Api().get('transactions')
  },
  add (transaction) {
    return Api().post('transactions')
  },
  getAllTransactionsForTeam (teamOwner) {
    return Api().get(`transactions/${teamOwner}`)
  }
}
