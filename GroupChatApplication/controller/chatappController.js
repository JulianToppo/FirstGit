const path = require('path')
const messagesTB = require('../model/messages')
const UserTB = require('../model/user')
const groupTB = require('../model/groups')
const { Op } = require("sequelize");
const UserGroupsTB = require('../model/user-groups');
const inviteRequests = require('../model/inviteRequest')
const admin = require('../model/admin')

var getChatAppPage = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "views", "chatapppage.html"))
    } catch (error) {
        res.status(500).json({ Error: error })
    }
}

var sendMessages = async (req, res, next,) => {
    try {

        const { message, groupID } = req.body;
        let createSuccessful = await messagesTB.create({
            message: message,
            userId: req.user.id,
            groupId: groupID
        })
        if (createSuccessful) {
            console.log("socket called")
            res.io.broadcast.emit('broadcast', {});
        }
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

var getActiveUsers = async (req, res, next) => {
    try {
        await UserTB.findOne({
            where: {
                id: req.user.id
            }
        }).then(result => {
            res.status(200).json({ username: result.username, status: true })
        })
    } catch (error) {
        console.log(error)
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
            let addUserGroup = await req.user.addGroup(result);
            let adminEntry = await admin.create({
                status: true,
                userId: req.user.id,
                groupId: result.id
            })
            if (addUserGroup.length < 1) {
                res.status(500).json({ Error: addUserGroup, status: false })
            }
            if (adminEntry.length < 1) {
                res.status(500).json({ Error: adminEntry, status: false })
            }
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
        const { userInvited, PhoneNumber, Email, groupID } = req.body;

        UserTB.findOne({
            where: {
                username: userInvited,
                phonenumber: PhoneNumber,
                email: Email
            }
        }).then(result => {
            console.log("usernameidcheck", result.id, req.user.id);
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
                    res.io.broadcast.emit('pendingRequestCheck', {"username":result.username});
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

var getUsersInGroup = async (req, res, next) => {
    try {
        const { groupID } = req.params;
        await UserGroupsTB.findAll({
            where: {
                groupId: groupID
            }
        }).then(result => {
            res.status(201).json({ data: result, status: true })
        })

    } catch (error) {
        res.status(500).json({ Error: error, status: false })
    }
}

var makeUserAdmin = async (req, res, next) => {
    try {
        const { userid, groupID } = req.body;
        await admin.create({
            status: true,
            userId: userid,
            groupId: groupID
        }).then(result => {
            res.status(201).json({ data: result, status: true })
        })
    } catch (error) {
        res.status(500).json({ Error: error, status: false })
    }
}

var deleteUserFromGroup = async (req, res, next) => {
    try {
        const { userid, groupID } = req.body;
        UserGroupsTB.destroy({
            where: {
                userId: userid,
                groupId: groupID
            }
        }).then(result => {
           
            res.status(200).json({ message: "User deleted from group", data: result, status: true })
            res.io.emit("deleteGroupChat",{deletedGpId:groupID, deleteduserid:userid});
           
        })
    } catch (error) {
        res.status(500).json({ Error: error, status: false })
    }

}

var isadmin = async (req, res, next) => {
    try {
        let { userID, groupID } = req.params;
        console.log(userID)
        if (userID == "token") {
            console.log("check")
            userID = req.user.id;
        }
        console.log("dekho", userID, groupID);
        admin.findOne({
            where: {
                userId: userID,
                groupId: groupID,
                status: true
            }
        }).then(result => {

            res.status(200).json({ data: result, status: true })
        })
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
    updateGroups,
    getUsersInGroup,
    makeUserAdmin,
    deleteUserFromGroup,
    isadmin,
    getActiveUsers
}