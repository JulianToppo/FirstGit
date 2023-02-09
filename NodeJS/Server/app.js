const express=require('express');

const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.urlencoded());

app.use('/add-product',(req,res,next) =>{
    console.log("In the middleware");
    res.send('<html><body><form action="/product" method="POST"><input type="text" name="title"><input type="text" name="size"><button type="submit">Add Product</button></form></body></html>');
})

app.use("/product",(req,res,next)=>{

    console.log(req.body);
    res.redirect("/");
})
//Sequence of the middleware function is strictly req,res and next
app.use('/',(req,res,next) =>{
    console.log('In another middleware');
    res.send('<h1>Hello From Express!</h1>');
});

app.listen(3000);