//Routes File 
const authenticate = require('../services/authenticator');
var express = require('express');
var router = express.Router();
const product = require('../services/products');
const cart = require('../services/cart');
const msg = require('../constants/messages');
const pytmchksum = require('../services/payment')

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
          res.status(200).send({message:"Sucessfull",status:true,data:response});
     } catch(err){
          res.status(400).send(err.message);
     }
});
router.get('/getproduct/:type',async (req,res)=>{
     try{
          console.log(req.params.type);
          let response = await product.getprod(req.query,req.params.type);
          res.status(200).send({message:"Sucessfull",status:true,data:response});
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
router.get('/getcart',async (req,res)=>{
     try{
          console.log(req.headers);
          let number  = await verifytok(req.headers.authorization);
          //console.log(body)
          let response = await authenticate.getcart(number);
          data = response.cart;
          res.status(200).send({message:"Sucessfull",status:200,data:data});
     } catch(err){
          res.status(400).send({message:err.message});
     }
});
router.get('/clearcart',async (req,res)=>{
     try{
          console.log(req.headers);
          let number  = await verifytok(req.headers.authorization);
          //console.log(body)
          let response = await cart.clearcartt(number);
          
          res.status(200).send({message:"Sucessfull",status:200});
     } catch(err){
          res.status(400).send({message:err.message});
     }
});
router.get('/getwardrobe',async (req,res)=>{
     try{
       
          //console.log(body)
          let response = [{wardrobeid:"1",wardrobename:'newWarderobe',image:"https://cdn1.ninecolours.com/image/cache/products-2018/August-2019/Chiffon-Designer-Saree-In-Olive-Green-Colour-SR0062923-A-1200x1799.jpg"}];
          data = response.cart;
          res.status(200).send({message:"Sucessfull",status:200,data:response});
     } catch(err){
          res.status(400).send({message:err.message});
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
/**********************************************************
 * 
 * Story
 * 
 ***********************************************************/
 router.post('/addstory',async (req,res)=>{
     let body = req.body;
     try{
          let response = await product.addstr(body);
          res.status(200).send(response);
     } catch(err){
          res.status(400).send(msg.entryfail);
     }
});
router.get('/getstory',async (req,res)=>{
     try{
          let response = await product.getstr();
          res.status(200).send({message:"Sucessfull",status:true,data:response});
     } catch(err){
          res.status(400).send(msg.invalidsearch);
     }
});
router.get('/getspecials',async (req,res)=>{
     try{
          let response = {message:"Sucessfull", status:200,data:[{category_id:1,category_name:'Chandei'},{category_id:2,category_name:'Salvon'}]};
          res.status(200).send({message:"Sucessfull",status:true,data:response});
     } catch(err){
          res.status(400).send(msg.invalidsearch);
     }
});
router.get('/getforyou',async (req,res)=>{
     try{
          console.log(req.headers);
          let number  = await verifytok(req.headers.authorization);
          //console.log(body)
         
          let data = ['_zgzcini7a'];
          res.status(200).send({message:"Sucessfull",status:200,data:data});
     } catch(err){
          
          res.status(400).send({message:err.message});
     }
});
/**********************************************************
 * 
 *Order Hosttory
 * 
 ***********************************************************/
 router.post('/addorderhistory',async (req,res)=>{
     try{
          console.log(req.headers);
          let number  = await verifytok(req.headers.authorization);
          //console.log(body)
         cart.addtohist(number,'fdhsjd',req.body);
          res.status(200).send({message:"Sucessfull",status:200});
     } catch(err){
          res.status(400).send({message:err.message});
     }
});
router.get('/getorderhistory',async (req,res)=>{
     try{
          console.log(req.headers);
          let number  = await verifytok(req.headers.authorization);
          //console.log(body)
          let response = await cart.gethist(number);
          data = response;
          res.status(200).send({message:"Sucessfull",status:200,data:data});
     } catch(err){
          res.status(400).send({message:err.message});
     }
});
router.get('/getchksum',async (req,res)=>{
   let result =   await pytmchksum();
   console.log(result);
});
router.post('/addcomment',async (req,res)=>{
     try{
          console.log(req.headers);
          let number  = await verifytok(req.headers.authorization);
          //console.log(body)
          let response = await product.addcomm(number,req.body);
          data = response;
          res.status(200).send({message:"Sucessfull",status:200,data:data});
     } catch(err){
          res.status(400).send({message:err.message});
     }
});
router.post('/addaddress',async (req,res)=>{
     try{
          console.log(req.headers);
          let number  = await verifytok(req.headers.authorization);
          //console.log(body)
          let response = await cart.address(number,req.body);
          data = response;
          res.status(200).send({message:"Sucessfull",status:200,data:data});
     } catch(err){
          res.status(400).send({message:err.message});
     }
});

module.exports = router;