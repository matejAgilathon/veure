module.exports = (sequelize, DataTypes) => {
  const BlacklistedToken = sequelize.define("BlacklistedToken", {
    value: {
      type: DataTypes.TEXT,
      unique: true,
    },
  });

  BlacklistedToken.associate = (models) => {
    BlacklistedToken.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });
  };

  return BlacklistedToken;
};
