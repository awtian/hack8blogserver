const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

module.exports = (req, res, next) => {
  jwt.verify(req.headers.auth, process.env.SECRET_KEY, (err, decoded) => {
    if (decoded) {
      userModel.findOne({email: decoded.email})
      .then(data => {
        if(data.admin === true) {
          next()
        } else {
          res.send({msg: 'admin only'})
        }
      })
      next()
    }  else {
      res.send({message: 'kami tidak mengenali token anda! :( mungkin anda belum login? hhe'})
    }
  })
}