const bodyParser = require('body-parser');
const express=require('express');
const sequelize = require('./util/database');
const signupRoutes= require('./router/signup')
const loginRoutes= require('./router/login')
const chatAppRouter = require('./router/chatapp')
//tables
const user=require('./model/user')
const messages=require('./model/messages')
const groups=require('./model/groups')
const usergroups=require('./model/user-groups')
const inviteRequests=require('./model/inviteRequest')
const app=express();
const path= require('path')
const port=3000;
const cors=require('cors')

app.use(cors({
    origin:'*',
    method:{}
}))
app.use(bodyParser.json({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(signupRoutes);
app.use(loginRoutes);
app.use(chatAppRouter);

//Sql table relations
user.hasMany(messages);
messages.belongsTo(user);

groups.hasMany(messages);
messages.belongsTo(groups);

user.belongsToMany(groups,{through:usergroups});
groups.belongsToMany(user,{through:usergroups});

user.hasMany(inviteRequests);
inviteRequests.belongsTo(user)

groups.hasMany(inviteRequests);
inviteRequests.belongsTo(groups)

sequelize.sync({}).then(result => {
    app.listen(port);
}).catch(err => {
    console.log(err);
})