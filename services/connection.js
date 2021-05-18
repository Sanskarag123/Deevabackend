const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://localhost:27017/deeva";

var _db =  MongoClient.connect( url,  { useNewUrlParser: true,useUnifiedTopology:true }) ;



module.exports =  _db;