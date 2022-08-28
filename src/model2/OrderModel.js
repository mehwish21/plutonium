const  mongoose  = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const newOrder = new mongoose.Schema(
{
	
	userId       : ObjectId,
    
	productId    : ObjectId,
        
	isFreeAppUser: {type :Boolean}, 
	
	date         :String
})

module.exports = mongoose.model('MyOrder', newOrder)