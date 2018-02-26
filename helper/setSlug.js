const Article = require('../models/article');
 
module.exports = function setSlug(req, res, next) {
  var slug = req.body.title.replace(/[^\w\s]/gi, '').trim().replace(/\s+/g, '-').toLowerCase();
  var counter = 2;
  var length = slug.length

  Article.findOne({ slug: slug }, checkSlug);
  // recursive function for checking repetitively
  function checkSlug(err, existingBlog) {
    if(existingBlog) { 
      if(slug.length > length) slug = slug.slice(0,slug.length-2)
      slug = slug+'-'+counter;
      counter++
      Article.findOne({ slug: slug }, checkSlug); // check again with the new slug
    } else { // else the slug is set
      req.body.slug = slug;
      next();
    }
  };
}