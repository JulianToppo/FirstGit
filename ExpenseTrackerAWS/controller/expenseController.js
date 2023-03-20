
const path = require("path");

const Expense = require("../model/expense");
const sequelize = require("../util/database");
const AWS = require('aws-sdk');
const { resolve } = require("path");
const fileDownloaded = require("../model/filesDownloaded");

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
                }).catch(async () => {
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
        const pageNo= req.params.pageNo;
        const rowCount=req.params.rowCount;
        const totalCount= await Expense.count();

       
        const lastPage= Math.floor(totalCount/rowCount)+1;
        const data = await Expense.findAll({ 
            where: { registeredUserId: req.user.id },
            limit:Number(rowCount),
            offset:(Number(pageNo)-1)*Number(rowCount)
         });
        res.status(200).json({ ExpenseEntries: data , paginationValues: {
            currpage : pageNo,
            hasNext:Number(pageNo)+1<lastPage,
            next:Number(pageNo)+1,
            hasPrevious:pageNo>1,
            previous:pageNo-1,
            last:lastPage
        }})
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

// exports.showReports= async (req,res,next)=>{
//     try {
//         res.sendFile(path.join(__dirname,"..","view","dayToDayExpenses.html"));
//         res.status(200);
//     } catch (error) {
//         res.status(500).json({ Error: err });
//     }
// }

function uploadToS3(data, filename) {
    console.log("inside upload to s3");
    const BUCKET_NAME = 'expensetracker124';
    const IAM_USER_KEY = 'AKIAXCOSF6OELYA3XRQI';
    const IAM_USER_SECRET = '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';

    var s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        //     Bucket: BUCKET_NAME
    })


    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    }

    return new Promise((resolve, reject) => {
        s3bucket.upload(params, (err, s3reponse) => {
            if (err) {
                console.log("Something went wrong", err);
                reject(err);
            } else {
                console.log("Success", s3reponse);
                resolve(s3reponse.Location);
            }
        })
    })
}

exports.downloadExpense = async (req, res, next) => {
            try {
                console.log("inside download expense");
                const expense = await req.user.getExpenses();
                console.log(expense);
                const stringyfiedExpenses = JSON.stringify(expense);

                const userId = req.user.id;
                const filename = `Expense${userId}/${new Date()}.txt`;
                const fileURL = await uploadToS3(stringyfiedExpenses, filename);

                await fileDownloaded.create({
                    fileURL: fileURL,
                    registeredUserId: req.user.id
                })

                res.status(200).json({ fileURL, success: true })

            } catch (error) {
                res.status(500).json({ fileURL:'', success:'false',error: error });
            }
        }

        
exports.getDownloadedFiles = async (req, res, next) => {
    try {
        console.log("get downloaded files");
        const data = await fileDownloaded.findAll({ where: { registeredUserId: req.user.id } });
        res.status(200).json({ DownloadedFiles: data })
    } catch (err) {
        res.status(500).json({ Error: err });
    }

}