const orderModel = require("../model2/OrderModel")
const userModel = require("../model2/USERmodel")
const productModel = require("../model2/productModel")

const createOrder = async function (req, res) {
    req.body.date = new Date().toLocaleDateString()
    let info = req.body
    let item = await productModel.findById(info.productId )
    let customer = await userModel.findById(info.userId )

    if (!info.userId) {
       return res.send({ "msg": "useriId is required" })
    }
    else if (!customer) {
       return res.send({"msg" : "userid is invalid"})
    }
    else if (!info.productId) {
       return res.send({ "msg": "productId is required" })
    }
    else if (!item) {
        return res.send("productId is invalid")
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    let abc = customer.balance - item.price
    
        if (customer.isFreeAppUser == true) {
            req.body.amount = 0
            let savedData = await orderModel.create(info)
            return res.send(savedData)

        }

        else if (customer.isFreeAppUser == false) {
            req.body.amount = item.price
            let xyz = await userModel.findOneAndUpdate({ _id: info.userId }, { $set: { balance: abc } }, { new: true })
            console.log(xyz)
            let savedData = await orderModel.create(info)
            return res.send({data : [savedData, xyz]})
        }

    }





module.exports.createOrder = createOrder

/*Write a POST api for order purchase that takes a userId and a productId in request body. 
If the header **isFreeAppUser** is not present terminate the request response cycle with an error message that the request is missing a mandatory header
If the header is present the control goes to the request handler. Perform the user and product validation. Check if the user exists as well as whether the product exists. Return an error with a suitable error message if either of these validations fail */