const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//secret es una variable que nos requiere JWT para genera el token
const secret = process.env.SECRET;

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) res.json({ status: true, user: user.email });
        else res.json({ status: false });
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};
