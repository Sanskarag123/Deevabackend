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
router.get('/getaddress',async (req,res)=>{
     try{
          console.log(req.headers);
          let number  = await verifytok(req.headers.authorization);
          //console.log(body)
          let response = await authenticate.getU(number);
          res.status(200).send(response.addresses);
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
router.get('/getinterest',async (req,res)=>{
     let profuct =  {
            "_id": "60a6510153d894001539bf5a",
            "comment_count": 0,
            "comment": "yes",
            "brandid": 1,
            "wardrobeid": "1",
            "discountprice": 0,
            "categoryid": 1,
            "clothmaterial": "Cotton",
            "quantityLeft": 0,
            "width": 0,
            "length": 0,
            "price": 5000,
            "name": "savni",
            "productId": "_zgzcini7a",
            "imageurls": [
                "https://i.pinimg.com/236x/73/24/ee/7324eeadcdbfd67c99a395a97f47e370.jpg"
            ],
            "maincolor": [
                "yellow",
                "purple"
            ]
        };
     try{
          console.log(req.headers);
          let number  = await verifytok(req.headers.authorization);
          //console.log(body)
         
          let data = [profuct];
          res.status(200).send({message:"Sucessfull",status:200,data:data});
     } catch(err){
          
          res.status(400).send({message:err.message});
     }
});
router.get('/getnewproduct',async (req,res)=>{
     let profuct =   [
        {
            "_id": "60ba68df856a8d55a878050a",
            "costprice": 750,
            "specials": "true",
            "trending": "true",
            "wardrobeid": "WA_epr0xgwux",
            "maincolor": [
                "green",
                "navy blue"
            ],
            "comment_count": 0,
            "comment": [
                {
                    "username": "Ankush",
                    "description": "Vergy good quality"
                }
            ],
            "brandid": 1,
            "discountprice": 0,
            "categoryid": 1,
            "clothmaterial": "Cotton",
            "quantityLeft": 0,
            "width": 0,
            "length": 0,
            "price": 1125,
            "type": "MOONGA SILK - Patola rich",
            "name": "green and navy blue moonga silk saree with jacquard border",
            "productId": "_y7kyg6qmg1",
            "description": "Green and navyblue moonga silk saree with navy blue and gold silk blouse. \nBlouse Colour: navy blue. \nPatola rich. Embellished with woven zari work. \nSaree with Sweetheart Neckline, Half Sleeve. The blended silk based green color saree is crafted with self resham work and golden zari made motifs all over the body. The navy blue color pallu have golden zari with resham made designer work. \nWork Type Woven Best Design All Over Finish Type Soft \\ Comfortable To Wear\nEye Catching Colors Occasion Party, Festive, Wedding Wear Best Gift For Your Loved Ones",
            "Link": "https://drive.google.com/folderview?id=19Q6i_i_gChZjRGGEy1NibM5Do9vZ7Xlj",
            "imageurls": [
                "https://lh3.googleusercontent.com/d/1OwOwoC82eWkD_qynY2Ruq3fn7rWvizsb",
                "https://lh3.googleusercontent.com/d/13JfKvrDuPTcOhwlPSZUNcLWSCS-7qvUk",
                "https://lh3.googleusercontent.com/d/1HSSZPNT-I75ZBic_hoqkRRrTbfn3Xadb",
                "https://lh3.googleusercontent.com/d/19FlBdXREJoHIWoSeOgH7NojwQkb6VxeT",
                "https://lh3.googleusercontent.com/d/1SjNfbe-ir25mh2p1__eNmoKNspmU9i6Y",
                "https://lh3.googleusercontent.com/d/1F81Z3cx5Vw3x6FcmBNWfAkgBODdYf4Gj",
                "https://lh3.googleusercontent.com/d/13VTJoyi6QqeEEIjZviQ7pGeE-ooGYlsf"
            ]
        },
        {
            "_id": "60ba68ef856a8d55a878050b",
            "costprice": 750,
            "wardrobeid": "WA_epr0xgwux",
            "trending": "true",
            "maincolor": [
                "light blue",
                "navy blue"
            ],
            "comment_count": 0,
            "comment": [
                {
                    "username": "Ankush",
                    "description": "Vergy good quality"
                }
            ],
            "brandid": 1,
            "discountprice": 0,
            "categoryid": 1,
            "clothmaterial": "Cotton",
            "quantityLeft": 0,
            "width": 0,
            "length": 0,
            "price": 1125,
            "type": "MOONGA SILK - Patola rich",
            "name": "light blue and navy blue moonga silk saree with jacquard border",
            "productId": "_y7kyg6qmg2",
            "description": "Light blue and navy blue moonga silk saree with navy blue and gold silk blouse. \nBlouse Colour: navy blue. \nPatola rich. Embellished with woven zari work. \nSaree with Sweetheart Neckline, Half Sleeve. The blended silk based blue color saree is crafted with self resham work and golden zari made motifs all over the body. The navy blue color pallu have golden zari with resham made designer work. \nWork Type Woven Best Design All Over Finish Type Soft \\ Comfortable To Wear\nEye Catching Colors Occasion Party, Festive, Wedding Wear Best Gift For Your Loved Ones",
            "Link": "https://drive.google.com/folderview?id=19Sx2qXkCxXKzuLOSATOxr9862bR2K9pL",
            "imageurls": [
                "https://lh3.googleusercontent.com/d/1Sv3EUAxFo6VOFaP_gx68O48vdwK66xc3",
                "https://lh3.googleusercontent.com/d/1yG73eyGLtsaVR48iI9f_p25XmEUaZrd4",
                "https://lh3.googleusercontent.com/d/1TSMfExhE0RnVSUGdlP3SYtWjqEjqDHCO",
                "https://lh3.googleusercontent.com/d/1B5HqFp8zd-WftKoIpVrB9S-oH7o0t09m",
                "https://lh3.googleusercontent.com/d/1wvlftlY6B2MzoYVhK6PupKuD4U8I3xbw",
                "https://lh3.googleusercontent.com/d/1SBCR9p6n6t2P-kAhFbvcpTaWUGIZHv8_"
            ]
        },
        {
            "_id": "60ba6920856a8d55a878050e",
            "costprice": 750,
            "trending": "true",
            "wardrobeid": "WA_epr0xgwux",
            "maincolor": [
                "orange",
                "black"
            ],
            "comment_count": 0,
            "comment": [
                {
                    "username": "Ankush",
                    "description": "Vergy good quality"
                }
            ],
            "brandid": 1,
            "discountprice": 0,
            "categoryid": 1,
            "clothmaterial": "Cotton",
            "quantityLeft": 0,
            "width": 0,
            "length": 0,
            "price": 1125,
            "type": "MOONGA SILK - Patola rich",
            "name": "orange and black moonga silk saree with jacquard border",
            "productId": "_y7kyg6qmg5",
            "description": "Orange and black moonga silk saree with black and gold silk blouse. \nBlouse Colour: black. \nPatola rich. Embellished with woven zari work. \nSaree with Sweetheart Neckline, Half Sleeve. The blended silk based orange color saree is crafted with self resham work and golden zari made motifs all over the body. The black color pallu have golden zari with resham made designer work. \nWork Type Woven Best Design All Over Finish Type Soft \\ Comfortable To Wear\nEye Catching Colors Occasion Party, Festive, Wedding Wear Best Gift For Your Loved Ones",
            "Link": "https://drive.google.com/folderview?id=19jwh0BV0lpb7dv544stgtK0uFHFCohXg",
            "imageurls": [
                "https://lh3.googleusercontent.com/d/1AKQSCW7TF8XI8eycwl0K0VReBHTpTreD",
                "https://lh3.googleusercontent.com/d/1rkZsm9ISOtwc0eJoK1Z_K4TKcECLN2Ye",
                "https://lh3.googleusercontent.com/d/1sErOABBoR7feYWe7Ki5kXhnf52xudMwu",
                "https://lh3.googleusercontent.com/d/12eceiKq9qG7VJrl7jLud1iMeGZgVe7_v",
                "https://lh3.googleusercontent.com/d/1hCApnRnbvpUyvRfTBhnARGRRwa6P8N_1",
                "https://lh3.googleusercontent.com/d/1b3DYNZRiwl84344ftQYw518cY3vrZtEU"
            ]
        },
        {
            "_id": "60ba6a59856a8d55a878050f",
            "costprice": 750,
            "wardrobeid": "WA_epr0xgwux",
            "maincolor": [],
            "comment_count": 0,
            "trending": "true",
            "comment": [
                {
                    "username": "Ankush",
                    "description": "Vergy good quality"
                }
            ],
            "brandid": 1,
            "discountprice": 0,
            "categoryid": "2",
            "clothmaterial": "Cotton",
            "quantityLeft": 0,
            "width": 0,
            "length": 0,
            "price": 1125,
            "type": "MOONGA SILK - Patola rich",
            "name": "green and navy blue moonga silk saree with jacquard border",
            "productId": "_y7kyg6qmg6",
            "description": "Green and navyblue moonga silk saree with navy blue and gold silk blouse. \nBlouse Colour: navy blue. \nPatola rich. Embellished with woven zari work. \nSaree with Sweetheart Neckline, Half Sleeve. The blended silk based green color saree is crafted with self resham work and golden zari made motifs all over the body. The navy blue color pallu have golden zari with resham made designer work. \nWork Type Woven Best Design All Over Finish Type Soft \\ Comfortable To Wear\nEye Catching Colors Occasion Party, Festive, Wedding Wear Best Gift For Your Loved Ones",
            "Link": "https://drive.google.com/folderview?id=19Q6i_i_gChZjRGGEy1NibM5Do9vZ7Xlj",
            "imageurls": [
                "https://lh3.googleusercontent.com/d/1OwOwoC82eWkD_qynY2Ruq3fn7rWvizsb",
                "https://lh3.googleusercontent.com/d/13JfKvrDuPTcOhwlPSZUNcLWSCS-7qvUk",
                "https://lh3.googleusercontent.com/d/1HSSZPNT-I75ZBic_hoqkRRrTbfn3Xadb",
                "https://lh3.googleusercontent.com/d/19FlBdXREJoHIWoSeOgH7NojwQkb6VxeT",
                "https://lh3.googleusercontent.com/d/1SjNfbe-ir25mh2p1__eNmoKNspmU9i6Y",
                "https://lh3.googleusercontent.com/d/1F81Z3cx5Vw3x6FcmBNWfAkgBODdYf4Gj",
                "https://lh3.googleusercontent.com/d/13VTJoyi6QqeEEIjZviQ7pGeE-ooGYlsf"
            ]
        },
        {
            "_id": "60ba6a79856a8d55a8780511",
            "costprice": 750,
            "wardrobeid": "WA_epr0xgwux",
            "maincolor": [],
            "comment_count": 0,
            "trending": "true",
            "comment": [
                {
                    "username": "Ankush",
                    "description": "Vergy good quality"
                }
            ],
            "brandid": 1,
            "discountprice": 0,
            "categoryid": "2",
            "clothmaterial": "Cotton",
            "quantityLeft": 0,
            "width": 0,
            "length": 0,
            "price": 1125,
            "type": "MOONGA SILK - Patola rich",
            "name": "red and navy blue moonga silk saree with jacquard border",
            "productId": "_y7kyg6qmg",
            "description": "Red and navy blue moonga silk saree with navy blue and gold silk blouse. \nBlouse Colour: navy blue. \nPatola rich. Embellished with woven zari work. \nSaree with Sweetheart Neckline, Half Sleeve. The blended silk based red color saree is crafted with self resham work and golden zari made motifs all over the body. The navy blue color pallu have golden zari with resham made designer work. \nWork Type Woven Best Design All Over Finish Type Soft \\ Comfortable To Wear\nEye Catching Colors Occasion Party, Festive, Wedding Wear Best Gift For Your Loved Ones",
            "Link": "https://drive.google.com/folderview?id=19XfFk-YEIZMZ7uqJ4e-of-id_thaxp-v",
            "imageurls": [
                "https://lh3.googleusercontent.com/d/1tAAYfLxZHh73vH-EW3a263L0FOAsYKD4",
                "https://lh3.googleusercontent.com/d/1MXsboegOcNLLgrqCorkB0Z-SPFrIzpLL",
                "https://lh3.googleusercontent.com/d/1jhIvc23dHCvYVBz6j6EXyPmavsrJMdfm",
                "https://lh3.googleusercontent.com/d/1aidfesGe2bvUIKXcaIUx81hkktNu9pWx",
                "https://lh3.googleusercontent.com/d/1MqQoaGxAGvMI8TGnR5wpHr3pKpamp0b1",
                "https://lh3.googleusercontent.com/d/1FszOiO22n2eRrmNHNYF9lyX2zz49Xkoz"
            ]
        },
        {
            "_id": "60ba6a90856a8d55a8780513",
            "costprice": 750,
            "specials": "true",
            "trending": "true",
            "wardrobeid": "WA_epr0xgwux",
            "maincolor": [],
            "comment_count": 0,
            "comment": [
                {
                    "username": "Ankush",
                    "description": "Vergy good quality"
                }
            ],
            "brandid": 1,
            "discountprice": 0,
            "categoryid": "2",
            "clothmaterial": "Cotton",
            "quantityLeft": 0,
            "width": 0,
            "length": 0,
            "price": 1125,
            "type": "MOONGA SILK - Patola rich",
            "name": "orange and black moonga silk saree with jacquard border",
            "productId": "_y7kyg6qmg9",
            "description": "Orange and black moonga silk saree with black and gold silk blouse. \nBlouse Colour: black. \nPatola rich. Embellished with woven zari work. \nSaree with Sweetheart Neckline, Half Sleeve. The blended silk based orange color saree is crafted with self resham work and golden zari made motifs all over the body. The black color pallu have golden zari with resham made designer work. \nWork Type Woven Best Design All Over Finish Type Soft \\ Comfortable To Wear\nEye Catching Colors Occasion Party, Festive, Wedding Wear Best Gift For Your Loved Ones",
            "Link": "https://drive.google.com/folderview?id=19jwh0BV0lpb7dv544stgtK0uFHFCohXg",
            "imageurls": [
                "https://lh3.googleusercontent.com/d/1AKQSCW7TF8XI8eycwl0K0VReBHTpTreD",
                "https://lh3.googleusercontent.com/d/1rkZsm9ISOtwc0eJoK1Z_K4TKcECLN2Ye",
                "https://lh3.googleusercontent.com/d/1sErOABBoR7feYWe7Ki5kXhnf52xudMwu",
                "https://lh3.googleusercontent.com/d/12eceiKq9qG7VJrl7jLud1iMeGZgVe7_v",
                "https://lh3.googleusercontent.com/d/1hCApnRnbvpUyvRfTBhnARGRRwa6P8N_1",
                "https://lh3.googleusercontent.com/d/1b3DYNZRiwl84344ftQYw518cY3vrZtEU"
            ]
        }
    ];
     try{
          console.log(req.headers);
          let number  = await verifytok(req.headers.authorization);
          //console.log(body)
         
          let data = profuct;
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