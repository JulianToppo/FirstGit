const path = require('path');

const express = require('express');
const productController=require('../controller/products')
const rootDir = require('../util/path');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product',productController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productController.postAddProduct);

router.get('/contactus',productController.contactUs);

router.post('/success',productController.successPage);

exports.routes = router;

