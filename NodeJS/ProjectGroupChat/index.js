

const express=require('express');
const bodyParser=require('body-parser');
const loginRoutes=require('./routes/login');
const app=express();

app.use(bodyParser.urlencoded({extended:false}));

app.use('/',loginRoutes);

app.listen(3000);


