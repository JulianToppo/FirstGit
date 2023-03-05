
const path = require("path");
const Expense = require("../model/expense");

exports.getExpensePage = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "view", "expense.html"));
    } catch (err) {
        res.status(500).json({ Error: err });
    }
}

exports.addExpense = async (req, res, next) => {
    try {
        const { expenseAmount, description, category } = req.body;
        if (!expenseAmount) {
            throw new Error("Filed expenseAmount required");
        } else {
            if (!description) {
                throw new Error("Filed description required");
            } else {
                if (!category) {
                    throw new Error("Filed category required");
                }
            }

            const data = await Expense.create({
                expenseAmount: expenseAmount,
                description: description,
                category: category
            })

            res.status(201).json({ NewExpenseEntry: data, success: "true" });
        }
    } catch (err) {
        res.status(500).json({ Error: err, success: "false" });
    }
}

exports.getExpense =  async (req, res, next) => {
    try{
        console.log("get expense entries ");
        const data = await Expense.findAll();
        res.status(200).json({ ExpenseEntries: data })
    } catch (err) {
        res.status(500).json({ Error: err });
    }

}