const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles')
const images = require('../helper/images')
const authdecode = require('../helper/authdecode')
const authadmin = require('../helper/authadmin')
const setSlug = require('../helper/setSlug.js')

router.get('/', articlesController.getAll)
router.get('/:slug', articlesController.findOneBySlug)
router.post('/',
          authdecode,
          images.multer.single('image'),
          images.sendUploadToGCS,
          setSlug,
          articlesController.create
        )
router.delete('/:id', authadmin, articlesController.delete) 
router.put('/:id', authadmin, articlesController.update) 

module.exports = router;
