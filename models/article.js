const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = Schema({
  featuredimg: String,
  title: {
    type: String, 
    required: [true, 'Title must be filled']
  },
  content: {
    type: String,
    required: [true, 'Content cannot be left empty'] 
  },
  slug: {
    type: String,
    required: [true, 'slug is required']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'anonymous post is not supported']
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Article', articleSchema)