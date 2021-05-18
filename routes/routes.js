//Routes File 
const authenticate = require('../services/authenticator');
var express = require('express');
var router = express.Router();
const product = require('../services/products');
const cart = require('../services/cart');
const msg = require('../constants/messages');

const { verifytok } = require('../services/authenticator');
//const { catch } = require('../services/connection');
//const { catch } = require('../services/connection');

router.get('/', function(req, res, next) {
     //Do whatever...
})
router.post('/createaccount',async (req,res)=>{
     let userDetail = req.body;
     try{
         let response =  await authenticate.creatacc(userDetail);
         res.status(200).json(response);
     } catch(err){
          res.status(401).send({message:err.message});
     }
});
router.post('/login',async (req,res)=>{
     let userDetail = req.body;
     console.log("yo")
     try{
         let response =  await authenticate.log(userDetail);
         res.status(200).json(response);
     } catch(err){
          res.status(401).send({message:err.message});
     }
});
router.get('/getuserdetail',async (req,res)=>{
     try{
          console.log(req.headers);
          let number  = await verifytok(req.headers.authorization);
          //console.log(body)
          let response = await authenticate.getU(number);
          res.status(200).send(response);
     } catch(err){
          res.status(400).send({message:err.message});
     }
});
/*************************************************************************
 * 
 * Product Apis
 * 
 * *************************************************************************/
router.post('/addProduct',async (req,res)=>{
     let body = req.body;
     try{
          let response = await product.addProduct1(body);
          res.status(200).send(response);
     } catch(err){
          res.status(400).send(msg.entryfail);
     }
});
router.get('/getproduct',async (req,res)=>{
     try{
          let response = await product.getprod(req.query,"");
          res.status(200).send(response);
     } catch(err){
          res.status(400).send(msg.invalidsearch);
     }
});
router.get('/getproduct/:type',async (req,res)=>{
     try{
          console.log(req.params.type);
          let response = await product.getprod(req.query,req.params.type);
          res.status(200).send(response);
     } catch(err){
          res.status(400).send(msg.invalidsearch);
     }
});
router.get('/searchprod',async (req,res)=>{
     try{
          let response = await product.prodsearch(req.query.search);
          res.status(200).send(response);
     } catch(err){
          res.status(400).send(msg.invalidsearch);
     }
});
//console.log(authenticate.token);
/**********************************************************
 * 
 * Cart Apis
 * 
 ***********************************************************/
 router.post('/addtocart',async (req,res)=>{
     let body = req.body;
      try{
           console.log(req.headers);
          let number  = await verifytok(req.headers.authorization);
          console.log(body)
          await cart.addtoc(number,body.product);
          res.status(200).send({message:"Added to cart"});
     } catch(err){
          console.log(err.message);
          res.status(501).send({message:err.message});
     }
});
/**********************************************************
 * 
 * Category
 * 
 ***********************************************************/
 router.get('/getcategory',async (req,res)=>{
     try{
          let response = await product.getcat();
          res.status(200).send({message:"Sucessfull",status:true,data:response});
     } catch(err){
          res.status(400).send(msg.invalidsearch);
     }
});
router.post('/addcategory',async (req,res)=>{
     let body = req.body;
     try{
          let response = await product.addcat(body);
          res.status(200).send(response);
     } catch(err){
          res.status(400).send(msg.entryfail);
     }
});
let url = "https://i.pinimg.com/236x/73/24/ee/7324eeadcdbfd67c99a395a97f47e370.jpg";
router.get('/getbanner',async (req,res)=>{
     try{
          let response = [{type:"Top Banner",id :"5463",image_url:url},{type:"Advertising Banner",id :"54634",image_url:url},{type:"Refer And Earn Banner",id :"54635",image_url:url},{type:"Donate Banner",id :"54639",image_url:url}];
          res.status(200).send({message:"Sucessfull",status:true,data:response});
     } catch(err){
          res.status(400).send(msg.invalidsearch);
     }
});

/**********************************************************
 * 
 * Brand
 * 
 ***********************************************************/
 router.post('/addbrand',async (req,res)=>{
     let body = req.body;
     try{
          let response = await product.addbrd(body);
          res.status(200).send(response);
     } catch(err){
          res.status(400).send(msg.entryfail);
     }
});
router.get('/getbrand',async (req,res)=>{
     try{
          let response = await product.getbrd();
          res.status(200).send({message:"Sucessfull",status:true,data:response});
     } catch(err){
          res.status(400).send(msg.invalidsearch);
     }
});

module.exports = router;