const express = require('express');
const router = express.Router();
const { register, login, setAvatarUser, getAllUser, logout } = require('../controllers/userController')

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatarUser);
router.get("/allUsers/:id", getAllUser);
router.get("/logout/:id", logout);

module.exports = router