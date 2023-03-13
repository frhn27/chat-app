const express=require('express');
const protect = require('../middleware/auth');
const router=express.Router();
const {accessChat,
    fetchAllChat,
    createGroupChat,
    renameGroup,
    removeFromGroup,
    addToGroup}=require('../controller/chatController')


router.route('/').post(protect,accessChat);
router.route('/').get(protect,fetchAllChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);


module.exports = router;