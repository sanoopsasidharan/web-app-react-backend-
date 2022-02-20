const MongoClient = require('mongodb').MongoClient;

const state={
    db:null
}

module.exports.connect = function(done){
    const url = "mongodb+srv://sanoop:9846694306@cluster0.honag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    const dbname = 'webApp'
    MongoClient.connect(url,(err,data)=>{
        if(err)return done(err)
        state.db = data.db(dbname)
        done();
    })
}

module.exports.get = function(){
    return state.db
}