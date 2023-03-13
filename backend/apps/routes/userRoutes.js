const express = require('express');
const router=express.Router();
const {allUser,register,login}=require('../controller/userController');
const protect=require('../middleware/auth.js');


router.route('/').get(protect,allUser);
router.route('/').post(register);
router.route('/login').post(login);

module.exports = router;