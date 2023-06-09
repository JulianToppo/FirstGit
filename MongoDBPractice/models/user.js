
const getDb = require('../util/database').getDb
const ObjectId = require('mongodb').ObjectId;

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users')
      .insertOne(this)
      .then(result => {
        console.log(result);
        return result;
      })
  }

  addToCart(product) {
    // const cartProduct=this.cart.items.findIndex(cp=>{
    //   return cp._id===product._id;
    // })
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() == product._id.toString();
    })

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity
    } else {
      updatedCartItems.push(
        {
          productId: new ObjectId(product._id),
          quantity: newQuantity
        })
    }

    const updateCart = {
      items: updatedCartItems
    };
    const db = getDb();
    return db.collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updateCart } }
      ).then(result => {
        return result;
      })
      .catch(err => {
        console.log(err)
      })

  }

  static findUserById(userId) {
    const db = getDb();
    return db.collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      }); //next is used to return the single element 
  }
}


// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

module.exports = User;
