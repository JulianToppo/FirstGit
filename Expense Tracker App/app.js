
const express=require('express');
const path=require('path');
const sequelize=require('./util/database')
//express init

const expenseRoute=require('./routes/expense');
const bodyParser = require('body-parser');


var app= express();

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json({ extended: false }));
app.use(expenseRoute);
//sql sync 
sequelize.sync().then(result => {
    // console.log(result);
     app.listen(3000);
  }).catch(err => {
     console.log(err);
 })
