const express=require('express')
const path=require('path');
const router=express.Router();


const rootDir=require('../util/path')

router.get('/',(req,res,next) =>{
    // console.log('In shop middleware');
    // res.send('<h1>Hello From Express!</h1>');
    res.sendFile(path.join(rootDir,'views','shop.html'));
});

module.exports=router;