

const express= require('express');

const router=express.Router();

const expenseController = require('../controller/expenseController')

router.get("/",expenseController.getPage);
router.post("/user/post",expenseController.postFormEntry);


module.exports=router;