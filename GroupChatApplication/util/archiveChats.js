const archivedChat = require('./model/archivedChat')
const messages = require('./model/messages')
const { Op } = require('sequelize')

var archiveChats = async () => {
    try {
        let allUser = await messages.findAll({
            where: {
                createdAt: {
                    [Op.lte]: moment().subtract(1, 'days').toDate()
                }
            }
        })

        await messages.destroy({
            where: {
                createdAt: {
                    [Op.gte]: moment().subtract(1, 'days').toDate()
                }
            }
        })

        archiveChats.bulkCreate(allUser, { returning: true })
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    archiveChats
}