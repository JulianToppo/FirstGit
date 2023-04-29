const express= require('express')
const chatAppController= require('../controller/chatappController')
const authorization=require('../middlewares/authorization')
const router=express.Router();

router.get('/chatapp',chatAppController.getChatAppPage);
router.post('/chatapp/sendmessage',authorization.authorizationUser,chatAppController.sendMessages);
router.get('/chatapp/getmessages/:lastId/:groupId',authorization.authorizationUser,chatAppController.getMessages);
router.get('/chatapp/getusername/:userId',authorization.authorizationUser,chatAppController.getUsername);
router.get('/chatapp/getgroups',authorization.authorizationUser,chatAppController.getGroups);
router.post('/chatapp/addgroup',authorization.authorizationUser,chatAppController.addGroup);
router.get('/chatapp/getusers',authorization.authorizationUser,chatAppController.getUsers);
router.post('/chatapp/sendinvite',authorization.authorizationUser,chatAppController.userEntryForRequest);
router.get('/chatapp/getRequests',authorization.authorizationUser,chatAppController.getRequestList);
router.post('/chatapp/updateGroups',authorization.authorizationUser,chatAppController.updateGroups)

module.exports=router;