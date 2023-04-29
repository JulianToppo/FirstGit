const path = require('path')
const messagesTB = require('../model/messages')
const UserTB = require('../model/user')
const groupTB = require('../model/groups')
const { Op } = require("sequelize");
const UserGroupsTB = require('../model/user-groups');
const inviteRequests = require('../model/inviteRequest')


var getChatAppPage = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "views", "chatapppage.html"))
    } catch (error) {
        res.status(500).json({ Error: error })
    }
}

var sendMessages = async (req, res, next) => {
    try {
        const { message, groupID } = req.body;
        await messagesTB.create({
            message: message,
            userId: req.user.id,
            groupId: groupID
        })

        res.status(201).json({ message: "Message entry made into the database", status: true })
    } catch (error) {
        res.status(500).json({ message: error, status: false })
    }
}

var getMessages = async (req, res, next) => {

    try {
        const { lastId, groupId } = req.params;
        console.log(lastId);
        let userMessages = await messagesTB.findAll({
            where: {
                id: {
                    [Op.gt]: lastId
                },
                groupID: groupId

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
        const { userId } = req.params;
        if (userId == req.user.id) {
            res.status(200).json({ username: "You", status: true })
        }
        else {
            UserTB.findOne({
                where: {
                    id: userId
                }
            }).then(result => {
                res.status(200).json({ username: result.username, status: true })
            }).catch(error => {
                res.status(500).json({ message: error, status: false })
            })
        }
    } catch (error) {
        res.status(500).json({ message: error, status: false })
    }
}

var getGroups = async (req, res, next) => {
    try {
        // console.log("userIDdddddddd", req.user.id)
        await UserTB.findAll({
            // include: [{
            //     // through: {
            //     //     where: {
            //     //         userId: req.user.id
            //     //     }
            //     // }
            // }]
            where: {
                id: req.user.id
            },
            include: groupTB
        }
        ).then(result => {
            res.status(200).json({ groups: result, status: true })
        }).catch(err => {
            console.log(err)
            res.status(500).json({ error: err, status: false })
        })
    } catch (error) {
        res.status(500).json({ message: error, status: false })
    }
}

var addGroup = async (req, res, next) => {
    try {
        const { groupName } = req.body;
        console.log("groupname", groupName)
        await groupTB.create({
            name: groupName,
        }).then(async result => {
            //Linking the tables user and groups
            await req.user.addGroup(result);
            res.status(201).json({ data: result, status: true })
        }).catch(err => {
            res.status(500).json({ Error: err, status: false })
        })
    } catch (error) {
        res.status(500).json({ Error: error, status: false })
    }
}

var getUsers = async (req, res, next) => {
    try {
        await UserTB.findAll().then(
            result => {
                res.status(200).json({ data: result, status: true })
            }
        )
    } catch (error) {
        res.status(500).json({ Error: error, status: false })
    }
}

//making entries in the request table
var userEntryForRequest = async (req, res, next) => {
    try {
        const { userInvited, groupID } = req.body;
        UserTB.findOne({
            where: {
                username: userInvited
            }
        }).then(result => {
            console.log("usernameidcheck",result.id ,req.user.id);
            if (result.id == req.user.id) {
                throw new Error("User can't sent invite to himself!")
            } else {
                inviteRequests.create({
                    invitationBy: req.user.id,
                    userId: result.id,
                    groupId: groupID,
                    status: "pending"
                }).then(insertedData => {
                    res.status(201).json({ data: insertedData, status: true })
                }).catch(err => {
                    res.status(500).json({ Error: err, status: false })
                })
            }

        }).catch(err => {
            res.status(500).json({ Error: err, status: false })
        })
    } catch (error) {
        res.status(500).json({ Error: error, status: false })
    }
}

var getRequestList = async (req, res, next) => {
    try {
        await inviteRequests.findAll({
            where: {
                userId: req.user.id
            }
        }).then(result => {
            res.status(200).json({ data: result, status: true })
        })
    } catch (error) {
        res.status(500).json({ Error: error, status: false })
    }
}

var updateGroups = async (req, res, next) => {
    try {
        const { groupID, invitedBy } = req.body;
        // console.log(groupID)
        await UserGroupsTB.create({
            userId: req.user.id,
            groupId: groupID
        }).then(
            result => {
                inviteRequests.update({
                    status: "accepted"
                },
                    {
                        where: {
                            invitationBy: invitedBy,
                            groupId: groupID,
                            userId: req.user.id
                        }
                    })

                res.status(201).json({ data: result, status: true })
            }
        )

    } catch (error) {
        res.status(500).json({ Error: error, status: false })
    }
}
module.exports = {
    getChatAppPage,
    sendMessages,
    getMessages,
    getUsername,
    getGroups,
    addGroup,
    getUsers,
    userEntryForRequest,
    getRequestList,
    updateGroups
}