const {Transaction} = require('../models')
const {Player} = require('../models')
Transaction.belongsTo(Player, { foreignKey: 'player' })

module.exports = {
  async getAll (req, res) {
  	try {
      const transactions = await Transaction.findAll({
        where: {},
        order: [['id', 'DESC']],
        include: [
            Player
        ]
      })
      res.send(transactions)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the transactions'
      })
    }
  },
  async add (req, res) {
    try {
      const transaction = await Transaction.create(req.body)
      res.send(transaction)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create the transaction'
      })
    }
  },
  async getAllTransactionsForTeam(req, res) {
    try {
      const teamOwner = req.params.teamOwner
      const transactions = await Transaction.findAll({
        where: {
          $or : {
            from: teamOwner,
            to: teamOwner
          }
        },
        order: [['id', 'DESC']],
        include: [
            Player
        ]
      })
      res.send(transactions)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to load transactions for this team'
      })
    }
  }
}
