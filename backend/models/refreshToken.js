module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define("refresh_token", {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   unique: true,
    // },
    value: {
      type: DataTypes.TEXT,
      unique: true,
    },
  });
  return RefreshToken;
};

//create a refresh token with reference on user
// const refreshToken = await RefreshToken.create({
//   token: refreshTokenString,
//   userId: user.id,
// });

//explanation how userId reference works:
//https://sequelize.org/master/manual/assocs.html#one-to-many-associations



