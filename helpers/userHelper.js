const db = require('../config/connection');
var jwt = require('jsonwebtoken')
const collection = require('../config/collections')
const key = 'sanoop'



module.exports ={
    addUser: async (req,res)=>{
        try{
             var response = await db.get().collection(collection.userCollection).insertOne(req.body)
                  console.log(response);
                  const tocken = jwt.sign({
                    newUser:res._id
                  },key)
                console.log(tocken);
                
                if(response){
                    res.cookie('tocken',tocken,{httpOnly:true}).send();
                }

                // if(response) res.json({tocken:'sanoop'})
                // else res.json(null)
        }catch(err){
          console.log(err);
          res.json(null)
        }
    },
    loginUser: async (req,res) =>{
         try{
            var user = await db.get().collection(collection.userCollection).findOne({ $and: [ { name: req.body.name },{ password: req.body.password } ] } )
              if(user){
                const tocken = jwt.sign({
                    newUser:user._id
                  },key)
                res.cookie('tocken',tocken,{httpOnly:true}).send();
            }else{
                console.log('user not valid');
                res.json(false);
            }
         }catch(err){
             console.log('error is prending');
             console.log(err);
             res.json(false);
         }
    },
    logOutUser: async (req,res) =>{
        console.log(req.body);
        res.cookie('tocken','',{
            httpOnly:true,
            expires:new Date(0)
        }).json({message:'cookie is clear'});
    },
    loggedInUser: async (req,res) =>{
      try{
        // didnt get the tocken that is the error 
        console.log('logged in ');
        console.log(req.cookies);
        const tocken = req.cookies.tocken
        console.log(tocken);
        if(!tocken) return res.json(false);
       const verified = await jwt.verify(tocken,key);
       console.log(verified);
        res.send(true)
      }catch(err){
          res.json(false)
      }
    }
}