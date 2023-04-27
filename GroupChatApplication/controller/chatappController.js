const path = require('path')
const messagesTB= require('../model/messages')

var getChatAppPage = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "views", "chatapppage.html"))
    } catch (error) {
        res.status(500).json({ Error: error })
    }
}

var sendMessages= async(req,res,next)=>{
    try {
        const {message}= req.body;
        await messagesTB.create({
            message:message,
            userId:req.user.id
        })

        res.status(201).json({message:"Message entry made into the database", status:true})
    } catch (error) {
        res.status(500).json({message:error, status:false})
    }
}

var loadMessages= async(req,res,next)=>{

    try {
        let userMessages=await messagesTB.findAll({
            // where:{
            //     userId:req.user.id
            // }
        })

        res.status(200).json({message:"User Messages retrieved",messages:userMessages,status:true})
    } catch (error) {
        res.status(500).json({message:error, status:false})
    }
}

module.exports = {
    getChatAppPage,
    sendMessages,
    loadMessages
}