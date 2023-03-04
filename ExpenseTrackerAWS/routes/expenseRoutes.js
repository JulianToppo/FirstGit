

const express= require('express');

const router=express.Router();

const expenseController = require('../controller/expenseController')

router.get("/",expenseController.getLoginPage);
router.get("/signUp",expenseController.getPage);
router.post("/user/post",expenseController.postFormEntry);
router.post("/login",expenseController.loginUser);

module.exports=router;