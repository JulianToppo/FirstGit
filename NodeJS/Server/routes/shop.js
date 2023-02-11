const express=require('express')

const router=express.Router();

const productController=require('../controller/products')


// router.get('/',(req,res,next) =>{
//     // console.log('In shop middleware');
//     // res.send('<h1>Hello From Express!</h1>');
//     res.sendFile(path.join(rootDir,'views','shop.html'));
// });

router.get('/', productController.getProducts);
  


module.exports=router;