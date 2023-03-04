
const path = require('path')
const user = require('../model/user')

exports.getLoginPage = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "view", "login.html"));
    } catch (err) {
        res.status(500).json({ Error: err });
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

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
            data = await user.findAll({
                where: {
                    email: email,
                    password: password
                }
            })
    
            if (data.length>=1) {
                res.status(201).json({ Error: "Login Successful" });
            }
            else {
                res.status(404).json({ Error: "Password does not exists" });
            }
        }
        else{
            res.status(404).json({ Error: "Email does not exists" });
        }

       
    } catch (err) {
        res.status(500).json({ Error: err });
    }
}


exports.getPage = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "view", "signUp.html"));
    } catch (err) {
        res.status(500).json({ Error: err });
    }

}

exports.postFormEntry = async (req, res, next) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

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

            const data = await user.create({
                name: name,
                email: email,
                password: password
            })

            res.status(201).json({ NewUser: data });
        }
    } catch (err) {
        res.status(500).json({ Error: err });
    }
}