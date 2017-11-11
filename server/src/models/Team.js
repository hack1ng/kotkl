module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    owner: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true
    },
    name: DataTypes.STRING
  })

  return Team
}
