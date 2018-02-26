const userModel = require('../models/user');

class UserController {

  static findAll (req,res) {
    userModel.find({})
     .then(data => res.send(data))
  }

  static findOrCreate (req,res) {
    userModel.findOneOrCreate( req.headers.fbtoken, (jwt, user) => {
      res.send({auth: jwt, user: user})
    })
  }

  static checkAdmin (req,res) {
    userModel.findOne({email: req.headers.email})
      .then(data => {
        res.send({admin: data.admin})
      })
  }

}

module.exports = UserController;