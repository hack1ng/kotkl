module.exports = {
  port: process.env.PORT || 8081,
  db: {
  	database: process.env.DB_NAME || 'kotkl',
  	user: process.env.DB_USER || 'kotkl',
  	password: process.env.DB_PASS || 'kotkl',
  	options: {
  		dialect: process.env.DIALECT || 'sqlite',
  		host: process.env.HOST || 'localhost',
  		storage: './kotkl.sqlite'
  	}
  }
}
