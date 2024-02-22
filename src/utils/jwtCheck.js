import { auth } from "express-oauth2-jwt-bearer";

// TODO: Add your own client

const jwtCheck = auth({
  audience: "https://booking-api",
  issuerBaseURL: "https://dev-ja55wjcl2iwpgu13.eu.auth0.com/",
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
