module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
  	name: DataTypes.STRING,
  	owner: DataTypes.STRING,
    originalCost: DataTypes.INTEGER,
    waiverCost: DataTypes.INTEGER,
    keeperEligible: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  })

  return Player
}
