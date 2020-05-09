const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");

function generateToken(params = {}) {
  //token expira em 1 dia
  return jwt.sign(params, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });
}

exports.register = async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "User already exists" });

    const user = await User.create(req.body);
    //elimina a password do result
    user.password = undefined;

    //Passo o token para que ele faca a autenticacao
    return res.send({
      user,
      token: generateToken({ id: user.id }),
      expiresIn: authConfig.expiresIn,
    });
  } catch (error) {
    return res.status(400).send({ error: "Registration failed" });
  }
};

exports.authenticate = async (req, res) => {
  const { email, password } = req.body;

  //como a password está com a flag select ativa, para buscar esse input devemos fazer com o select
  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(400).json({ error: "User not found" });

  if (!await bcrypt.compare(password, user.password))
    return res.status(400).json({ error: "Invalid password" });

  user.password = undefined;
  res.statusCode = 200;
  res.send({
    user,
    token: generateToken({ id: user.id }),
    expiresIn: authConfig.expiresIn,
  });
};
