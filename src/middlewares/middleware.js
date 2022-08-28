const userModel = require("../model2/USERmodel")
const productModel = require("../model2/productModel")


const mid1 = function (req,res,next)
{
    let data =req.headers['isfreeappuser']
    if(!data){
      res.send({"msg" : "isFreeAppUser is required"})
    }
       else if(data){
        if(data=="true"){
          req.body.isFreeAppUser = true
        }
        else if(data=="false"){
          req.body.isFreeAppUser = false
        }
        next()
      }
}
 
//const mid2 = function(req,res,next)


// const mid2 = function(req,res,next)
// {    
//     let data = req.headers['isFreeAppUser']
//     if(!data){
//         res.send("this is required")
//       }
//       next()
// }

module.exports.mid1 = mid1
module.exports.mid2 = mid2