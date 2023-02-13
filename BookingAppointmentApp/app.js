const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize= require('./util/database');
const userRoutes= require('./route/user')

const app = express();

app.use(bodyParser.json({ extended: false }));

console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);
app.use(cors());
sequelize.sync().then(result => {
    // console.log(result);
     app.listen(3000);
  }).catch(err => {
     console.log(err);
 })