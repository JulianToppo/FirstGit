
const express = require('express');
const sequelize = require('./util/database')
const loginSignUpRoutes = require('./routes/loginsignup');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchasePremium')
const premiumRoutes = require('./routes/premium');
const path = require('path');
const bodyParser = require('body-parser')

const fs = require('fs');
const helmet = require('helmet')

const user = require('./model/user');
const expense = require('./model/expense');
const order = require('./model/order');
const forgotPasswordRequests = require('./model/forgotPasswordRequests')
const filesDownloaded = require('./model/filesDownloaded');
const dotenv = require('dotenv');
const morgan= require('morgan');
const app = express();
// get config vars
dotenv.config();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),
    {
        flag: 'a'
    });


//app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json({ extended: false }));
app.use(morgan('combined', {stream: accessLogStream}))
user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

user.hasMany(forgotPasswordRequests);
forgotPasswordRequests.belongsTo(user);

user.hasMany(filesDownloaded);
filesDownloaded.belongsTo(user);

app.use('/', loginSignUpRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/', premiumRoutes);
//sql sync 
sequelize.sync().then(result => {
    // console.log(result);
    app.listen(process.env.PORT|| 3000);
}).catch(err => {
    console.log(err);
})



