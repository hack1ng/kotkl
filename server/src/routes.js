const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const TeamsController = require('./controllers/TeamsController')
const PlayersController = require('./controllers/PlayersController')
const TransactionsController = require('./controllers/TransactionsController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.get('/songs',
    SongsController.getAllSongs)

  app.post('/songs',
    SongsController.post)

  app.get('/teams',
    TeamsController.getAll)

  app.get('/team/:teamOwner',
    TeamsController.getTeam)

  app.post('/teams',
    TeamsController.add)

  app.get('/players',
    PlayersController.getAll)

  app.post('/players',
    PlayersController.add)

  app.get('/players/:teamOwner',
    PlayersController.getAllPlayersFromTeam)

  app.get('/transactions',
    TransactionsController.getAll)

  app.post('/transactions',
    TransactionsController.add)

  app.get('/transactions/:teamOwner',
    TransactionsController.getAllTransactionsForTeam)
}
