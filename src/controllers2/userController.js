const userModel = require("../model2/USERmodel")

const createUser =async function(req,res)
{
    let data = req.body
    let savedData = await userModel.create(data)
    return res.send({msg : savedData})
}


module.exports.createUser = createUser