
const path=require('path');
const rootDir=require('../util/path')

exports.getAddProduct =(req,res,next) =>{
      console.log("In the middleware product admin");
     // res.send('<html><body><form action="/admin/add-product" method="POST"><input type="text" name="title"><input type="number" name="size"><button type="submit">Add Product</button></form></body></html>');
      res.sendFile(path.join(rootDir,'views','add-product.html'));
  };


  exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
  }
  
  exports.getProducts = (req, res, next) => {

      // console.log('In shop middleware');
    // res.send('<h1>Hello From Express!</h1>');
    res.sendFile(path.join(rootDir,'views','shop.html'));
  }

  exports.contactUs=(req,res,next) =>{
    console.log("In the middleware product admin");
   // res.send('<html><body><form action="/admin/add-product" method="POST"><input type="text" name="title"><input type="number" name="size"><button type="submit">Add Product</button></form></body></html>');
    res.sendFile(path.join(rootDir,'views','contactus.html'));
};

exports.successPage= (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','success.html'));
}
