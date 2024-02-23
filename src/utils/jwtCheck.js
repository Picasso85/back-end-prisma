import { auth } from "express-oauth2-jwt-bearer";

// TODO: Add your own client

const express = require("express");
const app = express();
const { auth } = require("express-oauth2-jwt-bearer");

const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: "https://booking-api",
  issuerBaseURL: "https://dev-shhvbp4uvq37sfw3.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// enforce on all endpoints
app.use(jwtCheck);

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

app.listen(port);

console.log("Running on port ", port);

export default jwtCheck;
