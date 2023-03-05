

const express= require('express');

const router=express.Router();

const loginSignUpController = require('../controller/loginSignUpController')

router.get("/",loginSignUpController.getLoginPage);
router.get("/signUp",loginSignUpController.getPage);
router.post("/user/post",loginSignUpController.postSignUpEntry);
router.post("/login",loginSignUpController.loginUser);

module.exports=router;