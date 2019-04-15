var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var todoOperations=require('../controllers/todoOperations') 

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// todo operations

router.delete('/deletetodo',todoOperations.deletetodo)
router.post('/addtodo',todoOperations.addtodo);
 router.get('/getusertodos',todoOperations.getUsertodos)

module.exports = router;