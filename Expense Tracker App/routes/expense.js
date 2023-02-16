//controller
//router

const express=require('express');
const expenseController=require('../controller/expense')

const router=express.Router();

router.get("/",expenseController.getExpensesPage);

router.get("/getEntries",expenseController.getEntries);

router.post("/",expenseController.addExpenseData);

router.delete("/:expenseId",expenseController.deleteExpense);

router.put('/edit/:editId',expenseController.editExpense);

module.exports=router;
