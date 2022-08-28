const  mongoose  = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const newOrder = new mongoose.Schema(
{
	
	userId       :{ type : ObjectId},
    
	productId    :{ type : ObjectId},
        
	isFreeAppUser: {type :Boolean}, 
	
	date         :String
})

module.exports = mongoose.model('MyOrder', newOrder)