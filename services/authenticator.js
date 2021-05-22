const jwt = require("jsonwebtoken");
//const { catch } = require('./connection');
let conn = require("./connection");
let usermodel = require("../models/userModel");
const bcrypt = require("bcrypt");
//const { object } = require("yup/lib/locale");
//const { catch } = require("./connection");
//const { catch } = require("./connection");
const saltRounds = 10;
async function connect() {
  let res = await conn;
  let dbins = await res.db("deeva").collection("users");

  return dbins;
}
//Generat Token
function generateToken(number) {
  try {
    payload = { number: "" + number };
    console.log(number);
    key = "deevbakend";
    let token = jwt.sign(payload, key);
    return { token: token };
  } catch {
    throw new Error("Error Generating Token");
  }
}
async function verifyToken(token){
try{
    console.log(token);
    let token2;
    try{
    token2 = token.split(" ")[1];
    } catch{
        throw new Error(JSON.stringify({message:'Invalid Token',code:401}));
    }
   
    const tokencorrect = jwt.verify(token2,"deevbakend");
    
    console.log(tokencorrect,"yes")
    try{
        //let  token_decode = jwt.decode(token,{complete: true});
        console.log(tokencorrect.number.slice(1,tokencorrect.length))
        return parseInt(tokencorrect.number);
    } catch{
        throw new Error(JSON.stringify({message:'Invalid Token',code:401}));
    }
} catch(err){
    throw new Error(err.message);
}
}
async function createaccount(userdetail) {
  try {
    userdetail = usermodel.cast(userdetail);
    let response = await (await connect()).find({
      phonenumber: userdetail.phonenumber,
    });
    response = await response.toArray();
    console.log(response.length);
    if (response.length > 0) {
      throw new Error("phone number already exists");
      
    }

    userdetail.password = await bcrypt.hash(userdetail.password, saltRounds);

    response = await (await connect()).insertOne(userdetail);
    //console.log(response);
    if (response.insertedCount != 1) {
      throw new Error( "Data add unsuccessfull");
    }
    return generateToken(userdetail.phonenumber);
  } catch (err) {
   // console.log(JSON.parse(err.message));
    throw new Error(err.message);
  }
}
async function login(logindetail) {
  let userdata;
  try {
     let response = await (await connect()).findOne({
      phonenumber: parseInt(logindetail.phonenumber),
    });
    userdata = response;
    // response = await response;
    console.log(response);
    if (Object.keys(response).length === 0) {
      throw new Error(
        JSON.stringify({
          message: "Phone Number or password is wrong",
          code: 403,
        })
      );
    }
    const match = await bcrypt.compare(logindetail.password, response.password);
    if (match) {
      delete userdata.password
      return {...userdata,...generateToken(parseInt(logindetail.phonenumber))};
    } else {
      throw new Error(  
         "Email or Password is wrong"
      );
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
async function getUser(phonenumber) { 
    try{
      console.log(phonenumber);
      let response = await(await connect()).findOne({phonenumber:phonenumber},{referralCode:1,phonenumber:1,name:1,cart:1});
      
      if(Object.keys(response).length==0){
        throw new Error('No record found for this user')
      } else {
        console.log(response);
        return response;
      }
    } catch(err){
      throw new Error(err.message);
    }
 }
 async function getCart(phonenumber) { 
  try{
    console.log(phonenumber);
    let response = await(await connect()).findOne({phonenumber:phonenumber},{cart:1});
    
    if(Object.keys(response).length==0){
      throw new Error('No record found for this user')
    } else {
      console.log(response);
      return response;
    }
  } catch(err){
    throw new Error(err.message);
  }
}
module.exports = { creatacc: createaccount, log: login ,verifytok:verifyToken,getU:getUser,getcart:getCart};
