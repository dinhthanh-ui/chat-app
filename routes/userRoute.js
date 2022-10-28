const express = require('express');
const router = express.Router();
const { register, login, setAvatarUser, getAllUser } = require('../controllers/userController')

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatarUser);
router.get("/allUsers/:id", getAllUser);

module.exports = router