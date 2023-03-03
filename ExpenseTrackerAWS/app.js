

const express= require('express');
const expenseRoutes= require('./routes/expenseRoutes');
const path=require('path');
const bodyParser=require('body-parser')

const app=express();


app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json({ extended: false }));

app.use('/',expenseRoutes);

app.listen(3000);


