const {Player} = require('../models')

module.exports = {
  async getAll (req, res) {
  	try {
      const players = await Player.findAll({
        where: {}
      })
      res.send(players)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the players'
      })
    }
  },
  async add (req, res) {
    try {
      const player = await Player.create(req.body)
      res.send(player)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create the player', err
      })
    }
  }
}