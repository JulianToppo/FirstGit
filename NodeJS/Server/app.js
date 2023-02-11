const express=require('express');

const bodyParser=require('body-parser');

const app=express();

const adminRoute=require('./routes/admin')
const shopRoute=require('./routes/shop')
const path=require('path');

const errorController=require('../Server/controller/error')

app.use(bodyParser.urlencoded({extended:false}));

app.use('/admin',adminRoute);
app.use(shopRoute);


app.use(express.static(path.join(__dirname,"..","..","NodeJS","Server","public")));
//Status when page doesn't finds it's route
app.use(errorController.error404);
app.listen(3000);