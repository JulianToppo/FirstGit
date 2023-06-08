const mongodb= require('mongodb')
const MongoClient=mongodb.MongoClient;

let db;
const mongoConnect = (callback) => {
  MongoClient.connect("mongodb+srv://juliantoppo95:clusterpassword@cluster0.fkmfoxf.mongodb.net/shop?retryWrites=true&w=majority")
    .then(client => {
      console.log('Connected');
      db=client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

const getDb= ()=>{
  if(db){
    return db;
  }
  throw 'No database found';
}
module.exports=
{
  mongoConnect,
  getDb
}
