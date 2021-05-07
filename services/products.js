let conn = require('./connection');
let productschema = require('../models/productmodel');
var db;
let msg = require('../constants/messages');
//const { get } = require('../server');
async function connect(){
let res = await conn;
let dbins  =    await res.db('deeva').collection('products');

return dbins;
}
//productCollection = db.collection('product');
//console.log(db.myfunct('products'));
const collection = 'products';
async function addProduct(product){
    try{
        let castedProduct = productschema.cast(product);
        if(!productschema.isValid(product)){
            throw new Error();
        }
        let response = await(await connect()).insertOne(castedProduct); 
        if(response.insertedCount == 1){
            return msg.addsuccess;
        }
        throw new Error(msg.entryfail);
    } catch(err){
        console.log(err);
        throw new Error(msg.entryfail);
       
    }
}
async function getProduct(parameters){
    try{
        let response = await(await connect()).find(parameters); 
        response = await response.toArray();
        return response;
    } catch(err){
        
        throw new Error(msg.entryfail);
       
    }
}
async function searchProduct(queryword,limit = 10){
    try{
        let response = await(await connect()).find({$text:{$search:queryword}}).limit(limit); 
        response = await response.toArray();
        console.log(response);
        return response;
    } catch(err){
        console.log(err.message);
        throw new Error(msg.entryfail);
       
    }

}
module.exports = {addProduct1:addProduct,getprod:getProduct,prodsearch:searchProduct}