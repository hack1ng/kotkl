import Api from '@/services/Api'

export default {
  getAll () {
    return Api().get('transactions')
  },
  create (transaction) {
    return Api().post('createTransaction', transaction)
  },
  getAllTransactionsForTeam (teamOwner) {
    return Api().get(`transactions/${teamOwner}`)
  }
}
