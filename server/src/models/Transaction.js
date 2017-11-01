module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
  	type: DataTypes.STRING,
  	player: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    cost: DataTypes.INTEGER
  })

  return Transaction
}
