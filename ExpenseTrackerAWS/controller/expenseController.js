
const path = require("path");
const { where } = require("sequelize");
const Expense = require("../model/expense");
const sequelize = require("../util/database");

exports.getExpensePage = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "view", "expense.html"));
    } catch (err) {
        res.status(500).json({ Error: err });
    }
}


exports.addExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {

        console.log("inside add expense");
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
                category: category,
                registeredUserId: req.user.id
            }, { transaction: t })
            const totalExpense = (+req.user.totalExpense) + (+expenseAmount);
            req.user.update({ totalExpense: totalExpense }, { transaction: t })
                .then(async (updatedRows) => {
                    console.log("Inside the async update");
                    await t.commit();
                    res.status(201).json({ NewExpenseEntry: data, success: "true" });
                }).catch(async()=>{
                     await t.rollback();
                    res.status(500).json({ Error: err, success: "false" });
                })

        }
    } catch (err) {
        await t.rollback();
        res.status(500).json({ Error: err, success: "false" });
    }
}

exports.getExpense = async (req, res, next) => {
    try {
        console.log("get expense entries ");
        const data = await Expense.findAll({ where: { registeredUserId: req.user.id } });
        res.status(200).json({ ExpenseEntries: data })
    } catch (err) {
        res.status(500).json({ Error: err });
    }

}

exports.deleteExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        console.log("inside delete expense function");

        const expenseId = req.params.expenseId;

        console.log(expenseId);

        const expense = await Expense.findOne({ where: { id: expenseId } });

        console.log(expense.expenseAmount, req.user.totalExpense);

        const totalExpense = (+req.user.totalExpense) - (+expense.expenseAmount);
        await req.user.update({ totalExpense: totalExpense }, { transaction: t });
        const data = await Expense.destroy({
            where: {
                id: expenseId
            }, transaction: t
        });
        await t.commit();
        res.status(200).json({ Delete: data });
        // .catch(err => console.log(err));
    } catch (err) {
        await t.rollback();
        res.status(500)
            .json({
                error: err
            })
    }
}