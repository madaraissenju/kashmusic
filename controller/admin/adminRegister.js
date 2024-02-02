const AdminModel = require("../../models/adminModel")
const bcrypt = require('bcryptjs')

//*******************VALIDATIONS*********************/

const isValid = function (value) {
    if (typeof (value) === 'undefined' || value === null) return false
    if (typeof (value) === 'string' && value.trim().length == 0) return false
    return true
}

const isValidRequestBody = function (reqBody) {
    return Object.keys(reqBody).length > 0
}

//****************** CREATE ADMIN********************/

const createAdmin = async function (req, res) {


    try {

        const queryParams = req.query
        const requestBody = req.body

        if (isValidRequestBody(queryParams)) {
            return res
                .status(400)
                .send({ status: false, message: "invalid request" })
        }

        if (!isValidRequestBody(requestBody)) {
            return res
                .status(400)
                .send({ status: false, message: "please provide input data" });
        }

        const { name, email, password } = requestBody

        if (!isValid(name)) {
            return res
                .status(400)
                .send({ status: false, message: "Name must be provided" });
        }

        if (!isValid(email)) {
            return res
                .status(400)
                .send({ status: false, message: "email must be Provided" });
        }

        if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res
                .status(400)
                .send({ status: false, message: "enter a valid email" });
        }


        if (!isValid(password)) {
            return res
                .status(400)
                .send({ status: false, message: "password must be provided" })
        }

        const isEmailNotUnique = await AdminModel.findOne({ email: email })

        if (isEmailNotUnique) {
            return res
                .status(409)
                .send({ status: false, message: "email already exits" })
        }

        // password Encryption
        const salt = await bcrypt.genSalt(13);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const adminDetails = {
            name: name,
            email: email,
            password: encryptedPassword
        }

        const newAdminEntry = await AdminModel.create(adminDetails)

        res
            .status(201)
            .send({ status: true, message: "new Admin Created", data: newAdminEntry })

    } catch (error) {

        res
            .status(500)
            .send({ error: error.message })

    }
}

module.exports = createAdmin