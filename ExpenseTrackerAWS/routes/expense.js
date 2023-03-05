
const express= require('express');

const router= express.Router();

const expenseController= require("../controller/expenseController");

router.get("/",expenseController.getExpensePage);
router.post("/addExpense",expenseController.addExpense);
router.get("/getExpense",expenseController.getExpense);

module.exports=router;