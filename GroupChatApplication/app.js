const bodyParser = require('body-parser');
const express = require('express');
const sequelize = require('./util/database');
const signupRoutes = require('./router/signup')
const loginRoutes = require('./router/login')
const chatAppRouter = require('./router/chatapp')
//tables
const user = require('./model/user')
const messages = require('./model/messages')
const groups = require('./model/groups')
const usergroups = require('./model/user-groups')
const inviteRequests = require('./model/inviteRequest')
const admin = require('./model/admin')

const cors = require('cors')
const fs = require('fs');
const Axios = require('axios');
const morgan = require('morgan')
const path = require('path');
const { Socket } = require('socket.io');

const port = 3000;
const app = express();
const server= require('http').createServer(app)
const io = require('socket.io')(server,{
    cors:{
        origin:'*'
    }
});
var s;
io.on('connection',socket =>{
    console.log(socket.id)
  s=socket;
})

Axios.default.baseURL = process.env.HOST_IPADDRESS;

app.use(cors({
    origin: '*',
    method: {}
}))

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),
    {
        flag: 'a'
    });
app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
    // res.io = io;
    // next();
    res.io=s;
    next();

  });

app.use(signupRoutes);
app.use(loginRoutes);
app.use(chatAppRouter);


//Sql table relations
user.hasMany(messages);
messages.belongsTo(user);

groups.hasMany(messages);
messages.belongsTo(groups);

user.belongsToMany(groups, { through: usergroups });
groups.belongsToMany(user, { through: usergroups });

user.hasMany(inviteRequests);
inviteRequests.belongsTo(user)

groups.hasMany(inviteRequests);
inviteRequests.belongsTo(groups)

groups.hasMany(admin)
admin.belongsTo(groups);

user.hasMany(admin)
admin.belongsTo(user);

sequelize.sync({}).then(result => {
    server.listen(port);
}).catch(err => {
    console.log(err);
})