require('dotenv').config();
const express = require('express');
const router = express.Router();

//********************MIDDLEWARE*********************//

const AdminMiddleware = require('../middleWare/adminAuth')
const UserMiddleware = require('../middleWare/userAuth')

//**********************ADMIN*************************//
const createAdmin =require("../controller/admin/adminRegister")
const AdminLogin =require("../controller/admin/adminLogin");

//**********************USER***************************// 
const createUser = require('../controller/user/userRegister');
const UserLogin = require('../controller/user/userLogin');


//**************************ADMIN API's*******************//

// Create Admin 
router.post("/admin/adminRegisters", createAdmin)
// Login Admin
router.post("/admin/adminLogins", AdminLogin)

//**************************USER API's***************** */

// Create User
router.post("/user/userRegisters", createUser)
// User Login
router.post("/user/userLogins", UserLogin)


module.exports = router;