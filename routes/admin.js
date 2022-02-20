var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var adminHelper = require('../helpers/adminHelper');
const auth = require('../middleware/auth')

router.get('/',(req,res)=>{
    adminHelper.getAllUsers().then((response)=>{
        res.json({response})
    })
})

// delete user
router.post('/deleteUser',adminHelper.deleteUser)

// search user 
router.post('/findUser',adminHelper.findUser)

// admin login 
router.post('/login',adminHelper.adminLogin)

// admin logOut 
router.post('/loggedOut',adminHelper.adminLogout)

// checking admin logged in 
router.get('/adminLoggedin',adminHelper.adminAdminLoggedin)

// edit user details 
router.post('/editUser',adminHelper.editUserDetails)

module.exports = router;
