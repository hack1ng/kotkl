const {Player} = require('../models')

module.exports = {
  async getAll (req, res) {
  	try {
      const players = await Player.findAll({
        where: {},
        order: [['name', 'ASC']]
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
  },
  async edit (req, res) {
    try {
      const player = await Player.update(req.body, {
        where: {
          name: req.params.playerName
        }
      })
      res.send(player)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to edit the player', err
      })
    }
  },
  async getPlayerByName (req, res) {
    try {
      const playerName = req.params.playerName
      const player = await Player.findOne({
        where: {
          name: playerName
        }
      })
      res.send(player)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to find a player with that name', err
      })
    }
  },
  async getAllPlayersFromTeam (req, res) {
    try {
      const teamOwner = req.params.teamOwner
      const players = await Player.findAll({
        where: {
          owner: teamOwner
        },
        order: [['name', 'ASC']]
      })
      res.send(players)
    } catch (err) {
      res.status(500).send({
        error: 'No players were found from that team', err
      })
    }
  },
  async getActivePlayers (req, res) {
    try {
      const players = await Player.findAll({
        where: {
          $not: {
            owner: 'Free Agent'
          }
        },
        order: [['name', 'ASC']]
      })
      res.send(players)
    } catch (err) {
      res.status(500).send({
        error: 'No players were found from that team', err
      })
    }
  },
  async getFreeAgentPlayers (req, res) {
    try {
      const players = await Player.findAll({
        where: {
          owner: 'Free Agent'
        },
        order: [['name', 'ASC']]
      })
      res.send(players)
    } catch (err) {
      res.status(500).send({
        error: 'No players were found from that team', err
      })
    }
  }
}