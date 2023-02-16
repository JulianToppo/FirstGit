const express=require('express');
const sellingController= require('../controller/selling')
const route= express.Router();

//display page
route.get('/',sellingController.getPage);

// //get all entities
 route.get('/getAllItems',sellingController.getAllProducts);

// //add items
 route.post('/',sellingController.addItems);

// //delete items
 route.delete('/:entityId',sellingController.deleteItems);

module.exports= route;