let conn = require("./connection");
let productschema = require("../models/productmodel");

var db;
let msg = require("../constants/messages");
const categorychema = require("../models/categoryschema");
const brandchema = require("../models/brandmodel");
const storychema = require("../models/storymodel");
//const { get } = require('../server');
async function connect() {
  let res = await conn;
  let dbins = await res.db("deeva").collection("products");

  return dbins;
}
async function connect1() {
  let res = await conn;
  let dbins = await res.db("deeva").collection("category");

  return dbins;
}
async function connect2brand() {
  let res = await conn;
  let dbins = await res.db("deeva").collection("brand");

  return dbins;
}
async function connect2story() {
  let res = await conn;
  let dbins = await res.db("deeva").collection("story");

  return dbins;
}
//productCollection = db.collection('product');
//console.log(db.myfunct('products'));
const collection = "products";
async function addProduct(product) {
  try {
    let castedProduct = productschema.cast(product);
    if (!productschema.isValid(product)) {
      throw new Error();
    }
    let response = await (await connect()).insertOne(castedProduct);
    if (response.insertedCount == 1) {
      return msg.addsuccess;
    }
    throw new Error(msg.entryfail);
  } catch (err) {
    console.log(err);
    throw new Error(msg.entryfail);
  }
}
async function addCategory(product) {
  try {
    let castedProduct = categorychema.cast(product);
    if (!categorychema.isValid(product)) {
      throw new Error();
    }
    let response = await (await connect1()).insertOne(castedProduct);
    if (response.insertedCount == 1) {
      return msg.addsuccess;
    }
    throw new Error(msg.entryfail);
  } catch (err) {
    console.log(err);
    throw new Error(msg.entryfail);
  }
}
async function addStory(product) {
  try {
    let castedProduct = storychema.cast(product);
    if (!storychema.isValid(product)) {
      throw new Error();
    }
    let response = await (await connect2story()).insertOne(castedProduct);
    if (response.insertedCount == 1) {
      return msg.addsuccess;
    }
    throw new Error(msg.entryfail);
  } catch (err) {
    console.log(err);
    throw new Error(msg.entryfail);
  }
}
async function addBrand(product) {
  try {
    let castedProduct = brandchema.cast(product);
    if (!brandchema.isValid(product)) {
      throw new Error();
    }
    let response = await (await connect2brand()).insertOne(castedProduct);
    if (response.insertedCount == 1) {
      return msg.addsuccess;
    }
    throw new Error(msg.entryfail);
  } catch (err) {
    console.log(err);
    throw new Error(msg.entryfail);
  }
}
async function getProduct(parameters, tag) {
  try {
    if (parameters.price) {
      parameters.price = parseInt(parameters.price);
    }
    if (parameters.price1) {
      parameters.price1 = parseInt(parameters.price1);
    }
    if (parameters.price2) {
      parameters.price2 = parseInt(parameters.price2);
    }
    if (tag == "greaterthan") {
      parameters = { price: { $gt: parameters.price } };
    }
    if (tag == "lessthan") {
      parameters = { price: { $lt: parameters.price } };
    }
    if (tag == "between") {
      parameters = { price: { $lt: parameters.price2,$gt:parameters.price1 } };
    }
    if(!!parameters.categoryid){
      parameters.categoryid = parseInt(parameters.categoryid);
    }
    console.log(parameters);
    let response = await (await connect()).find(parameters);
    response = await response.toArray();
    return response;
  } catch (err) {
    throw new Error(msg.entryfail);
  }
}
async function getcategory(parameters = {}) {
  try {
    let response = await (await connect1()).find(parameters);
    response = await response.toArray();
    return response;
  } catch (err) {
    throw new Error(msg.entryfail);
  }
}
async function getstory(parameters = {}) {
  try {
    let response = await (await connect2story()).find(parameters);
    response = await response.toArray();
    return response;
  } catch (err) {
    throw new Error(msg.entryfail);
  }
}
async function getbrand(parameters = {}) {
    try {
      let response = await (await connect2brand()).find(parameters);
      response = await response.toArray();
      return response;
    } catch (err) {
      throw new Error(msg.entryfail);
    }
  }
async function searchProduct(queryword, limit = 10) {
  try {
    let response = await (await connect())
      .find({ $text: { $search: queryword } })
      .limit(limit);
    response = await response.toArray();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err.message);
    throw new Error(msg.entryfail);
  }
}
async function addcomment(phonnumber,details) {
  try{
      console.log(phonnumber);
      let details1 = {...details};
      delete details1.productId;
let response = await(await connect()).updateOne({
      productId:details.productId},
          {
             $push:{comment:{...details1}}
          },
      );
      console.log(response,"yoo");
         // let response1 = await(await connect()).updateOne({phonenumber:phonnumber},{$push:{cart:productid}});
        //  console.log(response1);
          if(response.modifiedCount!=1){
              throw new Error("Failed to add to Comment");
          }
      
  } 
  catch(err){
      if(err.message == "The positional operator did not find the match needed from the query."){

      }
      throw new Error(err.message);
  }
  
}

module.exports = {
  addProduct1: addProduct,
  getprod: getProduct,
  prodsearch: searchProduct,
  addcat: addCategory,
  getcat: getcategory,
  addbrd: addBrand,
  getbrd:getbrand,
  getstr:getstory,
  addstr:addStory,
  addcomm:addcomment
};
