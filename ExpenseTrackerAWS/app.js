
const express= require('express');
const loginSignUpRoutes= require('./routes/loginsignup');
const expenseRoutes= require('./routes/expense');
const purchaseRoutes = require('./routes/purchasePremium')
const path=require('path');
const bodyParser=require('body-parser')
const sequelize=require('./util/database')
const user= require('./model/user');
const expense= require('./model/expense');
const order= require('./model/order');
const app=express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();


app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json({ extended: false }));

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

app.use('/',loginSignUpRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);
//sql sync 
sequelize.sync().then(result => {
    // console.log(result);
     app.listen(3000);
  }).catch(err => {
     console.log(err);
 })



