
const path = require('path')
const user = require('../model/user')

exports.getPage = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "..", "view", "index.html"));
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
        res.status(500).json({ Error: err});
    }
}