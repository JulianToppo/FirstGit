
const getDb = require('../util/database').getDb
const ObjectId= require('mongodb').ObjectId;
class User{
  constructor(name,email){
    this.name=name;
    this.email=email;
  }

  save(){
    const db=getDb;
    return db.collection('users')
    .insertOne(this)
    .then(result=>{
      console.log(result);
      return result;
    })
  }

  static findUserById(userId){
    const db=getDb;
    return db.collection('users')
    .findOne({_id:new ObjectId(userId)}); //next is used to return the single element 
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
