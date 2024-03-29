require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//********************MIDDLEWARE*********************//

const AdminMiddleware = require('../middleWare/adminAuth')
const UserMiddleware = require('../middleWare/userAuth')

//**********************ADMIN*************************//
const createAdmin =require("../controller/admin/adminRegister")
const AdminLogin =require("../controller/admin/adminLogin");

//**********************USER***************************// 
const createUser = require('../controller/user/userRegister');
const UserLogin = require('../controller/user/userLogin');
const createrecent = require('../controller/user/createrecents');
const createPlaylist = require('../controller/user/createplaylists');
//**************** **********ADMIN API's*******************//

// Create Admin 
router.post("/admin/adminRegisters", createAdmin)
// Login Admin
router.post("/admin/adminLogins", AdminLogin)

//**************************USER API's***************** */
 
// Create User
router.post("/user/userRegisters", createUser)
// User Login
router.post("/user/userLogins", UserLogin)
//create recents
router.post("/user/createrecents/:userId", createrecent)
//recents
router.post("/user/createplaylists/:userId", createPlaylist);
//playliist

module.exports = router;
