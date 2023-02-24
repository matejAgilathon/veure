const axios = require("axios")
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(express.json());

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
    // const urlForGettingUserInfo =
    //   "https://www.googleapis.com/oauth2/v2/userinfo";
    const userData = await axios({
      // urlForGettingUserInfo,
      url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    });
    console.log({ username: userData.data.name, email: userData.data.email });
    const body = {
      username: userData.data.name,
      email: userData.data.email,
      serviceProvider: "google",
    };
    // await User.create(body); // store data to database - here you can add your logic for either signing up or signing in a user. I am assuming I have a model called User, I am using Sequelize's create method to insert the user data into this model...
    const ourOwnToken = jwt.sign(body, process.env.SESSION_SECRET);
    console.log("ourOwnToken", ourOwnToken);
    // create token with the body variable above
    return res.status(200).json({
      success: true,
      token: ourOwnToken,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err
    });
  }
};

app.get("/api/sessions/oauth/google", authThroughGoogle);

app.listen(8000, () => {
  console.log("Server started on port 8000");
} );



