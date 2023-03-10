const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize= require('./util/database');
const app = express();

const User= require('./models/user');
const Products= require('./models/product');
const Cart= require('./models/cart');
const CartItem= require('./models/cart-item');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product');

// db.execute('SELECT * FROM products')
// .then(result=>{
//     console.log(result[0]);
// }).catch(err =>{
//     console.log(err);
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
     .then(user => {
       req.user = user;
       console.log(req.user);
       next();
     })
     .catch(err => console.log("julian",err));
 });
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//Associations
Product.belongsTo(User,{ constraints: true, onDelete:'CASCADE'});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{ through :CartItem });
Product.belongsToMany(Cart,{ through :CartItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
   return user.createCart();
    
  })
  .then(cart =>{
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });


