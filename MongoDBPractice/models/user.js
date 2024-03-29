const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }]
  }
})

userSchema.methods.addToCart = function (product) {

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
        productId: product._id,
        quantity: newQuantity
      })
  }

  const updateCart = {
    items: updatedCartItems
  };

  this.cart = updateCart;
  return this.save();
}

userSchema.methods.deleteItemsFromCart = function (productId) {
  console.log("inside delete carts")
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems;
  return this.save();
}

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
}

//   userSchema.methods.addOrder= function(){
//     const db= getDb();
//     return this.getCart().then(product=>{
//       const order = {
//         items: product,
//         users: {
//           _id: new ObjectId(this._id),
//           name: this.name
//         }
//       };
//       return db.collection('orders').insertOne(order);
//     })    
//    .then(result=>{
//       this.cart= {items:[]};
//       return db.collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: { items: [] } } }
//       )
//     })
//   }
module.exports = mongoose.model('User', userSchema);

// const getDb = require('../util/database').getDb
// const ObjectId = require('mongodb').ObjectId;

// class User {
//   constructor(name, email, cart, id) {
//     this.name = name;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db.collection('users')
//       .insertOne(this)
//       .then(result => {
//         console.log(result);
//         return result;
//       })
//   }

//   getCart() {
//     return this.cart;
//   }

//   addToCart(product) {
//     // const cartProduct=this.cart.items.findIndex(cp=>{
//     //   return cp._id===product._id;
//     // })
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.productId.toString() == product._id.toString();
//     })

//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity
//     } else {
//       updatedCartItems.push(
//         {
//           productId: new ObjectId(product._id),
//           quantity: newQuantity
//         })
//     }

//     const updateCart = {
//       items: updatedCartItems
//     };
//     const db = getDb();
//     return db.collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: updateCart } }
//       ).then(result => {
//         return result;
//       })
//       .catch(err => {
//         console.log(err)
//       })

//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map(i => {
//       return i.productId;
//     })
//     return db.collection('products').find({ _id: { $in: productIds } }).toArray()
//       .then(products => {
//         return products.map(p => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(i => {
//               return i.productId.toString() == p._id.toString();
//             }).quantity
//           };
//         })
//       });

//   }

//   static findUserById(userId) {
//     const db = getDb();
//     return db.collection('users')
//       .findOne({ _id: new ObjectId(userId) })
//       .then(user => {
//         console.log(user);
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       }); //next is used to return the single element 
//   }


//   deleteItemsFromCart(productId) {
//     console.log("inside delete carts")
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== productId.toString();
//     });

//     console.log("productId",productId.toString(),"upadtedItems",updatedCartItems);
//     const db = getDb();
//     return db.collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       )
//   }

//   addOrder(){
//     const db= getDb();
//     return this.getCart().then(product=>{
//       const order = {
//         items: product,
//         users: {
//           _id: new ObjectId(this._id),
//           name: this.name
//         }
//       };
//       return db.collection('orders').insertOne(order);
//     })    
//    .then(result=>{
//       this.cart= {items:[]};
//       return db.collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: { items: [] } } }
//       )
//     })
//   }

//   getOrders(){
//     console.log("inside get Orders");
//     const db=getDb();
//     return db.collection('orders')
//     .find({'users._id':new ObjectId(this._id)})
//     .toArray();

//   }
// }
// module.exports = User;
