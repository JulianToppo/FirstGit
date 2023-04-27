const express= require('express')
const chatAppController= require('../controller/chatappController')
const authorization=require('../middlewares/authorization')
const router=express.Router();

router.get('/chatapp',chatAppController.getChatAppPage);
router.post('/chatapp/sendmessage',authorization.authorizationUser,chatAppController.sendMessages);
router.get('/chatapp/loadmessages',authorization.authorizationUser,chatAppController.loadMessages);
router.get('/chatapp/getusername/:userId',authorization.authorizationUser,chatAppController.getUsername);

module.exports=router;