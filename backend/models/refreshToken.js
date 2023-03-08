module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define("RefreshToken", {
    value: {
      type: DataTypes.TEXT,
      unique: true,
    },
  });

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE"
    });
  };

  return RefreshToken;
};



