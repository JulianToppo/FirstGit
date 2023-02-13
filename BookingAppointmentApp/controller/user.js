const User= require('../models/user');
const path= require('path');

exports.getForm = (req,res,next)=>{
   console.log("Check");
   res.sendFile(path.join(__dirname,'..','index.html'));
}

exports.storeForm =  async (req,res,next)=>{
   
   try{
      console.log("inside store form");
      if(!req.body.name){
         throw new Error('name is mandatory')
      }
      else{
         if(!req.body.email){
            throw new Error('email is mandatory')
         }
         else{
            if(!req.body.phonenumber){
               throw new Error('phonenumber is mandatory')
            }
            else{
               if(!req.body.dateForCall){
                  throw new Error('dateForCall is mandatory')
               }
               else{
                  if(!req.body.timeForCall){
                     throw new Error('timeForCall is mandatory')
                  }
                  else{
                     
                  }
               }
            }
         }
      }
   const name = req.body.name;
   const email = req.body.email;
   const phonenumber = req.body.phonenumber;
   const dateForCall = req.body.dateForCall;
   const timeForCall=  req.body.timeForCall;
   
   const data= await User.create({ //save the model in db
     name: name,
     email: email,
     phonenumber: phonenumber,
     dateForCall: dateForCall,
     timeForCall: timeForCall
   })
   res.status(201).json(
      {newUserDetail:data});

    // .catch(err => console.log(err));
   }catch(err){
      res.status(500)
      .json({
         error:err
      })
 
   } ;

}

exports.getAllUsers= async (req,res,next) => {
  
   try{
   console.log("Inside GetAllUsers")
   const data=await User.findAll();
   res.status(200).json({Users:data});
   // .catch(err => console.log(err));
  }catch(err){
     res.status(500)
     .json({
        error:err
     })
  } ;
}

exports.deleteUser= async (req,res,next) => { 
   try{
   console.log("inside delete users");
   const id=req.params.userId;
   //console.log(req);
   console.log(id);
   console.log("Inside GetAllUsers")
   const data=await User.destroy(
      {
         where:{id:id}
      }
   );
   res.status(200).json({Delete:data});
   // .catch(err => console.log(err));
  }catch(err){
     res.status(500)
     .json({
        error:err
     })
  }
}

//edit
exports.editUser= async (req,res,next) => { 
   try{
      console.log("inside edit user");
      const id=req.params.userId;

      const data= User.update(
         {   name : req.body.name,
             email : req.body.email,
             phonenumber : req.body.phonenumber,
             dateForCall : req.body.dateForCall,
             timeForCall:  req.body.timeForCall },
         { where: { id: id } },
       );
       res.status(200).json({EditedUser:data});
   }catch(err){
      res.status(500)
      .json({
         error:err
      })
   }
}