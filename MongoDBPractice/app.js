const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
//const User= require('./models/user');
const mongoose= require('mongoose');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const { log } = require('console');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findUserById('6482f91ea85a539641d3821b')
//     .then(user => {
//       console.log("user",user)
//       req.user = new User(user.name,user.email,user.cart,user._id);
//       console.log("req.user",req.user)
//       next();
//     })
//     .catch(err => console.log(err));
// });

 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(
  'mongodb+srv://juliantoppo95:clusterpassword@cluster0.fkmfoxf.mongodb.net/shop?retryWrites=true&w=majority'
).then(result => {
  app.listen(3000);
}).catch(err=>{
  console.log(err)
});