const express=require('express');

const bodyParser=require('body-parser');

const app=express();

const adminRoute=require('./routes/admin')
const shopRoute=require('./routes/shop')
const path=require('path');
app.use(bodyParser.urlencoded({extended:false}));

app.use('/admin',adminRoute);
app.use('/shop',shopRoute);

console.log(path.join(__dirname,"NodeJS","Server","public"));
app.use(express.static(path.join(__dirname,"NodeJS","Server","public")));
//Status when page doesn't finds it's route
app.use((req,res,next)=>{
   // res.status(404).send('<h1>Page not found</h1>');
   res.sendFile(path.join(__dirname,"views","404.html"));
});
app.listen(3000);