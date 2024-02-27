const UserModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

//************************************** VALIDATION FUNCTIONS ****************************** */

const isValid = (value) => typeof value !== "undefined" && value !== null && (typeof value === "string" ? value.trim().length > 0 : true);

const isValidRequest = (object) => Object.keys(object).length > 0;

//**************************** USER LOGIN ****************************** */

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isValidRequest(req.body)) {
      return res.status(400).send({
        status: false,
        message: "Data is required"
      });
    }

    const findData = {};

    if (isValid(email)) {
      findData.email = email;
    }

    if (!isValid(password)) {
      return res.status(400).send({
        status: false,
        message: "Password is required"
      });
    }

    const userDetails = await UserModel.findOne(findData);

    if (!userDetails) {
      return res.status(404).send({
        status: false,
        message: "No user found"
      });
    }

    const isPasswordMatching = await bcrypt.compare(password, userDetails.password);

    if (!isPasswordMatching) {
      return res.status(400).send({
        status: false,
        message: "Incorrect password"
      });
    }


    const token = jwt.sign({
      userId: userDetails._id
    },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      });

    res.status(200). 
    send({
      status: true,
      message: "User login successful",
      data: userDetails, 
      token : token
    });

  } catch (error) {
    res.status(500).send({
      status: false,
      error: error.message
    });
  }
};

//********************** EXPORTING HANDLER ********************** */

module.exports = UserLogin;
