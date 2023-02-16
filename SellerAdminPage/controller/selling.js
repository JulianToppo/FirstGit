const path = require('path');
const sellingEntity = require('../model/selling');

exports.getPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'))
}

exports.getAllProducts = async (req, res, next) => {
    try {
        const data = await sellingEntity.findAll();
        res.status(201).json({ SellingEntities: data });
    } catch (err) {
        res.status(500).json({ Error: err });
    }
}

exports.addItems = async (req, res, next) => {
    try {
        console.log("inside add items post method");
        if (!req.body.sellingPrice) {
            throw new Error('Selling Price is mandatory');
        } else {
            if (!req.body.productName) {
                throw new Error('Product Name is mandatory');
            } else {
                if (!req.body.category) {
                    throw new Error('Category Name is mandatory');
                }
            }
        }

        console.log(req.body.sellingPrice, " ", req.body.productName, " ", req.body.category);
        console.log("add items before await");
        const data = await sellingEntity.create({
            sellingPrice: req.body.sellingPrice,
            productName: req.body.productName,
            category: req.body.category
        });
        
        console.log("add items after await");
        res.status(201).json({ SellingEntry: data });
    }
    catch (err) {
        res.status(500).json({ Error: err });
    }
}

exports.deleteItems = async (req, res, next) => {
    try {
        console.log("inside delete expense function");
        const sellingId = req.params.entityId;
        console.log(sellingId);
        const data = await sellingEntity.destroy({
            where: {
                id: sellingId
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