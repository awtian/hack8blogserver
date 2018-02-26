const articleModel = require('../models/article');

class articleController {
  static getAll(req,res) {
    articleModel.find({}).sort({createdAt: 'desc'}).limit(10)
      .populate('author', 'name')
      .then(resp => {
        let object = {
          msg: "This is all the articles",
          details: resp
        }
        res.send(object)
      })
      .catch(console.error)
  }

  static findOneBySlug(req, res) {
    articleModel.findOne({slug: req.params.slug})
      .populate('author', 'name')
      .then(resp => res.send(resp))
      .catch(console.error)
  }

  static create(req,res) {
    let fileurl = req.file ? req.file.cloudStoragePublicUrl : 'http://images.wizawt.com/1519122596262bakugo.jpg';
    articleModel.create({
      featuredimg: fileurl,
      title: req.body.title,
      content: req.body.content,
      slug: req.body.slug,
      author: req.headers.userid
    })
      .then(newarticle => res.send({msg: "Artikel anda telah berhasil ditambahkan", details: newarticle}))
      .catch(err => {
        console.log('oh no ', err)
        res.send(500, err)
      })
  }

  static delete (req,res) {
    articleModel.deleteOne({_id: req.params.id})
      .then(data => res.send({msg: 'delete success'}))
      .catch(console.error)
  } 

  static update (req,res) {
    articleModel.findOneAndUpdate({_id: req.params.id}, 
      {$set: {
        featuredimg: req.body.image,
        title: req.body.title,
        content: req.body.content
      }
    })
    .then(data => res.send(data))
    .catch(console.error)
  }
}

module.exports = articleController;
