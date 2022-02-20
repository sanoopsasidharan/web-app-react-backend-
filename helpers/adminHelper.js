
const db = require('../config/connection');
const collection = require('../config/collections')
var jwt = require('jsonwebtoken')
const objectId = require('mongodb').ObjectId
const key = 'sanoopsasidharan'



module.exports ={
    

    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            var user = await  db.get().collection('user').find({}).toArray();
            console.log(user);
            if(user.length > 0){
                resolve(user)
            }else{
                resolve(null)
            }
        })
    },
    deleteUser: async (req,res)=>{
        console.log(req.body);
        try{
          var deleteUser = await  db.get().collection(collection.userCollection).deleteOne({_id:objectId(req.body)})
          console.log(deleteUser);
          res.json({deleteUser})
        }catch(err){
            console.log(err);
        }
    },
    findUser: async (req,res)=>{
        console.log(req.body.searchData);
        try{
          var finduser = await db.get().collection(collection.userCollection).find({ name: { $regex : req.body.searchData} }).toArray();
          console.log('finding data');
          console.log(finduser);
          if(finduser.length > 0) res.json({finduser})
          else res.json(null)
        }catch(err){
        //   res.json(null)
        }
    },
    adminLogin: async(req,res) =>{
        console.log(req.body);
        console.log('this is admin loggind router');
        try{
            let admin = await db.get().collection(collection.adminCollection).findOne({ $and: [ { name: req.body.name },{ password: req.body.password } ] });
            console.log(admin);
            if (!admin) return res.json(false)
            if(admin){
                const adminTocken = jwt.sign({
                    newUser:admin._id
                  },key)
                res.cookie('adminTocken',adminTocken,{httpOnly:true}).send();
            }
        }catch(err){
            console.log(err);
            res.json(false)
        }
    },
    // admin logout function 
    adminLogout : async (req,res) =>{
        console.log(req.cookies);
        res.cookie('adminTocken','',{
            httpOnly:true,
            expires:new Date(0)
        }).json({message:'adminTocken cookie is clear'});
    },
    // checking admin logged in true or fales
    adminAdminLoggedin : async (req,res) =>{
        try{
            console.log(' admin adminlogged in ');
            console.log(req.cookies);
            const tocken = req.cookies.adminTocken
            console.log(tocken);
            if(!tocken) return res.json(false);
           const verified = await jwt.verify(tocken,key);
           console.log(verified);
            res.send(true)
          }catch(err){
              res.json(false)
          }
    },
    // edit user 
    editUserDetails : (req,res) =>{
        try{
            db.get().collection(collection.userCollection).updateOne({_id:objectId(req.body._id)}, { $set: { name: req.body.name , password: req.body.password  } }).then((res)=>{
                console.log(res);
                res.json(true)
            })
        }catch(err){
            console.log(err);
            res.json(false)
        }
    }
    
}

