const axios = require("axios");
const { encode } = require("../utils/jwt");
const { insertUser } = require("../utils/insertUser");

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
    await insertUser(body);
    // create token with the body variable above
    // const ourOwnToken = jwt.sign(body, process.env.SESSION_SECRET, { expiresIn: "10s" });
    const ourOwnToken = encode(body, "10s");
    res.cookie("token", ourOwnToken);
    res.cookie("username", body.username);
    res.cookie("picture", body.picture);
    res.redirect("http://localhost:8080/#/dashboard");
  } catch (err) {
    return res.status(500).json({
      success: false,
      err,
    });
  }
};

module.exports = { authThroughGoogle };