

const express= require('express');
const expenseRoutes= require('./routes/expenseRoutes');
const path=require('path');
const bodyParser=require('body-parser')
const sequelize=require('./util/database')
const app=express();


app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json({ extended: false }));

app.use('/',expenseRoutes);
//sql sync 
sequelize.sync().then(result => {
    // console.log(result);
     app.listen(3000);
  }).catch(err => {
     console.log(err);
 })



