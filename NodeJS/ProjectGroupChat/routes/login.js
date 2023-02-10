const express=require('express')
const fs=require('fs')

const router=express.Router();


router.get('/login',(req,res,next)=>{
    console.log("Inside login page");
    res.send('<html><head><title>Login Page</title></head><body><form action="/" method="GET" onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" ><input type="text" id="username" name="username"/><br></br><button type="submit">Login</button></form></body></html>');
})

router.get("/",(req,res,next)=>{
    
          
    fs.readFile('message.txt', 'utf8', function(err, data){
        if(err){
            data="No chats found";
        }
        res.send(`
        <html><head>
        <title>Send Message Page</title></head>
        <body>
        ${data}
        <form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">
        <br><input type="text" name="message"/><br></br>
        <input type="hidden" id="username" name="username">
        <button type="submit">Send Message</button>
        </form>
        </body></html>`);
 
    }) 
})


router.post('/',(req,res,next)=>{

    console.log(req.body.username);
       const message=req.body.username+":"+req.body.message+"\n";
       value= fs.appendFile('message.txt',message,err =>{
       err?console.log(err):res.redirect("/");
    })  


    });

module.exports=router;