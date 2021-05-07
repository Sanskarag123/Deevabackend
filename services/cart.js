let conn = require('./connection');
let productschema = require('../models/productmodel');
var db;
let msg = require('../constants/messages');
//const { catch } = require('./connection');
//const { query } = require('express');
//const { catch } = require('./connection');
//const { get } = require('../server');
async function connect(){
let res = await conn;
let dbins  =    await res.db('deeva').collection('users');

return dbins;
}
async function addtocart(phonnumber,productid) {
    try{
        console.log(phonnumber);
let response = await(await connect()).findOneAndUpdate({
    phonenumber: phonnumber,
    cart: {
            $elemMatch: {
                productid: productid.productid
            }}},
            {
                $inc: {
                    'cart.$.quantity': productid.quantity
                }
            },
        );

        console.log(response,"yoo");
        if(response.lastErrorObject.n!=1){
            let response1 = await(await connect()).updateOne({phonenumber:phonnumber},{$push:{cart:productid}});
            console.log(response1);
            if(response1.modifiedCount!=1){
                throw new Error("Failed to add to cart");
            }
        }
    } 
    catch(err){
        if(err.message == "The positional operator did not find the match needed from the query."){

        }
        throw new Error(err.message);
    }
    
}

module.exports = {addtoc:addtocart};