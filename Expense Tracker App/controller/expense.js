
const path = require('path');
const Expense = require('../model/expense')

exports.getExpensesPage = (req, res, next) => {

    res.sendFile(path.join(__dirname, "..","view", "index.html"))
}

exports.getEntries = async (req, res, next) => {
    try {
        console.log("inside get entries")
        const data = await Expense.findAll();
        res.status(200).json({ ExpenseEntries: data })
    } catch (err) {
        res.status(500).json({ Error: err });
    }

}

exports.addExpenseData = async (req, res, next) => {

    try {
        if (!req.body.expenseAmount) {
            throw new Error('Expense Amount is Mandatory')
        } else {
            if (!req.body.description) {
                throw new Error('Description is Mandatory')
            } else {
                if (!req.body.category) {
                    throw new Error('Category is Mandatory')
                }
            }
        }
        const data = await Expense.create({
            expenseAmount: req.body.expenseAmount,
            description: req.body.description,
            category: req.body.category
        });

        res.status(201).json({ ExpenseEntry: data })
    }
    catch (err) {
        res.status(500).json({ Error: err });
    }

}

exports.deleteExpense = (req, res, next) => {
    try {
        console.log("inside delete expense function");
        const expenseId = req.params.expenseId;
        console.log(expenseId);
        const data=Expense.destroy({
            where: {
                id: expenseId
            }
        });
        res.status(200).json({ Delete: data });
        // .catch(err => console.log(err));
    } catch (err) {
        res.status(500)
            .json({
                error: err
            })
    }
}


exports.editExpense = (req, res, next) => {
    try{
        
        const id=req.params.editId;
        const data= Expense.update(
           {  
             expenseAmount: req.body.expenseAmount,
            description: req.body.description,
            category: req.body.category },
           { where: { id: id } },
         );
         res.status(200).json({EditedUser:data});
     }catch(err){
        res.status(500)
        .json({
           error:err
        })
     }
}