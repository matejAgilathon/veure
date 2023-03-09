const { BlacklistedToken } = require("../models");
const { Op } = require("sequelize");

const clearAccessTokensBlacklist = async () => {
  try {
    const interval = new Date();
    interval.setSeconds(interval.getSeconds() - 30);
    await BlacklistedToken.destroy({
      where: {
        createdAt: {
          [Op.lt]: interval,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { clearAccessTokensBlacklist };