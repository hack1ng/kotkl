const {Team} = require('../models')

module.exports = {
  async getAll (req, res) {
  	try {
      const teams = await Team.findAll({
        where: {}
      })
      res.send(teams)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the teams'
      })
    }
  },
  async add (req, res) {
    try {
      const team = await Team.create(req.body)
      res.send(team)
    } catch (err) {
      res.status(400).send({
        error: 'An owner with that name already exists'
      })
    }
  }
}
