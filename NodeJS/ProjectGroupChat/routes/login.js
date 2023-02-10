const express=require('express')
const fs=require('fs')

const router=express.Router();


router.get('/login',(req,res,next)=>{
    console.log("Inside login page");
    res.send('<html><head><title>Login Page</title></head><body><form action="/" method="POST" onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" ><input type="text" id="username" name="username"/><br></br><button type="submit">Login</button></form></body></html>');
})

router.post('/',(req,res,next)=>{
        console.log("Inside send message form");
          
        fs.readFile('message.txt', 'utf8', function(err, data){
            console.log(data);
            res.send('<html><head><title>Send Message Page</title></head><body><form action="/" method="POST">'+data+'<br><input type="text" name="message"/><br></br><input type="hidden" name="username" value="'+req.body.username+'"><button type="submit">Send Message</button></form></body></html>');
     
        }) 


        if(req.body.username && req.body.message){
            const message=req.body.username+":"+req.body.message+"\n";
            value= fs.appendFile('message.txt',message,err =>{
            err?console.log(err):res.redirect("/");
        })
    }
    
     


    })

module.exports=router;