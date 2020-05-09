const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "No Authorization" });

  //divide o token para verificar sem tem o bearer
  const parts = authHeader.split(" ");

  if (!parts.length === 2)
    return res.status(402).send({ error: "Token error" });

  const [scheme, token] = parts;

  if (!/Bearer$/.test(scheme))
    return res.status(401).send({ error: "Token malformatted" });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token invalid" });

    req.userId = decoded.id;

    return next();
  });
};
