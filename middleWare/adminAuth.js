const jwt = require('jsonwebtoken')
const AdminModel = require('../models/')
const mongoose = require('mongoose')
const express = require('express')

//*********************************VALIDATION************************** */

const isValidInputValue = function (value) {
    if (typeof (value) === 'undefined' || value === null) return false
    if (typeof (value) === 'string' && value.trim().length > 0) return true
    return false
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};

//********************************AUTHENTICATION********************************** */

const authentication = async function (req, res, next) {

    const bearerToken = req.headers["authorization"]

    if (!isValidInputValue(bearerToken)) {

        return res
            .status(401)
            .send({ status: false, message: "authentication failed : token not found" })

    }
    const token = bearerToken.split(" ")[1]

    const secretKey = process.env.SECRET_KEY;

    try {

        const decodedToken = jwt.verify(token, secretKey, { ignoreExpiration: true })

        if (Date.now() > decodedToken.exp * 1000) {
            return res
                .status(401)
                .send({ status: false, message: "authentication failed : Session expired" })
        }

        req.decodedToken = decodedToken

        next()

    } catch (err) {
        res
            .status(500)
            .send({ status: false, message: err.message })

    }


}


//********************************AUTHORIZATION********************************** */

const authorization = async function (req, res, next) {

    try {

        const adminId = req.params.adminId
        const decodedToken = req.decodedToken

        if (!isValidObjectId(adminId)) {
            return res
                .status(400)
                .send({ status: false, message: " enter a valid adminId" })
        }

        const adminByAdminId = await AdminModel.findById(adminId)

        if (!adminByAdminId) {
            return res
                .status(404)
                .send({ status: false, message: " admin not found" })
        }

        if (adminId !== decodedToken.adminId) {
            return res
                .status(403)
                .send({ status: false, message: "unauthorized access" })
        }
        next()

    } catch (err) {
        return res
            .status(500)
            .send({ status: false, message: err.message })
    }
}

module.exports = { authentication, authorization }