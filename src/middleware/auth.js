const mid = function(req,res,next){
    let value = req.headers["x-auth-token"]
    if(!value){
        res.send({msg : "token must be present"})
    }
    next()

}

module.exports.mid = mid





/*Write a **DELETE api /users/:userId** that takes the userId in the path params and marks the isDeleted attribute for a user as true. Check that request must contain **x-auth-token** header. If absent, return a suitable error.
- Once, all the apis are working fine, move the authentication related code in a middleware called auth.js
- Add this middleware at route level in the routes where applicable.*/