const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb+srv://san:1234@cluster0.nmxs5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";;

var _db =  MongoClient.connect( url,  { useNewUrlParser: true,useUnifiedTopology:true }) ;



module.exports =  _db;