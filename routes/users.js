var express = require('express');
var router = express.Router();
var userHelpers = require('../helpers/userHelper')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({sanoop:'sanoop',age:'39',place:'kunnamkulam'})
});

// add register the user  
router.post('/addUser/',userHelpers.addUser);

// login user 
router.post('/loginUser/',userHelpers.loginUser)

// logout user 
router.get('/logout',userHelpers.logOutUser)

// loggedIn 
router.get('/loggedIn',userHelpers.loggedInUser)


router.get('/allUsers',(req,res)=>{
  
})

module.exports = router;
