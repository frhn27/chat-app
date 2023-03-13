const express=require('express');
const protect = require('../middleware/auth');
const router=express.Router();
const {sendMessage , allMessage}=require('../controller/messsageController')

router.route('/').post(protect,sendMessage)
router.route('/:chatId').get(protect,allMessage)

module.exports= router;