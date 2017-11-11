module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
  	name: { type: DataTypes.STRING, primaryKey: true },
  	owner: DataTypes.STRING,
    originalCost: DataTypes.INTEGER,
    waiverCost: DataTypes.INTEGER,
    keeperEligible: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  })

  return Player
}
