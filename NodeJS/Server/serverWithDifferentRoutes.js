
const http=require('http')

var server=http.createServer((req,res)=>{
    if(req.url=='/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title></title></head>');
        res.write('<body>Welcome to my Node Js project</body>');
        res.write('</html>');
        res.end();
    }else{
        if(req.url=='/home'){
            res.setHeader('Content-Type','text/html');
            res.write('<html>');
            res.write('<head><title></title></head>');
            res.write('<body>Welcome home</body>');
            res.write('</html>');
            res.end();
        }else{
            if(req.url=='/about'){
                res.setHeader('Content-Type','text/html');
                res.write('<html>');
                res.write('<head><title></title></head>');
                res.write('<body>Welcome to About Us Page</body>');
                res.write('</html>');
                res.end();
        }else{
            if(req.url=='/node'){
                res.setHeader('Content-Type','text/html');
                res.write('<html>');
                res.write('<head><title></title></head>');
                res.write('<body>Welcome to Node Js project</body>');
                res.write('</html>');
                res.end();
            }
        }
    }
}
})

server.listen(4000)