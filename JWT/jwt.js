const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcryptjs = require("bcryptjs");

const express = require("express");
const app = express();
app.use(express.json());

data = [
  {
    username: "Narendra",
  },
  {
    username: "Tiger babu",
  },
  {
    username: "Puli",
  },
];

const port = process.env.port || 4000;

app.get("/posts", authenticateToken, (req, res) => {
  res.json(data.filter((data) => data.username === req.user.name));
});

app.post("/login", (req, res) => {
  // Authenticate User
  const username = req.body.username;
  const user = { name: username };
  const accessToken = generateAccessToken(user)
  res.json({ accessToken: accessToken });
});



function generateAccessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '15s' })
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authoriation"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}



app.listen(port, () => {
  console.log(`Running on port : ${port}`);
});
