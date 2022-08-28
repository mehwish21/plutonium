const productModel = require('../model2/productModel')


const createProduct = async function(req,res)
{
    let data = req.body
    const newProduct = await productModel.create(data)
    res.send({msg : newProduct})
}


module.exports.createProduct = createProduct