require("dotenv").config();
const axios = require("axios")
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
//joining postgres sequlize
const { Sequelize } = require('sequelize');
const { User } = require("./models");
const db = require("./models");

const sequelize = new Sequelize("postgres://example_user:example_password@127.0.0.1:5432/example_db");

  //code above rewriten with async await
  const testConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  testConnection();

//insert new user into database
const insertUser = async userData => {
  try {
    const { username, email, picture, serviceProvider } = userData;
    const user = await db.user.create({
      username,
      email,
      picture,
      serviceProvider,
    });
    console.log("user created successfully: ", user);
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
};

const app = express();

app.use(express.json());
app.use(cors());

/**
 * An array containing dummy data for testing purposes.
 *
 * @type {Array<{ name: string, email: string }>}
 *
 * @description
 * This array can only contain objects that have a `name` property of type string
 * and an `email` property of type string. Any other objects or types will not be
 * accepted and will result in a runtime error.
 */
const dummyDatabase = []

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
    await insertUser(body); // store data to database - here you can add your logic for either signing up or signing in a user. I am assuming I have a model called User, I am using Sequelize's create method to insert the user data into this model...
    // if (!dummyDatabase.some(user => user.email === body.email)) dummyDatabase.push(body)
    // create token with the body variable above
    const ourOwnToken = jwt.sign(body, process.env.SESSION_SECRET, {
      expiresIn: "10s",
    }
    );
    res.cookie("token", ourOwnToken);
    res.cookie("username", body.username)
    res.cookie("picture", body.picture)
    res.redirect("http://localhost:8080/#/dashboard");

  } catch (err) {
    return res.status(500).json({
      success: false,
      err
    });
  }
};

app.get("/api/sessions/oauth/google", authThroughGoogle);

app.get("/testToken", verifyToken, (req, res) => {
  res.json({ success: true });
});

//route to log all the users in the db
app.get("/api/users", async (req, res) => {
  try {
    const users = await db.user.findAll();
    res.json(users)
    console.log(users);
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
});

db.sequelize.sync().then((req) => {
  app.listen(8000, () => {
    console.log("Server started on port 8000");
  } );
});



function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    // The token is valid, save the decoded token for use in other routes
    req.decoded = decoded;
    next();
  });
}
