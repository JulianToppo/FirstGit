
const fs=require('fs')

const requestHandler=(req,res)=>{
    const url=req.url;
    const method=req.method;

    if(url==='/'){
        res.setHeader('Content-Type','text/html');
        value=fs.readFile('newmessage.txt', 'utf8', function(err, data){
      
            // Display the file content
            res.write('<html>');
            res.write('<head><title>Homepage</title></head>');
            res.write('<body>'+data+'<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
            res.write('</html>');
            return res.end();
        });
      
    }

    if(url ==='/message' && method ==='POST'){
        const body=[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end',()=>{
            const parsedBody= Buffer.concat(body).toString();
            const message=parsedBody.split("=")[1];
            fs.writeFile('newmessage.txt',message,err =>{
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end() ;
            });
            
    });
        
    }
};


//Three exporting ways
// module.exports={
//     handler:requestHandler
// }

// module.exports= requestHandler;

module.exports.handler=requestHandler