const AdminModel = require("../../models/adminModel")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

//**************************************VALIDATION FUNCTIONS****************************** */

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length > 0) return true;
  return false;
};

const isValidRequest = function (object) {
  return Object.keys(object).length > 0
}


//****************************ADMIN LOGIN****************************** */

const AdminLogin = async function (req, res) {
  try {

    const requestBody = req.body;

    if (!isValidRequest(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "data is required" });
    }

    const email = requestBody.email;
    const password = requestBody.password;

    if (!isValid(email)) {
        return res
          .status(400)
          .send({ status: false, message: "email is required" })
      }

    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "password is required" })
    }

    const AdminDetails = await AdminModel.findOne({ email: email });

    if (!AdminDetails) {
      return res
        .status(404)
        .send({ status: false, message: "no Admin found " })
    }

    const isPasswordMatching = await bcrypt.compare(
      password,
      AdminDetails.password
    );

    if(!isPasswordMatching){
      return res
        .status(400)
        .send({status: false, message: "Incorrect password"});
    }

    //creating a jsonWebToken and sending it to responce header and body

    let token = jwt.sign({
      adminId: AdminDetails._id  
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    });

    res
      .status(200)
      .send({ status: true, message: "Admin Login Successfully", data: AdminDetails, token: token })

  } catch (error) {

    res.status(500).send({ error: error.message })            

  }
}

//**********************EXPORTING HANDLER********************** */

module.exports = AdminLogin