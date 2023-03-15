module.exports = (sequelize, DataTypes) => {
  const User =  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
    },
    serviceProvider: DataTypes.STRING,
    picture: {
      type: DataTypes.STRING,
      unique: true
    },
    email: { 
      type:DataTypes.STRING,
      unique: true
    }
  });

  User.associate = (models) => {
    User.hasMany(models.RefreshToken, {
      foreignKey: "userId",
      as: "refreshTokens",
    });
    User.hasMany(models.BlacklistedToken, {
      foreignKey: "userId",
      as: "blacklistedTokens",
    });
    User.belongsToMany(User, {
      through: "Connections",
      as: "connections",
      foreignKey: "userId",
      otherKey: "connectionId",
    });
  };

  return User;
};