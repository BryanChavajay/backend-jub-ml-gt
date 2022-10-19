const UserModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//secret es una variable que nos requiere JWT para genera el token
const secret = process.env.SECRET;

const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: "24h",
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "incorrect Email")
    errors.email = "El correo no esta registrado";

  if (err.message === "incorrect password")
    errors.email = "La contraseña es incorrecta";

  if (err.code === 11000) {
    errors.email = "El correo ya ha sido registrado";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.create({ email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      maxAge: 86400000,
      httpOnly: false,
      //secure: true, //esto hace que las peticiones solo puedan venir de https
      //sameSite: lax, //Esto sirve para otros dominios puedan acceder a la cookie
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      maxAge: 86400000,
      httpOnly: false,
      //secure: true, //esto hace que las peticiones solo puedan venir de https
      //sameSite: lax, //Esto sirve para otros dominios puedan acceder a la cookie
    });
    res.status(200).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};
