

const express= require('express');
const loginSignUpRoutes= require('./routes/loginsignup');
const expenseRoutes= require('./routes/expense');
const path=require('path');
const bodyParser=require('body-parser')
const sequelize=require('./util/database')
const app=express();


app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json({ extended: false }));

app.use('/',loginSignUpRoutes);
app.use('/expense',expenseRoutes);
//sql sync 
sequelize.sync().then(result => {
    // console.log(result);
     app.listen(3000);
  }).catch(err => {
     console.log(err);
 })



