const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users')
const authdecode = require('../helper/authdecode')

/* GET or CREATE User*/
router.get('/', usersController.findAll);
router.post('/', usersController.findOrCreate);
router.get('/a', authdecode, usersController.checkAdmin);

module.exports = router;
