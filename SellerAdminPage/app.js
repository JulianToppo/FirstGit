const Sequelise= require('./util/database');
const express= require('express');
const path=require('path');
const bodyParser= require('body-parser');
const sellingRoutes= require("./route/selling")

const app= express();

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json({extended: false }));
app.use(sellingRoutes);
Sequelise.sync().then(
    app.listen(3000)
).catch(
    err =>{
        console.log(err);
    }
)