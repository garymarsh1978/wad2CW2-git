const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");


exports.login = function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  userModel.lookup(username, function (err, user) {
    if (err) {
      console.log("error looking up user", err);
      return res.status(401).send();
    }
    if (!user) {
      console.log("user ", username, " not found");
      return res.render("user/register");
    }
    //compare provided password with stored password
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        //use the payload to store information about the user such as username.
        let payload = { username: username, role: user.role };
        //create the access token
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: 300,
        });
        res.cookie("jwt", accessToken);

        if 
          (payload.role == "admin") {
          return res.render("admin", {
            title: "Admin dashboard",
            user: "user",
            username: username,
          });
        }
        if (payload.role == "pantryUser") {
          return res.render("pantry", {
            title: "Pantry Dashboard",
            user: "user",
            username: username,
          });
        }
        if (payload.role == "normalUser") {
          return res.render("home", {
            title: "Welcome User",
            user: "user",
            username: username,
          });
        }
        next();
      } else {
        return res.render("user/login"); //res.status(403).send();
      }
    });
  });
};

exports.verify = function (req, res, next) {
  let accessToken = req.cookies.jwt;
  let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const username = payload.username;
  if (!accessToken) {
    return res.status(403).send();
  }
  try {
    req.username = username;
    next();
  } catch (e) {
    //if an error occured return request unauthorized error
    res.status(401).send();
  }
};

exports.verifyAdmin = function (req, res, next) {
  let accessToken = req.cookies.jwt;
  let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const username = payload.username;
  if (payload.role != "admin") {
    return res.status(403).send();
  }
  try {
    req.username = username;
    next();
  } catch (e) {
    //if an error occured return request unauthorized error
    res.status(401).send();
  }
};
exports.verifyPantry = function (req, res, next) {
  let accessToken = req.cookies.jwt;
  let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const username = payload.username;
  if (payload.role != "pantryUser") {
    return res.status(403).send();
  }
  try {
    req.username = username;
    next();
  } catch (e) {
    //if an error occured return request unauthorized error
    res.status(401).send();
  }
};
exports.verifyAdminPantry = function (req, res, next) {
  let accessToken = req.cookies.jwt;
  let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const username = payload.username;
  if (payload.role == "normalUser") {
    return res.status(403).send();
  }
  try {
    req.username = username;
    next();
  } catch (e) {
    //if an error occured return request unauthorized error
    res.status(401).send();
  }
};