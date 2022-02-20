const jwt = require('jsonwebtoken');
const key = 'sanoop'
function auth(req,res,next){
    try{
      console.log('this is middleware');
      console.log(req.cookies);
      let tocken = req.cookies.tocken
      if(!tocken) return res.status(401).json({errorMessage:'UnOtherazied'})
      const verified = jwt.verify(tocken,key)
      req.user = verified.newUser
      next();
    }catch(err){
        console.log(err);
        res.status(401).json({errorMessage:'UnOtherazied'})
    }
}

module.exports = auth;