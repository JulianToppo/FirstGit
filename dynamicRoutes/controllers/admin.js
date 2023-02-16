const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', { //navigate view
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({ //save the model in db
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  }).then(
    result => {
      console.log(result);
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err));
  
};

exports.postEditProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  const updatedtitle= req.body.title;
  const updatedprice= req.body.price;
  const updatedImageUrl= req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedtitle,
    updatedImageUrl,
    updatedDesc,
    updatedprice);

  Product.findByPk(prodId)
  .then(product => {
    product.title=updatedtitle;
    product.price=updatedprice;
    product.description=updatedDesc;
    product.imageUrl=updatedImageUrl;
    return product.save();
  })
  .then(result=>{
     console.log('Updated product') ;
     res.redirect('/admin/products');
  })
  .catch(err => console.log(err));

}
 

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId=req.params.productId;
  
  Product.findByPk(prodId).then(product => {
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', { //navigate view
    pageTitle: 'Edit Product',
    path: '/admin/edit-product', //highlight
    editing: editMode ,
    product: product,
  
  });
  }).catch(err => console.log(err));
  
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    console.log(products);
    res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin Products',
          path: '/admin/products'
        });
  })
  .catch(err => console.log(err));
  
  
  
  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });
};


exports.postDeleteProduct = (req, res, next) => {

  //console.log("Julian",req.body.url);
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findByPk(prodId)
  .then(product => {
    return product.destroy();
  })
  .then((result) => { //delete
    console.log("updated product")
     res.redirect('/admin/products');
  }) 
  .catch(err => console.log(err));
 
};