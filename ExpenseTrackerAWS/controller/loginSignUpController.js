
const path = require('path')
const user = require('../model/user')
const bcrypt= require('bcrypt');

exports.getLoginPage = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "view", "login.html"));
    } catch (err) {
        res.status(500).json({ Error: err });
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const {email,password} = req.body;


        if (!email) {
            throw new Error("Email required");
        } else {

            if (!password) {
                throw new Error("Password required");
            }
        }

        var data= await user.findAll({where:{
            email:email
        }})
        

        if(data.length>=1){

           bcrypt.compare(password,data[0].password, (err,result) =>{


            // data = await user.findAll({
            //     where: {
            //         email: email,
            //         password: password
            //     }
            // })
    
            // if (data.length>=1) {
            if(result===true){
                res.status(201).json({ Message: "User login sucessful" ,success :"true"});
          
            }
            else {
                res.status(401).json({ Error: "User not authorized" ,success :"false" });
            }

            });
        }
        else{
            res.status(404).json({ Error: "User not found" ,success :"false"});
        }

       
    } catch (err) {
        res.status(500).json({ Error: err ,success :"false"});
    }
}


exports.getPage = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "view", "signUp.html"));
    } catch (err) {
        res.status(500).json({ Error: err });
    }

}

exports.postSignUpEntry = async (req, res, next) => {
    try {
        const {name , email ,password} =req.body;
     

        if (!name) {
            throw new Error("Filed Name required");
        } else {
            if (!email) {
                throw new Error("Filed Email required");
            } else {

                if (!password) {
                    throw new Error("Filed Password required");
                }
            }
            
            const saltRounds=10;
            const pass=await bcrypt.hash(password,saltRounds)

            const data = await user.create({
                name: name,
                email: email,
                password: pass
            })

            res.status(201).json({ NewUser: data , success : "true" });
        }
    } catch (err) {
        res.status(500).json({ Error: err ,success :"false"});
    }
}