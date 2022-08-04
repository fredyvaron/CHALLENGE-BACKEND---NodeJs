
const jwt = require("jsonwebtoken");
// middleware to validate token
const authenticateJWT = (req, res, next) => {
    console.log(req.headers, "token")
  const token =  req.headers["x-access-token"]
  if (!token) {
      return res.status(403).send("Se requiere un token de autenticación.")
  }

  try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
  } catch (error) {
      return res.status(401).send(error)
  }
  return next();
};
module.exports = authenticateJWT;