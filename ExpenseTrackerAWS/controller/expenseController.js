
const path=require('path')


exports.getPage= (req, res, next) => {
    try{
        res.sendFile(path.join(__dirname,"..","view","index.html"));
    }catch (err) {
        res.status(500).json({ Error: err });
    }

}

exports.postFormEntry =(req, res, next) => {
    try{
        
    }catch{

    }
}