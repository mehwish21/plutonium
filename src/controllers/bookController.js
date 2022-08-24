const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publishermodel")

const createBook= async function (req, res) {
     let book = req.body
     let author_id = book.author
     let publisher_id = book.publisher

     if(!author_id){
       return  res.send({ msg : "author_id is required"})
     }

     if(!publisher_id){
        return res.send({msg : "publisher_id is required"})
     }

     let findAuthor = await authorModel.findOne({_id:author_id})
     let findPublisher = await publisherModel.findOne({_id : publisher_id})
     
     if(findAuthor){
        if(findPublisher){
            let bookCreated = await bookModel.create(book)
            res.send({data: bookCreated})
        }
        else{
            res.send({msg : "publisher_id is not valid"})
        }
     }
        else{
            res.send({ msg : "author_id is not valid"})
        }
    
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author').populate('publisher')
    res.send({data: specificBook})

}

//a) Add a new boolean attribute in the book schema called isHardCover with a default false value. For the books published by 'Penguin' and 'HarperCollins', update this key to true


const updatepublisher = async function(req,res)
{
const updateHardCover = await bookModel.updateMany(
{publisher : {$in : ["63034a3eba8f35c1b90e7778","63034bccba8f35c1b90e777e"]}},
 {$set : {isHardCover : true}},
 {new : true}
) 
  res.send(updateHardCover) 
}


// b) For the books written by authors having a rating greater than 3.5, update the books price by 10 (For eg if old price for such a book is 50, new will be 60) 

const updateBookPrice = async function(req,res){
   // const findRating = await authorModel.find().select({rating : {$gt: 3.5}})
    const updatedPrice = await authorModel.updateMany(
        {'NewAuthor.rating' : {$gt: 3.5} },
        {$inc:{price:10}},
        {new :true}
        )
        res.send(updatedPrice)
}


  // b) For the books written by authors having a rating greater than 3.5, update the books price by 10 (For eg if old price for such a book is 50, new will be 60) 
//   let authorRating = await authorModel.find({rating : {$gt : 3.5}}).select({_id : 1})
//   let updatedPrice = await bookModel.updateMany(
//       { author : authorRating},
//       { $inc: { price: +10 } },
//       { new: true }
//   )
//   res.send({ data: updatedPrice })

  
// }


// let updatePrice = await bookModel.updateMany(
//     {"author.ratings ":{$gt: 3.5 }},
//     {$inc:{price : 10}},
//     {new : true, upsert:true }
// ).populate('author')






module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
module.exports.updatepublisher = updatepublisher
module.exports.updateBookPrice = updateBookPrice
