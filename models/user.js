const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const FB = require('fb');
const jwt = require('jsonwebtoken');



const userSchema = mongoose.Schema({
  name: String,
  email: String,
  admin: Boolean
})

userSchema.statics.findOneOrCreate = function (token, cb) {
  
  const self = this

  FB.setAccessToken(token);


  FB.api('/me', { fields: 'name, email' })
    .then(data => {

      let userdata = {name: data.name, email: data.email}

      self.findOne( userdata )

        .then(result => {
          if (result) { 
            jwt.sign({_id: result._id, name: result.name, email: result.email}, process.env.SECRET_KEY, (err, tok) => {
              cb(tok, {"logged in": result})
            })
          }
          else {
            self.create({...userdata, admin:false})
              .then(cresult => {
                console.log(cresult)
                jwt.sign({_id: cresult._id, name: cresult.name, email: cresult.email}, process.env.SECRET_KEY, (err, tok) => {
                  cb(tok, {"new user": cresult})
                })
              })
          }
        })

        .catch(err => cb({msg: 'error on find one / creating', err}))
        
    
    .catch(err => cb({msg: 'error on API', err}))

  })
    

}

userSchema.statics.checkAdmin = function (token, cb) {
  
  const self = this

  FB.setAccessToken(token);


  FB.api('/me', { fields: 'name, email' })
    .then(data => {

      let userdata = {name: data.name, email: data.email}

      self.findOne( userdata )

        .then(result => {
          console.log(result)
          if(result.admin === true) {
            cb(true)
          } else{
            cb(false)
          }
        })

        .catch(err => cb({msg: 'error on find', err}))
        
    
    .catch(err => cb({msg: 'error on API', err}))

  })
    

}





module.exports = mongoose.model('User', userSchema)