const publisherModel = require('../models/publishermodel')

const createpublisher = async function(req,res){
 let publisher = req.body
 let publishercreated = await publisherModel.create(publisher)
 res.send({data : publishercreated})
}

module.exports.createpublisher = createpublisher