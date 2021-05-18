let conn = require("./connection");
let productschema = require("../models/productmodel");

var db;
let msg = require("../constants/messages");
const categorychema = require("../models/categoryschema");
const brandchema = require("../models/brandmodel");
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
    if (tag == "greaterthan") {
      parameters = { price: { $gt: parameters.price } };
    }
    if (tag == "lessthan") {
      parameters = { price: { $lt: parameters.price } };
    }
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
module.exports = {
  addProduct1: addProduct,
  getprod: getProduct,
  prodsearch: searchProduct,
  addcat: addCategory,
  getcat: getcategory,
  addbrd: addBrand,
  getbrd:getbrand
};
