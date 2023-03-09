const axios = require("axios");
const { encode, isTokenValid } = require("../utils/jwt");
const { insertUser } = require("../utils/insertUser");
const { User } = require("../models");

const authThroughGoogle = async (req, res) => {
  try {
    const { code } = req.query; // code from service provider which is appended to the frontend's URL
    const url = "https://oauth2.googleapis.com/token"; // link to api to exchange code for token.
    const { data } = await axios({
      url,
      method: "POST",
      params: {
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
        code,
        grant_type: "authorization_code", // this tells the service provider to return a code which will be used to get a token for making requests to the service provider
      },
    });
    const { id_token, access_token } = data;
    const userData = await axios({
      // urlForGettingUserInfo,
      url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    });
    const body = {
      username: userData.data.name,
      email: userData.data.email,
      picture: userData.data.picture,
      serviceProvider: "google",
    };
    //check if user exists  in database, if not add user to database
    if(!body.username || !body.email || !body.picture) {
      return res.status(500).json({
        success: false,
        err: "missing data from google",
      });
    }
    const user = await User.findOne({
      where: {
        email: body.email,
      },
    });
    if (user) {
      //use refresh token from the database to create a new token
      const refreshTokenData = await user.getRefreshTokens()
      let refreshTokenValue = refreshTokenData.length && refreshTokenData[0].dataValues.value;
      console.log("refreshTokenValue", refreshTokenValue)
      if(!refreshTokenValue) {
        generatedToken = await user.createRefreshToken({ value: encode(body, "5d") });
        refreshTokenValue = generatedToken.dataValues.value;
      }
      const isValid = isTokenValid(
        refreshTokenValue,
        process.env.SESSION_SECRET
      );
      if(!isValid) {
        return res.status(500).json({
          success: false,
          err: "refresh token is not valid",
        });
      }
      const ourOwnToken = encode(body, "30s");
      res.cookie("token", ourOwnToken);
      res.cookie("username", user.dataValues.username);
      res.cookie("picture", user.dataValues.picture);
      res.redirect("http://localhost:8080/#/dashboard");
      return;
    } else {
      const insertedUser = await insertUser(body);
      const refreshTokenString = encode(body, "5d");
      insertedUser.createRefreshToken({ value: refreshTokenString });
      // console.log("refreshTokenInserted", refreshTokenInserted)
      const ourOwnToken = encode(body, "30s");
      //insert token into database
      res.cookie("token", ourOwnToken);
      res.cookie("username", insertedUser.dataValues.username);
      res.cookie("picture", insertedUser.dataValues.picture);
      res.redirect("http://localhost:8080/#/dashboard");
      return;
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      err,
    });
  }
};

module.exports = { authThroughGoogle };