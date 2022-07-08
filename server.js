const express = require('express');
const logger = require('morgan');
const disks = require('./routes/disks');
const movies = require('./routes/movies');
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const { jwt, verify } = require("jsonwebtoken");
const app = express();
app.set('secretKey', 'nodeRestApi');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

// public route
app.use('/users', users);

// private route
app.use('/disks', validUserAndAdmin, disks);
app.use('/movies', validateUser, movies);

function validateUser(req, res, next) {
  jwt.verify(req.headers['authorization'].substring(7, req.headers['authorization'].lenth), req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
}

async function validUserAndAdmin(req, res, next) {
  let token = req.header("authorization");
  if (!token) return res.status(401).send("No User");

  if (token.startsWith("Bearer ")) {
    token = token.substring(7, token.length);
  }
  try {
    const verified = verify(token, req.app.get('secretKey'));
    console.log(verified)
    req.user = verified;
    let user = await userModel.findOne({ isAdmin });
    if (req.user && user.isAdmin === true) {
      return next();
    }
  } catch (err) {
    console.log(err)
    return res.status(401).send({ msg: "Admin token is not valid" });
  }
}

// handle 404 error
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404)
    res.status(404).json({ message: "Not found" });
  else
    res.status(500).json({ message: "Something looks wrong :( !!!" });
});
app.listen(3000, function () {
  console.log('Node server listening on port 3000');
});

module.exports = app;