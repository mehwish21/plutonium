const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel1");


// create user

const createUser = async function (abcd, xyz) {
  try {
    let data = abcd.body;
    let savedData = await userModel.create(data);
    console.log(abcd.newAtribute);
    xyz.status(201).send({ msg: savedData }) 
    // the request has succeeded and has led to the creation of a resource
  }

  catch (error) {
    console.log(error)
    res.status(400).send({ msg: error.message })
    //server cannot or will not process the request due to something that is perceived to be a client error 
  }
}

// --------------------------------------------------x-----------------------------------------------------------------------
// login user

const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
      return res.status(403).send({
        status: false,
        msg: "username or the password is not corerct",
        // server denies you permission to access a page on your site
      });
    // create token

    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "thorium",
        organisation: "FunctionUp",
      },
      "functionup-plutonium-very-very-secret-key"
    );
    res.setHeader("x-auth-token", token);
    res.status(200).send({ status: true, token: token });
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message })
  }
  //the server has encountered a situation it does not know how to handle.
};

// --------------------------------------------------x-----------------------------------------------------------------------
// get user data

const getUserData = async function (req, res) {
  try {
    let token = req.headers["x-auth-token"];
    if (!token) return res.status(401).send({ status: false, msg: "token must be present" });
    console.log(token);
     // the client request has not been completed because it lacks valid authentication credentials for the requested resource
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.status(401).send({ status: false, msg: "No such user exists" });

    res.status(200).send({ status: true, data: userDetails });
  } //indicates that the request has succeeded
  catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message })
  }
  // Note: Try to see what happens if we change the secret while decoding the token
};

// --------------------------------------------------x-----------------------------------------------------------------------
// update user

const updateUser = async function (req, res) {
  // Do the same steps here:
  // Check if the token is present
  // Check if the token present is a valid token
  // Return a different error message in both these cases

  try {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.send("No such user exists");
    }

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
    res.status(201).send({ status: updatedUser, data: updatedUser });
  }

  catch (error) {
    console.log(error)
    res.status(401).send({ msg: error.message })
  }
};

// --------------------------------------------------x-----------------------------------------------------------------------
// delete user 

const remove = async function (req, res) {
  try {
    let userId = req.params.userId
    let a = await userModel.findOneAndUpdate({ _id: userId }, { $set: { isDeleted: true } })
    res.status(200).send(a)
  }

  catch (error) {
    console.log(error)
    res.status(401).send({ msg: error.message })
  }
}


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.remove = remove;