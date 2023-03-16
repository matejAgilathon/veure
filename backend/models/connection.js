module.exports = (sequelize, DataTypes) => {
  const Connection = sequelize.define("Connection", {
    //id is combination of userId and connectionId
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    connectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
      allowNull: false,
    },
  }
  );

  Connection.associate = (models) => {
    Connection.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });
    Connection.belongsTo(models.User, {
      foreignKey: "connectionId",
      as: "connection",
      onDelete: "CASCADE",
    });
  };


// module.exports = (sequelize, DataTypes) => {
//   const Connection = sequelize.define("Connection", {
//     value: {
//       type: DataTypes.TEXT,
//       unique: true,
//     },
//   });

//   Connection.associate = (models) => {
//     Connection.belongsTo(models.User, {
//       foreignKey: "userId",
//       as: "user",
//       onDelete: "CASCADE",
//     });
//   };

  return Connection;
};
