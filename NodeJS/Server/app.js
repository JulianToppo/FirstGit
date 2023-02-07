
const http=require('http');

const routes=require('./routes');

//Checking if nodemon works
// console.log("Julian")

const server=http.createServer(routes.handler);
//const server=http.createServer(routes);

server.listen(3000)