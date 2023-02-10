const express=require('express');
const router=express.Router();
const path=require('path')

const rootDir=require('../util/path')

router.get('/add-product',(req,res,next) =>{
    console.log("In the middleware product admin");
   // res.send('<html><body><form action="/admin/add-product" method="POST"><input type="text" name="title"><input type="number" name="size"><button type="submit">Add Product</button></form></body></html>');
    res.sendFile(path.join(rootDir,'views','add-product.html'));
})

router.post("/add-product",(req,res,next)=>{

    console.log(req.body);
    res.redirect("/shop");
})

module.exports=router