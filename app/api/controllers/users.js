const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
   create: function (req, res, next) {
      userModel.findOne({ email: req.body.email }, function (err, userInfo) {
         if (!userInfo) {
            userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password, role: req.body.role }, function (err, result) { //create new users, this function has model query too create new user into database
               if (err)
                  next(err);
               else
                  res.json(req.body);
            });
         } else {
            res.sendStatus(400);
         }
      });
   },
   authenticate: function (req, res, next) {
      /*search for user in database by email id and compare plain password 
      passed through login form with database hashed password*/

      userModel.findOne({ email: req.body.email }, function (err, userInfo) {
         if (err) {
            next(err);
         } else {
            if (bcrypt.compareSync(req.body.password, userInfo.password)) {
               const token = jwt.sign({ id: userInfo._id, role: userInfo.role }, req.app.get('secretKey'), { expiresIn: '1h' });
               res.json({token : token});
            } else {
               res.sendStatus(400);
            }
         }
      });
   },
}