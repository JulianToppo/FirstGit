const express=require('express');
const router=express.Router();
const path=require('path')
const productController=require('../controller/products')

// router.get('/add-product',(req,res,next) =>{
//     console.log("In the middleware product admin");
//    // res.send('<html><body><form action="/admin/add-product" method="POST"><input type="text" name="title"><input type="number" name="size"><button type="submit">Add Product</button></form></body></html>');
//     res.sendFile(path.join(rootDir,'views','add-product.html'));
// })

// router.post("/add-product",(req,res,next)=>{

//     console.log(req.body);
//     res.redirect("/shop");
// })

// /admin/add-product => GET
router.get('/add-product', productController.getAddProduct);
  
  // /admin/add-product => POST
router.post('/add-product', productController.postAddProduct);

router.get('/contactus',productController.contactUs);

router.post("/success",productController.successPage);

module.exports=router
