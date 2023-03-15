
const path = require('path')
const user = require('../model/user')
const forgotPasswordRequests = require('../model/forgotPasswordRequests')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mail = require('../middleware/sendMails');
const { v4: uuidv4 } = require('uuid');


var generateToken = (id, ispremiumuser) => {
    return jwt.sign({ userID: id, ispremiumuser: ispremiumuser }, "secretkey");
}

var getLoginPage = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "view", "login.html"));
    } catch (err) {
        res.status(500).json({ Error: err });
    }
}

var loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;


        if (!email) {
            throw new Error("Email required");
        } else {

            if (!password) {
                throw new Error("Password required");
            }
        }

        var data = await user.findAll({
            where: {
                email: email
            }
        })


        if (data.length >= 1) {

            bcrypt.compare(password, data[0].password, (err, result) => {


                // data = await user.findAll({
                //     where: {
                //         email: email,
                //         password: password
                //     }
                // })

                // if (data.length>=1) {
                if (result === true) {

                    res.status(201).json({ Message: "User login sucessful", success: "true", token: generateToken(data[0].id, false) });

                }
                else {
                    res.status(401).json({ Error: "User not authorized", success: "false" });
                }

            });
        }
        else {
            res.status(404).json({ Error: "User not found", success: "false" });
        }


    } catch (err) {
        res.status(500).json({ Error: err, success: "false" });
    }
}


var getPage = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "view", "signUp.html"));
    } catch (err) {
        res.status(500).json({ Error: err });
    }

}

var postSignUpEntry = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;


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

            const saltRounds = 10;
            const pass = await bcrypt.hash(password, saltRounds)

            const data = await user.create({
                name: name,
                email: email,
                password: pass,
                ispremiumuser: false
            })

            res.status(201).json({ NewUser: data, success: "true" });
        }
    } catch (err) {
        res.status(500).json({ Error: err, success: "false" });
    }
}

var forgotCredentials = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "view", "forgotPassword.html"));
    } catch (err) {
        res.status(500).json({ Error: err });
    }
}

var forgotPassword = async (req, res, next) => {
    try {

        console.log("inside forgot password");
        const email = req.body.emailId;

        const currUser = await user.findOne({
            where: {
                email: email
            }
        })

        const uniqueId = uuidv4();;
        await forgotPasswordRequests.create({
            id: uniqueId,
            userId: currUser.id,
            isactive: true,
            registeredUserId: currUser.id

        })

        const message = 'http://localhost:3000/password/resetpassword/' + uniqueId;


        console.log("email", email);
        mail.sendMails(email, message);

        res.status(200).json({ message: "Password Resetting mail sent", success: "true" });


    } catch (error) {
        res.status(500).json({ Error: error });
    }
}



var resetPassword = async (req, res, next) => {
    try {
        const id = req.params.id;

        const userFound = await forgotPasswordRequests.findOne({
            where: {
                id: id,
                isactive: true
            }
        });

        if (userFound) {
            res.sendFile(path.join(__dirname, "..", "view", "resetPassword.html"))
        } else {
            throw new Error('No User Found with this email');
        }


    } catch (error) {
        res.status(500).json({ Error: error });
    }
}

var updatePassword = async (req, res, next) => {
    try {

        let email= req.body.email;
        let password= req.body.password;

        const userFound = await user.findOne({
            where: {
               email:email
            }
        });

        if(userFound){
        const resetUserFound = await forgotPasswordRequests.findOne({
            where: {
                userId: userFound.id
            }
        });

        await resetUserFound.update({isactive:false});
       

        let saltRounds=10;
        let newPassword= await bcrypt.hash(password,saltRounds);
        await userFound.update({password:newPassword});

        res.status(200).json({Message : "Password has been updated" , success: true});
    }
    else{
        throw new Error('No User Found with this email');
    }

    } catch (error) {
        res.status(500).json({ Error: error });
    }

}

module.exports = {
    generateToken,
    getLoginPage,
    loginUser,
    getPage,
    postSignUpEntry, forgotCredentials, forgotPassword, resetPassword, updatePassword
}