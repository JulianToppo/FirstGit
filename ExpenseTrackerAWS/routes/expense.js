
const express= require('express');

const router= express.Router();

const expenseController= require("../controller/expenseController");
const authorization =require('../middleware/authorization');

router.get("/",expenseController.getExpensePage);
router.post("/addExpense",authorization.authorizationUser,expenseController.addExpense);
router.get("/getExpense",authorization.authorizationUser,expenseController.getExpense);

router.delete("/:expenseId",authorization.authorizationUser,expenseController.deleteExpense);

module.exports=router;