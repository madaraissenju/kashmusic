const UserModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

//*******************VALIDATIONS*********************/

const isValid = function (value) {
    if (typeof (value) === 'undefined' || value === null) return false;
    if (typeof (value) === 'string' && value.trim().length == 0) return false;
    return true;
}

const isValidRequestBody = function (reqBody) {
    return Object.keys(reqBody).length > 0;
}

//****************** CREATE ADMIN********************/

const createUser = async function (req, res) {
    try {
        const queryParams = req.query;
        const requestBody = req.body;

        if (isValidRequestBody(queryParams)) {
            return res
                .status(400)
                .send({ status: false, message: "Invalid request" });
        }

        if (!isValidRequestBody(requestBody)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide input data" });
        }

        const { name, email, password } = requestBody;

        if (!isValid(name)) {
            return res
                .status(400)
                .send({ status: false, message: "Name must be provided" });
        }

        if (!isValid(email)) {
            return res
                .status(400)
                .send({ status: false, message: "Email must be provided" });
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter a valid email" });
        }

        if (!isValid(password)) {
            return res
                .status(400)
                .send({ status: false, message: "Password must be provided" });
        }

        const isEmailNotUnique = await UserModel.findOne({ email: email });

        if (isEmailNotUnique) {
            return res
                .status(409)
                .send({ status: false, message: "Email already exists" });
        }

        // Password Encryption
        const salt = await bcrypt.genSalt(13);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const userDetails = {
            name: name,
            email: email,
            password: encryptedPassword
        }

        const newUserEntry = await UserModel.create(userDetails)

        res
            .status(201)
            .send({ status: true, message: "New user created", data: newUserEntry });

    } catch (error) {
        res
            .status(500)
            .send({ error: error.message });
    }
}

module.exports = createUser;
