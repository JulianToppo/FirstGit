const bodyParser = require('body-parser');
const express=require('express');
const sequelize = require('./util/database');
const signupRoutes= require('./router/signup')
const app=express();
const path= require('path')
const port=3000;

app.use(bodyParser.json({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(signupRoutes);

sequelize.sync().then(result => {
    app.listen(port);
}).catch(err => {
    console.log(err);
})