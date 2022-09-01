const jwt = require("jsonwebtoken");

const authenticate = function(req,res,next)
{
    let token = req.headers["x-auth-token"]
    if(!token){
        res.send({msg : "token must be present"})
    }
    
    let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
    console.log(decodedToken)
    if (!decodedToken)
    {
    return res.send({ status: false, msg: "token is invalid" });
    }
    else {
    next()
    }
}

let authorise = function(req ,res, next)
    {
        let token=req.headers["x-auth-token"]
        let decodedToken=jwt.verify(token,"functionup-plutonium-very-very-secret-key")
        console.log(decodedToken)
        let abc =decodedToken.userId
        let xyz =req.params.userId
        if(abc!=xyz){res.status(403).send({error:"user logged in is not allowed"})
        }else{next()}
    }
   

module.exports.authenticate = authenticate
module.exports.authorise = authorise

