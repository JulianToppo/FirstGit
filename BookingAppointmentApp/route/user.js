const path = require('path');

const express = require('express');

const userController = require('../controller/user');

const router = express.Router();

router.get("/",userController.getForm);

//Add users
router.post('/user/add-user',userController.storeForm)

//Get all users
router.get('/users/getAllUsers',userController.getAllUsers)

//delete user
router.delete('/delete/:userId',userController.deleteUser);

router.put('/edit/:userId',userController.editUser);

module.exports=router;