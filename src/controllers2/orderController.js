const  orderModel = require("../model2/OrderModel")
const userModel = require("../model2/USERmodel")
const productModel = require("../model2/productModel")

const createOrder = async function(req,res)
{
    req.body.date = new Date().toLocaleDateString()
    let info = req.body
    {
        let item = productModel.findById({_id : productId})
        let customer = userModel.findById({_id : userId})
        if(!customer.isFreeAppUser)
        {
            res.send({"msg" : "isFreeAppUser is required"})
        }
        
        else if(customer.isFreeAppUser)
        {
        if(customer.isFreeAppUser== "true"){
            req.body.amount = 0
        }
        
        else if(customer.isFreeAppUser == "false")
        {
            req.body.amount = item.price
        }
            next()
        }
        }
    let savedData = await orderModel.create(info)
    res.send(savedData)

}

module.exports.createOrder = createOrder

/*Write a POST api for order purchase that takes a userId and a productId in request body. 
If the header **isFreeAppUser** is not present terminate the request response cycle with an error message that the request is missing a mandatory header
If the header is present the control goes to the request handler. Perform the user and product validation. Check if the user exists as well as whether the product exists. Return an error with a suitable error message if either of these validations fail */