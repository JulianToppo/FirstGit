const path = require('path')
const messagesTB = require('../model/messages')
const user= require('../model/user')
const { Op } = require("sequelize");

var getChatAppPage = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "views", "chatapppage.html"))
    } catch (error) {
        res.status(500).json({ Error: error })
    }
}

var sendMessages = async (req, res, next) => {
    try {
        const { message } = req.body;
        await messagesTB.create({
            message: message,
            userId: req.user.id
        })

        res.status(201).json({ message: "Message entry made into the database", status: true })
    } catch (error) {
        res.status(500).json({ message: error, status: false })
    }
}

var getMessages = async (req, res, next) => {

    try {
        const{lastId}=req.params;
        console.log(lastId);
        let userMessages = await messagesTB.findAll({
            where:{
                id:{
                     [Op.gt]: lastId
                }
               
            }
        })
        console.log(userMessages.length)
        res.status(200).json({ message: "User Messages retrieved", messages: userMessages, status: true })
    } catch (error) {
        res.status(500).json({ message: error, status: false })
    }
}

var getUsername = async (req, res, next) => {
    try {
        const {userId}=req.params;
        if(userId== req.user.id){
            res.status(200).json({username:"You",status:true})
        }
        else{
            user.findOne({
                where:{
                    id:userId
                }
            }).then(result=>{
                res.status(200).json({username:result.username,status:true})
            }).catch(error=>{
                res.status(500).json({ message: error, status: false })
            })
        }
    } catch (error) {
        res.status(500).json({ message: error, status: false })
    }
}

module.exports = {
    getChatAppPage,
    sendMessages,
    getMessages,
    getUsername
}