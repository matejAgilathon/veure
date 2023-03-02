const axios = require("axios");
const { encode, isTokenValid } = require("../utils/jwt");
const { insertUser } = require("../utils/insertUser");
const { insertToken } = require("../utils/insertToken");
const db = require("../models");

const authThroughGoogle = async (req, res) => {
  try {
    const { code } = req.query; // code from service provider which is appended to the frontend's URL
    const client_id = process.env.GOOGLE_OAUTH_CLIENT_ID;
    const client_secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
    const redirect_uri = process.env.GOOGLE_OAUTH_REDIRECT_URI;
    // The client_id and client_secret should always be private, put them in the .env file
    const grant_type = "authorization_code"; // this tells the service provider to return a code which will be used to get a token for making requests to the service provider
    const url = "https://oauth2.googleapis.com/token"; // link to api to exchange code for token.
    const { data } = await axios({
      url,
      method: "POST",
      params: {
        client_id,
        client_secret,
        redirect_uri,
        code,
        grant_type,
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
    const userExists = await db.user.findOne({
      where: {
        email: body.email,
      },
    });
    if (userExists) {
      const user = await db.user.findByPk(userExists.dataValues.id);
      //use refresh token from the database to create a new token
      const refreshToken = await db.refresh_token.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });

      const isValid = isTokenValid(refreshToken.dataValues.value, process.env.SESSION_SECRET);

      if(!isValid) {
        return res.status(500).json({
          success: false,
          err: "missing refresh token",
        });
      }
      const ourOwnToken = encode(body, "30s");
      res.cookie("token", ourOwnToken);
      res.cookie("username", user.dataValues.username);
      res.cookie("picture", user.dataValues.picture);
      res.redirect("http://localhost:8080/#/dashboard");
      return;


      // console.log("refreshToken", refreshToken)



      // const ourOwnToken = encode(body, "30s");

      // res.cookie("token", ourOwnToken);
      // res.cookie("username", user.dataValues.username);
      // res.cookie("picture", user.dataValues.picture);
      // res.redirect("http://localhost:8080/#/dashboard");
      // return;
    } else {
      const insertedUser = await insertUser(body);
      const refreshTokenString = encode(body, "5d");
      //insert token into database
      const user = await db.user.findByPk(insertedUser.dataValues.id);
      // const refreshToken = await db.refresh_token.create({
      //   value: refreshTokenString,
      //   userId: user.dataValues.id,
      // });
      // console.log("refreshToken", refreshToken)
      const refreshTokenInserted = await insertToken(user.dataValues.id, refreshTokenString);
      console.log("refreshTokenInserted", refreshTokenInserted)
      const ourOwnToken = encode(body, "30s");
      //insert token into database
      res.cookie("token", ourOwnToken);
      res.cookie("username", user.dataValues.username);
      res.cookie("picture", user.dataValues.picture);
      res.redirect("http://localhost:8080/#/dashboard");
      return;
    }


    // const insertedUser = await insertUser(body);

    // console.log(insertedUser.dataValues.id);
    // const refreshTokenString = encode(body, "5d");

    // //insert token into database
    // const user = await db.user.findByPk(insertedUser.dataValues.id);
    // // const refreshToken = await RefreshToken.create({
    // //   token: refreshTokenString,
    // //   userId: user.id,
    // // });
    // // console.log("refreshToken", refreshToken)
    // const refreshTokenInserted = await insertToken(user.id,refreshTokenString);
    // console.log("refreshTokenInserted", refreshTokenInserted)
    

    // const ourOwnToken = encode(body, "10s");
    // //insert token into database
    // res.cookie("token", ourOwnToken);
    // res.cookie("username", body.username);
    // res.cookie("picture", body.picture);
    // res.redirect("http://localhost:8080/#/dashboard");
  } catch (err) {
    return res.status(500).json({
      success: false,
      err,
    });
  }
};

module.exports = { authThroughGoogle };