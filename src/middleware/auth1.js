const jwt = require("jsonwebtoken");

const mid = function(req,res,next)
{
    let rename = req.headers["x-auth-token"]
    if(!rename){
        res.send({msg : "token must be present"})
    }
    next()

}


let authorise = function(req ,res, next)
    {
    let user = req.params.userId 
    let token= req.headers["x-auth-token"]
    if(user != token)
    {
        res.send({"msg" : "user is not auhtorised"})
        next()
    }
   }

module.exports.mid = mid
module.exports.authorise = authorise

